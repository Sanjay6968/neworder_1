import dynamic from 'next/dynamic'
import Head from 'next/head'

const PrintQueue = dynamic(() => import('src/views/queue/PrintQueue'), {
  ssr: false,
  loading: () => <p>Loading Print Queue...</p>,
})

export default function QueuePage() {
  return (
    <>
      <Head>
        <title>Print Queue</title>
      </Head>
      <PrintQueue />
    </>
  )
}
