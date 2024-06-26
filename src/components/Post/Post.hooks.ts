import { searchAtom } from '@/atoms/SearchAtom'
import { fetchPostAdmin, fetchPostList, search } from '@/lib/posts'
import { scrollTop } from '@/lib/scrollTop'
import { PostFetchResult, PostListData, PostRecord } from '@/types/Editor'
import { Value } from '@udecode/plate-common'
import { useAtomValue } from 'jotai'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useToast } from '../ui/use-toast'

export function usePost(isAdmin: boolean) {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { id } = useParams<{ id: string }>()
  const [record, setRecord] = useState<PostRecord | undefined>(undefined)
  const [posts, setPosts] = useState<PostListData[]>([])

  const searchWord = useAtomValue(searchAtom)

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

  // fetch page data
  useMemo(() => {
    fetch(id)
    scrollTop()
  }, [id])

  return {
    id,
    searchWord,
    record,
    posts,
  }
}
