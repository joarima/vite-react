import { PostEditor } from '@/components/PostEdtor'

import { PlateController, Value } from '@udecode/plate-common'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchPost, fetchPostList } from '../lib/posts'
import { PostListData, PostRecord } from '../types/Editor'
import { Pagination } from './Pagination'
import { useAuth } from './SupabaseAuthProvider'
import { useToast } from './ui/use-toast'

export function Post() {
  const { user } = useAuth()
  const isAdmin = !!user
  const { toast } = useToast()
  const { id } = useParams<{ id: string }>()
  const [record, setRecord] = useState<PostRecord | undefined>(undefined)
  const [posts, setPosts] = useState<PostListData[]>([])

  const fetchList = async () => {
    try {
      await fetchPostList(isAdmin).then((rs) => {
        const listData = rs.map((it) => {
          return {
            id: it.id,
            order: it.order,
            isOpen: it.is_open,
          }
        })
        setPosts(listData)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const fetch = async () => {
    try {
      const record = await fetchPost(id)

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
      console.log(error)
      toast({
        title: 'Invalid id.',
        description: `there is no post with id: ${id}.`,
      })
    }
  }

  useEffect(() => {
    fetch()
    fetchList()
  }, [])

  return (
    <div className="flex-1">
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <PlateController>
          <PostEditor record={record} />
        </PlateController>
      </section>
      <Pagination currentId={id} posts={posts} record={record} />
    </div>
  )
}
