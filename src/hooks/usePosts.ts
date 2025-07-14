import { useState, useEffect } from "react";
import { Post } from "../components/PostCard";
import { ANIMATIONS } from "../constants/dimensions";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Call api to create the post
  const fetchPosts = async (tag?: string) => {
    setLoading(true);
    const url = tag
      ? `/api/posts?tag=${encodeURIComponent(tag)}`
      : "/api/posts";
    const res = await fetch(url);
    const data = await res.json();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Real-time search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim()) {
        fetchPosts(search.trim());
      } else {
        fetchPosts();
      }
    }, ANIMATIONS.DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [search]);

  return {
    posts,
    loading,
    search,
    setSearch,
    fetchPosts,
  };
}
