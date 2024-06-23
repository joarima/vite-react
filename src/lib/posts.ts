import { Json } from '@/types/supabase'
import { supabase } from './supabase'

export const fetchPostList = async (isLoggedIn: boolean) => {
  if (isLoggedIn) {
    const postItems = await supabase
      .from('post')
      .select('id, order')
      .order(' order ', { ascending: false })
    return postItems.data ?? []
  } else {
    const postItems = await supabase
      .from('post')
      .select('id, order')
      .eq('is_open', true)
      .order(' order ', { ascending: false })
    return postItems.data ?? []
  }
}

export const fetchPost = async (id?: string) => {
  if (!id) {
    const post = await supabase
      .from('post')
      .select('id, order, content, is_open, created_at, updated_at')
      .eq('is_open', true)
      .order(' order ', { ascending: false })
      .limit(1)
      .maybeSingle()
    return post.data ?? undefined
  } else {
    const post = await supabase
      .from('post')
      .select('id, order, content, is_open, created_at, updated_at')
      .eq('id', id)
      .eq('is_open', true)
      .maybeSingle()
    return post.data ?? undefined
  }
}

export const fetchPostAdmin = async (id?: string) => {
  if (!id) {
    const post = await supabase
      .from('post')
      .select('id, order, content, is_open, created_at, updated_at')
      .order(' order ', { ascending: false })
      .limit(1)
      .maybeSingle()
    return post.data ?? undefined
  } else {
    const post = await supabase
      .from('post')
      .select('id, order, content, is_open, created_at, updated_at')
      .eq('id', id)
      .maybeSingle()
    return post.data ?? undefined
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
