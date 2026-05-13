import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getPostsPage, getTotalPages, PostMeta } from '../../lib/posts'
import PostList from '../../components/PostList'

interface Props {
  posts: PostMeta[]
  page: number
  totalPages: number
}

export const getStaticPaths: GetStaticPaths = async () => {
  const totalPages = getTotalPages()
  const paths = Array.from({ length: totalPages - 1 }, (_, i) => ({
    params: { page: String(i + 2) },
  }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const page = parseInt(params?.page as string, 10)
  const { posts, totalPages } = getPostsPage(page)
  return { props: { posts, page, totalPages } }
}

const PageN: NextPage<Props> = ({ posts, page, totalPages }) => {
  return (
    <>
      <Head>
        <title>Page {page} — Badly Written by a Human</title>
      </Head>
      <div className="shell">
        <header className="site-header">
          <Link href="/" className="site-title" style={{ textDecoration: 'none' }}>
            Badly Written by a Human
          </Link>
        </header>

        <main>
          <PostList posts={posts} page={page} totalPages={totalPages} />
        </main>

        <footer className="site-footer">
          <Link href="/about">About</Link>
        </footer>
      </div>
    </>
  )
}

export default PageN
