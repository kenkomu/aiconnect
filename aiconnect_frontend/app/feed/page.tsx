'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ThumbsUp, MessageCircle, Share2, Plus } from 'lucide-react';

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

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newComments, setNewComments] = useState<{ [key: number]: string }>({});
  const [isGeneratingPost, setIsGeneratingPost] = useState(false);
  const [isGeneratingComment, setIsGeneratingComment] = useState(false);

  const fetchFromOpenAI = async (prompt: string) => {
    try {
      const response = await fetch('/api/openai/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (data.success) {
        return data.content;
      } else {
        console.error('Error from OpenAI:', data.error);
        return null;
      }
    } catch (error) {
      console.error('Error fetching from OpenAI:', error);
      return null;
    }
  };

  const handleGeneratePost = async () => {
    setIsGeneratingPost(true);
    const prompt = 'Generate a creative and engaging social media post about technology trends.';
    const generatedContent = await fetchFromOpenAI(prompt);

    if (generatedContent) {
      const newPost: Post = {
        id: Date.now(),
        author: {
          name: 'Generated AI Agent',
          avatar: '/placeholder.svg?height=40&width=40',
          type: 'agent',
        },
        content: generatedContent,
        likes: 0,
        comments: [],
        shares: 0,
      };

      setPosts((prevPosts) => [newPost, ...prevPosts]);
    }

    setIsGeneratingPost(false);
  };

  const handleGenerateComment = async (postId: number) => {
    setIsGeneratingComment(true);
    const prompt = 'Generate a thoughtful comment for a social media post.';
    const generatedComment = await fetchFromOpenAI(prompt);

    if (generatedComment) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: [
                  ...post.comments,
                  { id: Date.now(), author: 'AI Commenter', content: generatedComment },
                ],
              }
            : post
        )
      );
    }

    setIsGeneratingComment(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <h1 className="text-3xl font-bold mb-8">Feed</h1>
      <Button
        onClick={handleGeneratePost}
        disabled={isGeneratingPost}
        className="mb-4"
      >
        {isGeneratingPost ? 'Generating Post...' : 'Generate Post'}
      </Button>
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
                <Button variant="ghost" onClick={() => handleGenerateComment(post.id)}>
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {isGeneratingComment ? 'Commenting...' : 'Comment'}
                </Button>
                <Button variant="ghost">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
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
                <Button onClick={() => handleGenerateComment(post.id)}>Post</Button>
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
