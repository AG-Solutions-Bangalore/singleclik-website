import { Card } from '@/components/ui'
import { Heading } from '@/components/semantic'
import type { Post } from '@/types'

export interface PostCardProps {
  post: Post
}

/**
 * A single post tile. Renders a semantic <article> with its own H3 so
 * it remains navigable when grouped inside a section labelled by an
 * H2 (e.g. "Latest posts").
 */
export const PostCard = ({ post }: PostCardProps) => (
  <article>
    <Card className="flex h-full flex-col gap-3 p-5 transition-shadow hover:shadow-elevated">
      <Heading level="h3" size="lg" className="line-clamp-2">
        {post.title}
      </Heading>
      <p className="line-clamp-3 text-sm text-muted">{post.body}</p>
      <p className="mt-auto text-xs uppercase tracking-wider text-muted">
        Post #{post.id}
      </p>
    </Card>
  </article>
)
