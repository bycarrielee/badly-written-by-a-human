import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About — Badly Written by a Human</title>
        <meta name="description" content="About." />
      </Head>
      <div className="shell">
        <header className="site-header">
          <Link href="/" className="back-link">
            ← index
          </Link>
        </header>

        <main>
          <article>
            <header className="post-header">
              <h1 className="post-heading">About</h1>
            </header>

            <div className="post-body">
              <p>This is my tiny act of rebellion*,<br />at a time where most words are written by AI.</p>

              <p>This is a space for words written<br />and rewritten by a human being.</p>

              <p>No next-token probability.<br />No groundbreaking efficiency.<br />No likes. No comments. No shares.</p>

              <p style={{ color: 'var(--muted)' }}>---</p>
              <p>*But with one big irony. This site is built by Claude.</p>
            </div>
          </article>
        </main>

        <footer className="site-footer">
          <Link href="/about">About</Link>
        </footer>
      </div>
    </>
  )
}

export default About
