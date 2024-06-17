import { PostEditor } from '@/components/PostEdtor'
import { PlateController, Value } from '@udecode/plate-common'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useToast } from './components/ui/use-toast'
import { fetchPost } from './lib/posts'
import { PostRecord } from './types/Editor'

function App() {
  const { toast } = useToast()
  const { id } = useParams<{ id: string }>()
  const [record, setRecord] = useState<PostRecord | undefined>(undefined)

  const fetch = async () => {
    try {
      const order = Number(id)

      if (Number.isNaN(order)) {
        toast({
          title: 'Invalid id: id need to be number.',
          description: 'showing latest content.',
        })
      }

      const record = await fetchPost(order)

      if (record) {
        setRecord({
          id: record.id,
          order: record.order,
          content: record.content as Value,
          isOpen: record.is_open,
          createdAt: record.created_at,
          updatedAt: record.updated_at,
        })
      }
    } catch (error) {
      console.log('not valid id')
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <div className="flex-1">
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <PlateController>
          <PostEditor record={record} />
        </PlateController>
      </section>
    </div>
  )
}

export default App
