import React from 'react';
import type { CommunityPost } from '../types';

const PostCard: React.FC<{ post: CommunityPost }> = ({ post }) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-5">
            <div className="flex items-center mb-3">
                <img src={post.author.avatarUrl} alt={post.author.name} className="w-10 h-10 rounded-full object-cover mr-3" />
                <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{post.author.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{post.timestamp}</p>
                </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-wrap">{post.content}</p>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-6 border-t border-gray-200 dark:border-slate-700 pt-3">
                <button className="flex items-center gap-1.5 hover:text-primary-600 dark:hover:text-primary-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.085a2 2 0 00-1.736.93L5.5 8m7 2H5" /></svg>
                    <span>{post.likes} Likes</span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-primary-600 dark:hover:text-primary-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    <span>{post.comments} Comments</span>
                </button>
            </div>
        </div>
    );
};

interface CommunityProps {
  posts: CommunityPost[];
}

const Community: React.FC<CommunityProps> = ({ posts }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Community Feed</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Connect and collaborate with other students.</p>
        </div>
        <button className="bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-200">
            Create Post
        </button>
      </div>

      <div className="space-y-6">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Community;
