import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

const postsDir = path.join(process.cwd(), 'posts')

export interface PostMeta {
  slug: string
  title: string
  date: string       // YYYY-MM-DD
  wordCount: number
  excerpt?: string
}

export interface Post extends PostMeta {
  contentHtml: string
}

function countWords(markdown: string): number {
  const stripped = markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[.*?\]\(.*?\)/g, ' ')
    .replace(/[#>*_~\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (!stripped) return 0
  return stripped.split(' ').filter(Boolean).length
}

function formatDate(raw: string | Date): string {
  if (raw instanceof Date) {
    return raw.toISOString().slice(0, 10)
  }
  return raw
}

export const POSTS_PER_PAGE = 10

export function getAllPostsMeta(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return []

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'))

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, '')
    const fullPath = path.join(postsDir, filename)
    const raw = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(raw)

    return {
      slug,
      title: (data.title as string) ?? slug,
      date: formatDate((data.date as string | Date) ?? ''),
      wordCount: countWords(content),
      excerpt: (data.excerpt as string) ?? null,
    }
  })

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostsPage(page: number): { posts: PostMeta[]; totalPages: number } {
  const all = getAllPostsMeta()
  const totalPages = Math.max(1, Math.ceil(all.length / POSTS_PER_PAGE))
  const posts = all.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)
  return { posts, totalPages }
}

export function getTotalPages(): number {
  const all = getAllPostsMeta()
  return Math.max(1, Math.ceil(all.length / POSTS_PER_PAGE))
}

export async function getPost(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDir, `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null

  const raw = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(raw)

  const processed = await remark().use(remarkHtml, { sanitize: false }).process(content)
  const contentHtml = processed.toString()

  return {
    slug,
    title: (data.title as string) ?? slug,
    date: formatDate((data.date as string | Date) ?? ''),
    wordCount: countWords(content),
    excerpt: (data.excerpt as string) ?? null,
    contentHtml,
  }
}
