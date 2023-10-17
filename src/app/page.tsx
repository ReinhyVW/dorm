import Comment from '@/components/outputs/comments/Comment'
import StatusSelect from '@/components/inputs/StatusSelect'

export default function Home() {
  return (
    <main className='w-screen h-screen flex items-center justify-center'>
      <Comment />
      <StatusSelect />
    </main>
  )
}
