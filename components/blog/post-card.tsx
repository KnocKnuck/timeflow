import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

interface PostCardProps {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingTime?: string;
  tags?: string[];
}

export function PostCard({
  slug,
  title,
  description,
  publishedAt,
  readingTime,
  tags,
}: PostCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group">
      <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
        <CardHeader>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <CardTitle className="group-hover:text-primary transition-colors">{title}</CardTitle>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={publishedAt}>
                {new Date(publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </div>
            {readingTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{readingTime}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
