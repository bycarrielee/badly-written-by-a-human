import Link from 'next/link'
import { PostMeta } from '../lib/posts'

interface Props {
  posts: PostMeta[]
  page: number
  totalPages: number
}

export default function PostList({ posts, page, totalPages }: Props) {
  if (posts.length === 0) {
    return <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>No posts yet.</p>
  }

  const olderHref = page < totalPages ? (page === 1 ? '/page/2' : `/page/${page + 1}`) : null
  const newerHref = page > 1 ? (page === 2 ? '/' : `/page/${page - 1}`) : null

  return (
    <>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.slug} className="post-list-item">
            <span className="post-date">{post.date}</span>
            <Link href={`/posts/${post.slug}`} className="post-title-link">
              {post.title}
            </Link>
            <span className="post-meta-small">{post.wordCount} words</span>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <nav className="pagination">
          <span>
            {newerHref && <Link href={newerHref}>← newer</Link>}
          </span>
          <span style={{ color: 'var(--muted)' }}>
            {page} / {totalPages}
          </span>
          <span style={{ textAlign: 'right' }}>
            {olderHref && <Link href={olderHref}>older →</Link>}
          </span>
        </nav>
      )}
    </>
  )
}
