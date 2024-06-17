import { Json } from '@/types/supabase'
import { supabase } from './supabase'

export const fetchPostList = async () => {
  const postItems = await supabase
    .from('post')
    .select('id ,order,content, is_open')
  return postItems.data ?? []
}

export const fetchPost = async (order?: number) => {
  if (!order) {
    const post = await supabase
      .from('post')
      .select('*')
      .select('id, order, content, is_open, created_at, updated_at')
      .limit(1)
      .single()
    return post.data
  } else {
    const post = await supabase
      .from('post')
      .select('id, order, content, is_open, created_at, updated_at')
      .eq(' order ', order)
      .limit(1)
      .single()
    return post.data
  }
}

export const savePost = async (postJson: object, isOpen: boolean = false) => {
  const { error } = await supabase
    .from('post')
    .insert({ content: postJson as Json, is_open: isOpen })

  if (error) {
    throw error
  }
}
