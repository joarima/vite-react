import { cn } from '@udecode/cn'
import { Plate, Value } from '@udecode/plate-common'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Editor } from '@/components/plate-ui/editor'
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar'
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons'
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar'
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons'
import { TooltipProvider } from '@/components/plate-ui/tooltip'
import { Button } from '@/components/ui/button'
import { format } from '@/lib/date'
import { savePost, updatePost } from '@/lib/posts'
import { PostRecord } from '@/types/Editor'
import { LoaderCircle } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { useAuth } from './SupabaseAuthProvider'
import { Checkbox, CheckedState } from './ui/checkbox'
import { Skeleton } from './ui/skeleton'

import { plugins } from '@/lib/plate/plugins'
import { useNavigate } from 'react-router-dom'

type EditorProps = {
  record?: PostRecord
  isNewPost?: boolean
}

export function PostEditor({ record, isNewPost = false }: EditorProps) {
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const id = 'pEditor'
  const { user } = useAuth()
  const isAdmin = !!user

  const [isPosting, setIsPosting] = useState<boolean>(false)

  const postId = record?.id
  const initialValue = record?.content

  const [editorState, setEditorState] = useState<Value | undefined>(
    initialValue
  )
  const [open, setOpen] = useState<boolean>(record?.isOpen ?? false)

  const toggleOpen = (checkState: CheckedState) => {
    const checked = checkState !== false && checkState != 'indeterminate'
    setOpen(checked)
  }

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

    if (postId) {
      updatePost(postId, content, open).then(() => {
        setIsPosting(false)
      })
    } else {
      savePost(content, open).then(() => {
        setIsPosting(false)
        if (isNewPost) {
          navigate('/')
        }
      })
    }
  }

  return (
    <div>
      <div className="flex items-center">
        {record && (
          <p className="py-[5px] font-thin text-left flex-grow">
            {format(record!.createdAt)}
          </p>
        )}
        {isAdmin && (
          <div className="items-top flex space-x-2">
            <Checkbox
              id="terms1"
              key={postId ?? 'new'}
              defaultChecked={open}
              onCheckedChange={toggleOpen}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-sm font-thin leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                open
              </label>
            </div>
          </div>
        )}
      </div>
      {isNewPost || initialValue ? (
        <div className="max-w-[1336px] rounded-lg border bg-background shadow">
          <TooltipProvider>
            <DndProvider backend={HTML5Backend}>
              <Plate
                id={id}
                key={postId}
                readOnly={!isAdmin}
                plugins={plugins}
                initialValue={initialValue}
                onChange={(state) => {
                  setEditorState(state)
                }}
              >
                <div
                  ref={containerRef}
                  className={cn(
                    'relative',
                    // Block selection
                    '[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4'
                  )}
                >
                  {isAdmin && (
                    <FixedToolbar>
                      <FixedToolbarButtons />
                    </FixedToolbar>
                  )}

                  <Editor
                    className="px-[25px] sm:px-[30px] md:px[50px] py-5 text-left"
                    autoFocus
                    focusRing={false}
                    variant="ghost"
                    size="md"
                  />
                  {isAdmin && (
                    <FloatingToolbar>
                      <FloatingToolbarButtons />
                    </FloatingToolbar>
                  )}
                </div>
              </Plate>
            </DndProvider>
          </TooltipProvider>
        </div>
      ) : (
        <Skeleton className="h-[125px] w-full py-5 rounded-xl" />
      )}

      {isAdmin && isPosting && (
        <Button className="w-full mt-2.5" disabled>
          <LoaderCircle className="animate-spin" />
        </Button>
      )}
      {isAdmin && !isPosting && (
        <Button
          className="w-full mt-2.5"
          onClick={() => {
            onSave()
          }}
        >
          Save
        </Button>
      )}
    </div>
  )
}
