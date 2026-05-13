import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getAllPostsMeta, getPost, Post } from '../../lib/posts'

interface Props {
  post: Post
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPostsMeta()
  return {
    paths: posts.map((p: { slug: string }) => ({ params: { slug: p.slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string
  const post = await getPost(slug)
  if (!post) return { notFound: true }
  return { props: { post } }
}

const PostPage: NextPage<Props> = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title} — Badly Written by a Human</title>
        <meta name="description" content={post.excerpt ?? post.title} />
      </Head>
      <div className="shell">
        <header className="site-header">
          <Link href="/" className="back-link">
            ← index
          </Link>
        </header>

        <article>
          <header className="post-header">
            <h1 className="post-heading">{post.title}</h1>
            <div className="post-dateline">{post.date}</div>
            <div className="post-wordcount">{post.wordCount} words</div>
          </header>

          <div
            className="post-body"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>

        <footer className="site-footer">
          <Link href="/about">About</Link>
        </footer>
      </div>
    </>
  )
}

export default PostPage
