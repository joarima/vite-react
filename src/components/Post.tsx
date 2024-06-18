import { PostEditor } from '@/components/PostEdtor'

import { scrollTop } from '@/lib/scrollTop'
import { PlateController, Value } from '@udecode/plate-common'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchPost, fetchPostAdmin, fetchPostList } from '../lib/posts'
import { PostFetchResult, PostListData, PostRecord } from '../types/Editor'
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
          }
        })
        setPosts(listData)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const resToRecord = (res: PostFetchResult) => {
    if (res === undefined) {
      return
    } else {
      setRecord({
        id: res.id,
        order: res.order,
        content: res.content as Value,
        isOpen: res.is_open,
        createdAt: res.created_at,
        updatedAt: res.updated_at,
      })
    }
  }

  const fetch = async () => {
    try {
      if (isAdmin) {
        const res = await fetchPostAdmin(id)
        resToRecord(res)
      } else {
        const res = await fetchPost(id)
        resToRecord(res)
      }
    } catch (error) {
      console.log(error)
      toast({
        title: 'Invalid id.',
        description: `there is no post with id: ${id}.`,
      })
    }
  }

  // react-router-dom の Link で移動した時に発火しないので id を使っている
  useEffect(() => {
    fetch()
    fetchList()
    scrollTop()
  }, [id])

  return (
    <div className="flex-1">
      <section className="w-full grid items-center gap-6 pb-8 pt-6 md:py-10">
        <PlateController>
          <PostEditor record={record} />
        </PlateController>
      </section>
      <Pagination currentId={id} posts={posts} record={record} />
    </div>
  )
}
