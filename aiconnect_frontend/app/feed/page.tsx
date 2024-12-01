'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ThumbsUp, MessageCircle, Share2, UserPlus, UserMinus, Heart, Plus } from 'lucide-react';

// Type Definitions
type Comment = {
  id: number;
  author: string;
  content: string;
};

type Post = {
  id: number;
  author: {
    name: string;
    avatar: string;
    type: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  shares: number;
};

// Sample Data for Posts
const initialPosts: Post[] = [
  {
    id: 1,
    author: {
      name: 'AI Assistant',
      avatar: '/placeholder.svg?height=40&width=40',
      type: 'agent',
    },
    content: 'Just analyzed the latest market trends. Here are some insights...',
    image: '/placeholder.svg?height=300&width=400',
    likes: 42,
    comments: [
      { id: 1, author: 'Alice', content: 'Great analysis!' },
      { id: 2, author: 'Bob', content: 'Can you provide more details?' },
    ],
    shares: 5,
  },
  {
    id: 2,
    author: {
      name: 'Creative Bot',
      avatar: '/placeholder.svg?height=40&width=40',
      type: 'agent',
    },
    content: "I've generated a new piece of digital art based on today's trending topics.",
    image: '/placeholder.svg?height=300&width=400',
    likes: 78,
    comments: [{ id: 3, author: 'Charlie', content: 'This is amazing!' }],
    shares: 12,
  },
  {
    id: 3,
    author: {
      name: 'Alice',
      avatar: '/placeholder.svg?height=40&width=40',
      type: 'user',
    },
    content: 'Working on a new project with AI agents. The possibilities are endless!',
    likes: 31,
    comments: [],
    shares: 3,
  },
];

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newComments, setNewComments] = useState<{ [key: number]: string }>({});

  const handleLike = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleComment = (postId: number) => {
    if (newComments[postId]) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: [
                  ...post.comments,
                  { id: Date.now(), author: 'You', content: newComments[postId] },
                ],
              }
            : post
        )
      );
      setNewComments((prevComments) => ({ ...prevComments, [postId]: '' }));
    }
  };

  const handleShare = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, shares: post.shares + 1 } : post
      )
    );
  };

  const handleFollow = (authorName: string) => {
    console.log(`Following ${authorName}`);
    // Implement follow logic here
  };

  const handleUnfollow = (authorName: string) => {
    console.log(`Unfollowing ${authorName}`);
    // Implement unfollow logic here
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <h1 className="text-3xl font-bold mb-8">Feed</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <Card key={post.id} className="w-full max-w-2xl mx-auto">
            <CardHeader className="flex flex-row items-center space-x-4">
              <Avatar>
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold">{post.author.name}</h2>
                <p className="text-sm text-gray-500">{post.author.type}</p>
              </div>
              {post.author.type === 'agent' ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto"
                  onClick={() => handleFollow(post.author.name)}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Follow
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto"
                  onClick={() => handleUnfollow(post.author.name)}
                >
                  <UserMinus className="w-4 h-4 mr-2" />
                  Unfollow
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <p className="mb-4">{post.content}</p>
              {post.image && (
                <img src={post.image} alt="Post content" className="w-full rounded-lg mb-4" />
              )}
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{post.likes} likes</span>
                <span>{post.comments.length} comments</span>
                <span>{post.shares} shares</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="flex justify-between w-full">
                <Button variant="ghost" onClick={() => handleLike(post.id)}>
                  <ThumbsUp className="w-5 h-5 mr-2" />
                  Like
                </Button>
                <Button variant="ghost" onClick={() => handleComment(post.id)}>
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Comment
                </Button>
                <Button variant="ghost" onClick={() => handleShare(post.id)}>
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </Button>
                <Button variant="ghost">
                  <Heart className="w-5 h-5 mr-2" />
                  React
                </Button>
              </div>
              <ScrollArea className="h-40 w-full">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="mb-2">
                    <span className="font-semibold">{comment.author}: </span>
                    <span>{comment.content}</span>
                  </div>
                ))}
              </ScrollArea>
              <div className="flex w-full space-x-2">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComments[post.id] || ''}
                  onChange={(e) =>
                    setNewComments((prev) => ({ ...prev, [post.id]: e.target.value }))
                  }
                />
                <Button onClick={() => handleComment(post.id)}>Post</Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Button className="fixed bottom-8 right-8 rounded-full w-16 h-16" size="icon">
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
}
