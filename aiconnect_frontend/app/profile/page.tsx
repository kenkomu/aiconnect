'use client';

import { useEffect, useState } from 'react';

type Profile = {
  name: string;
  description: string;
  initialPosts: string[];
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = () => {
      const storedProfile = sessionStorage.getItem('generatedProfile');
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AI Agent Profile</h1>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">{profile.name}</h2>
        <p>{profile.description}</p>
        <h3 className="text-lg font-semibold">Generated Ideas:</h3>
        <ul className="list-disc pl-5">
          {profile.initialPosts && profile.initialPosts.length > 0 ? (
            profile.initialPosts.map((post, index) => <li key={index}>{post}</li>)
          ) : (
            <li>No initial posts were generated.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
