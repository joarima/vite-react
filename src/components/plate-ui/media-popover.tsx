import React, { useEffect, useState } from 'react'

import {
  isSelectionExpanded,
  setNodes,
  useEditorRef,
  useEditorSelector,
  useElement,
  useRemoveNodeButton,
} from '@udecode/plate-common'

import {
  ELEMENT_IMAGE,
  FloatingMedia as FloatingMediaPrimitive,
  TMediaElement,
  floatingMediaActions,
  useFloatingMediaSelectors,
} from '@udecode/plate-media'
import { useReadOnly, useSelected } from 'slate-react'

import { Icons } from '@/components/icons'

import { toast } from '@/components/ui/use-toast'
import { dataURLtoFile } from '@/lib/image'
import { Button, buttonVariants } from './button'
import { CaptionButton } from './caption'
import { inputVariants } from './input'
import { Popover, PopoverAnchor, PopoverContent } from './popover'
import { Separator } from './separator'

export interface MediaPopoverProps {
  children: React.ReactNode
  pluginKey?: string
  url?: string
}

export function MediaPopover({ children, pluginKey, url }: MediaPopoverProps) {
  const readOnly = useReadOnly()
  const selected = useSelected()
  const isImage = pluginKey === ELEMENT_IMAGE

  const selectionCollapsed = useEditorSelector(
    (editor) => !isSelectionExpanded(editor),
    []
  )
  const isOpen = !readOnly && selected && selectionCollapsed
  const isEditing = useFloatingMediaSelectors().isEditing()

  useEffect(() => {
    if (!isOpen && isEditing) {
      floatingMediaActions.isEditing(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const element = useElement()
  const { props: buttonProps } = useRemoveNodeButton({ element })

  const [embedUrl, setEmbedUrl] = useState<string | undefined>(
    isImage ? 'https://cdn.candycode.com/jotai/jotai-mascot.png' : undefined
  )
  const editor = useEditorRef()

  const upload = () => {
    if (!url) {
      toast({
        title: 'no file url.',
      })
      return
    }
    // data url => File
    const file = dataURLtoFile(url)
    if (!file) {
      toast({
        title: 'invalid file.',
      })
      return
    }
    // const s3Url = s3 url 取得
    console.log(file)

    // https://github.dev/udecode/plate/blob/main/packages/media/src/media/FloatingMedia/FloatingMediaUrlInput.tsx
    // FloatingMediaPrimitive.UrlInput で Enter を押した時の処理と同様
    // set
    setNodes<TMediaElement>(editor, {
      url: 'https://cdn.candycode.com/jotai/jotai-mascot.png',
    })
    // reset
    floatingMediaActions.reset()
  }

  if (readOnly) return <>{children}</>

  return (
    <Popover modal={false} open={isOpen}>
      <PopoverAnchor>{children}</PopoverAnchor>

      <PopoverContent
        className="w-auto p-1"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {isEditing ? (
          <div className="flex w-[330px] flex-col">
            <div className="flex items-center">
              <div className="flex items-center pl-3 text-muted-foreground">
                <Icons.link className="size-4" />
              </div>

              <FloatingMediaPrimitive.UrlInput
                className={inputVariants({ h: 'sm', variant: 'ghost' })}
                options={{
                  pluginKey,
                }}
                placeholder="Paste the embed link..."
              />
            </div>
          </div>
        ) : (
          <div className="box-content flex h-9 items-center gap-1">
            <FloatingMediaPrimitive.EditButton
              className={buttonVariants({ size: 'sm', variant: 'ghost' })}
            >
              Edit link
            </FloatingMediaPrimitive.EditButton>

            <CaptionButton variant="ghost">Caption</CaptionButton>

            <Separator className="my-1" orientation="vertical" />

            <Button size="sms" variant="ghost" {...buttonProps}>
              <Icons.delete className="size-4" />
            </Button>
            {isImage && (
              <Button
                variant="ghost"
                className=""
                onClick={() => {
                  upload()
                }}
              >
                upload
              </Button>
            )}
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
