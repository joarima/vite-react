import { Json } from '@/types/supabase'
import { supabase } from './supabase'

export const fetchPostList = async (isLoggedIn?: boolean) => {
  const postItems = await supabase
    .from('post')
    .select('id ,order, is_open')
    .order(' order ', { ascending: false })
  return postItems.data ?? []
}

export const fetchPost = async (id?: string) => {
  if (!id) {
    const post = await supabase
      .from('post')
      .select('*')
      .select('id, order, content, is_open, created_at, updated_at')
      .order(' order ', { ascending: false })
      .limit(1)
      .single()
    return post.data
  } else {
    const post = await supabase
      .from('post')
      .select('id, order, content, is_open, created_at, updated_at')
      .eq('id', id)
      .order(' order ', { ascending: false })
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

export const updatePost = async (
  id: string,
  postJson: object,
  isOpen: boolean = false
) => {
  const { error } = await supabase
    .from('post')
    .update({
      content: postJson as Json,
      is_open: isOpen,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    throw error
  }
}
