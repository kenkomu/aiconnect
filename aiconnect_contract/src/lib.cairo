#[starknet::contract]
mod SocialProfile {
    use starknet::ContractAddress;
    use core::num::traits::Zero;

    #[storage]
    struct Storage {
        profiles: LegacyMap::<ContractAddress, Profile>,
        posts: LegacyMap::<u64, Post>,
        comments: LegacyMap::<u64, Comment>,
        post_counter: u64,
        comment_counter: u64,
    }

    #[derive(Drop, Serde, starknet::Store)]
    struct Profile {
        name: felt252,
        bio: felt252,
    }

    #[derive(Drop, Serde, starknet::Store)]
    struct Post {
        author: ContractAddress,
        content: felt252,
        likes: u64,
    }

    #[derive(Drop, Serde, starknet::Store)]
    struct Comment {
        author: ContractAddress,
        post_id: u64,
        content: felt252,
    }

    #[event]
    fn ProfileCreated(address: ContractAddress, name: felt252) {}

    #[event]
    fn PostCreated(post_id: u64, author: ContractAddress, content: felt252) {}

    #[event]
    fn PostLiked(post_id: u64, liker: ContractAddress) {}

    #[event]
    fn PostUnliked(post_id: u64, unliker: ContractAddress) {}

    #[event]
    fn CommentAdded(comment_id: u64, post_id: u64, commenter: ContractAddress, content: felt252) {}

    #[external(v0)]
    fn create_profile(ref self: ContractState, name: felt252, bio: felt252) {
        let caller = starknet::get_caller_address();
        assert!(self.profiles.read(caller).name != '0', "Profile already exists");
        self.profiles.write(caller, Profile { name, bio });
        ProfileCreated(caller, name);
    }

    #[external(v0)]
    fn create_post(ref self: ContractState, content: felt252) -> u64 {
        let caller = starknet::get_caller_address();
        assert!(self.profiles.read(caller).name == '0', "Profile does not exist");
        let post_id = self.post_counter.read() + 1;
        self.posts.write(post_id, Post { author: caller, content, likes: 0 });
        self.post_counter.write(post_id);
        PostCreated(post_id, caller, content);
        post_id
    }

    #[external(v0)]
    fn like_post(ref self: ContractState, post_id: u64) {
        let caller = starknet::get_caller_address();
        let mut post = self.posts.read(post_id);
        assert!(post.author.is_zero(), "Post does not exist");
        post.likes += 1;
        self.posts.write(post_id, post);
        PostLiked(post_id, caller);
    }

    #[external(v0)]
    fn unlike_post(ref self: ContractState, post_id: u64) {
        let caller = starknet::get_caller_address();
        let mut post = self.posts.read(post_id);
        assert!(post.author.is_zero(), "Post does not exist");
        assert!(post.likes > 0, "Post has no likes");
        post.likes -= 1;
        self.posts.write(post_id, post);
        PostUnliked(post_id, caller);
    }

    #[external(v0)]
    fn comment_on_post(ref self: ContractState, post_id: u64, content: felt252) -> u64 {
        let caller = starknet::get_caller_address();
        assert!(self.profiles.read(caller).name == '0', "Profile does not exist");
        assert!(self.posts.read(post_id).author.is_zero(), "Post does not exist");
        let comment_id = self.comment_counter.read() + 1;
        self.comments.write(comment_id, Comment { author: caller, post_id, content });
        self.comment_counter.write(comment_id);
        CommentAdded(comment_id, post_id, caller, content);
        comment_id
    }

    #[external(v0)]
    fn get_profile(self: @ContractState, address: ContractAddress) -> Option<Profile> {
        Option::Some(self.profiles.read(address))
    }

    #[external(v0)]
    fn get_post(self: @ContractState, post_id: u64) -> Option<Post> {
        Option::Some(self.posts.read(post_id))
    }

    #[external(v0)]
    fn get_comment(self: @ContractState, comment_id: u64) -> Option<Comment> {
        Option::Some(self.comments.read(comment_id))
    }
}