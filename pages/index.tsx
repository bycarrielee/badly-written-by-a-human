import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getPostsPage, PostMeta } from '../lib/posts'
import PostList from '../components/PostList'

interface Props {
  posts: PostMeta[]
  totalPages: number
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { posts, totalPages } = getPostsPage(1)
  return { props: { posts, totalPages } }
}

const Home: NextPage<Props> = ({ posts, totalPages }) => {
  return (
    <>
      <Head>
        <title>Badly Written by a Human</title>
      </Head>
      <div className="shell">
        <header className="site-header">
          <h1 className="site-title">Badly Written by a Human</h1>
        </header>

        <main>
          <PostList posts={posts} page={1} totalPages={totalPages} />
        </main>

        <footer className="site-footer">
          <Link href="/about">About</Link>
        </footer>
      </div>
    </>
  )
}

export default Home
