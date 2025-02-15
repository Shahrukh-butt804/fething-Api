import React from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default async function ServerComponent() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  
  const posts: Post[] = await res.json();

  return (
    <div className="p-4 border rounded shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4 text-black z-20">
        Server Component - Dummy Posts
      </h2>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="p-4 border rounded shadow-sm bg-gray-100">
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-gray-600">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
