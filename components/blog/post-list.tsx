import { PostCard } from "./post-card";

interface Post {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingTime?: string;
  tags?: string[];
}

interface PostListProps {
  posts: Post[];
  showAll?: boolean;
}

export function PostList({ posts, showAll = false }: PostListProps) {
  const displayPosts = showAll ? posts : posts.slice(0, 3);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {displayPosts.map((post) => (
        <PostCard key={post.slug} {...post} />
      ))}
    </div>
  );
}
