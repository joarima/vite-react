import { PostEditor } from '@/components/Post/PostEdtor'

import { scrollTop } from '@/lib/scrollTop'

import { useAuth } from '@/components/SupabaseAuthProvider'
import { useToast } from '@/components/ui/use-toast'
import { fetchPostAdmin, fetchPostList, search } from '@/lib/posts'
import { PostFetchResult, PostListData, PostRecord } from '@/types/Editor'
import { PlateController, Value } from '@udecode/plate-common'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Pagination } from './Pagination'

type Props = {
  searchWord?: string
}

export function Post({ searchWord }: Props) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const isAdmin = !!user
  const { toast } = useToast()
  const { id } = useParams<{ id: string }>()
  const [record, setRecord] = useState<PostRecord | undefined>(undefined)
  const [posts, setPosts] = useState<PostListData[]>([])

  const fetchList = async () => {
    try {
      await fetchPostList(isAdmin).then((rs) => {
        const listData = rs.map((it, index) => {
          return {
            id: it.id,
            order: it.order,
            index: index + 1,
          }
        })
        setPosts(listData)
        fetch(listData[0].id)
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
      if (searchWord) {
        navigate(`/${res.id}`)
      }
    }
  }

  const fetch = async (postId?: string) => {
    try {
      const res = await fetchPostAdmin(postId)
      if (!res) {
        toast({
          title: 'no such id.',
          description: `there is no post with id: ${id}.`,
        })
        return
      }
      resToRecord(res)
    } catch (error) {
      console.log(error)
      toast({
        title: 'Invalid id.',
        description: `there is no post with id: ${id}.`,
      })
    }
  }

  const onSearch = async () => {
    if (searchWord) {
      await search(searchWord).then((rs) => {
        const listData = rs.map((it, index) => {
          return {
            id: it.id,
            order: it.order,
            index: index + 1,
          }
        })
        if (listData.length === 0) {
          toast({
            title: 'no result found.',
          })
          navigate('/')
          return
        }
        setPosts(listData)
        fetch(listData[0].id)
      })
    }
  }

  // init or search
  useMemo(() => {
    if (searchWord) {
      onSearch()
    } else {
      fetchList()
    }
  }, [searchWord])

  //
  useMemo(() => {
    fetch(id)
    scrollTop()
  }, [id])

  return (
    <div className="flex-1">
      <section className="w-full grid items-center gap-1 pb-8 pt-6 md:py-10">
        {searchWord && (
          <p className="w-1/3 mx-auto text-center text-2xl">
            &quot;{searchWord}&quot;
          </p>
        )}
        <PlateController>
          <PostEditor record={record} />
        </PlateController>
      </section>
      {record && <Pagination currentId={id} posts={posts} record={record} />}
    </div>
  )
}
