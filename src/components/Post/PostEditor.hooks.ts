import { deleteDraft, getDraft } from '@/lib/editor'
import { savePost, updatePost } from '@/lib/posts'
import { PostRecord } from '@/types/Editor'
import { CheckedState } from '@radix-ui/react-checkbox'
import { Value } from '@udecode/plate-common'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../ui/use-toast'

export function usePostEditor(record?: PostRecord, isNewPost?: boolean) {
  const navigate = useNavigate()
  const { toast } = useToast()
  // editor's initial value
  const initialValue = isNewPost ? getDraft() : record?.content

  // editor state(content) to save
  const [editorState, setEditorState] = useState<Value | undefined>(
    initialValue
  )

  // post public open state
  const [open, setOpen] = useState<boolean>(record?.isOpen ?? false)
  const toggleOpen = (checkState: CheckedState) => {
    const checked = checkState !== false && checkState != 'indeterminate'
    setOpen(checked)
  }

  const [isPosting, setIsPosting] = useState<boolean>(false)

  useMemo(() => {
    setEditorState(record?.content)
    setOpen(record?.isOpen ?? false)
  }, [record?.content, record?.isOpen])

  const onSave = () => {
    setIsPosting(true)
    const content = editorState as object
    if (content === undefined) {
      alert('no content')
      setIsPosting(false)
      return
    }

    if (record?.id) {
      updatePost(record?.id, content, open).then(() => {
        toast({
          title: 'post updated.',
        })
      })
    } else {
      savePost(content, open).then(() => {
        toast({
          title: 'new post created.',
        })
        if (isNewPost) {
          deleteDraft()
          navigate('/')
        }
      })
    }
    setIsPosting(false)
  }

  return {
    initialValue,
    setEditorState,
    open,
    toggleOpen,
    isPosting,
    onSave,
  }
}
