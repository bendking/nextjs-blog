import Layout from '../../components/layout'
import Head from 'next/head'
import Date from '../../components/date'
import { getAllPostIds, getPostData } from '../../lib/posts'

import utilStyles from '../../styles/utils.module.css'


// params is the object pointed to by the params key in the object received
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  // [
  //   { params: { id: 'ssg-ssr' } },
  //   { params: { id: 'pre-rendering' } }
  // ]
  return {
    paths,
    fallback: false
  }
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}