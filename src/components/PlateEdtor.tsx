import { cn, withProps } from '@udecode/cn'
import { createAlignPlugin } from '@udecode/plate-alignment'
import { createAutoformatPlugin } from '@udecode/plate-autoformat'
import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE,
  createBoldPlugin,
  createCodePlugin,
  createItalicPlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createUnderlinePlugin,
} from '@udecode/plate-basic-marks'
import {
  ELEMENT_BLOCKQUOTE,
  createBlockquotePlugin,
} from '@udecode/plate-block-quote'
import {
  createExitBreakPlugin,
  createSoftBreakPlugin,
} from '@udecode/plate-break'
import { createCaptionPlugin } from '@udecode/plate-caption'
import {
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
  ELEMENT_CODE_SYNTAX,
  createCodeBlockPlugin,
} from '@udecode/plate-code-block'
import {
  Plate,
  PlateLeaf,
  RenderAfterEditable,
  Value,
  createPlugins,
  useEditorReadOnly,
} from '@udecode/plate-common'
import { createDndPlugin } from '@udecode/plate-dnd'
import { createEmojiPlugin } from '@udecode/plate-emoji'
import {
  ELEMENT_EXCALIDRAW,
  createExcalidrawPlugin,
} from '@udecode/plate-excalidraw'
import {
  createFontBackgroundColorPlugin,
  createFontColorPlugin,
  createFontSizePlugin,
} from '@udecode/plate-font'
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  createHeadingPlugin,
} from '@udecode/plate-heading'
import { MARK_HIGHLIGHT, createHighlightPlugin } from '@udecode/plate-highlight'
import {
  ELEMENT_HR,
  createHorizontalRulePlugin,
} from '@udecode/plate-horizontal-rule'
import { createIndentPlugin } from '@udecode/plate-indent'
import { createIndentListPlugin } from '@udecode/plate-indent-list'
import { MARK_KBD, createKbdPlugin } from '@udecode/plate-kbd'
import { ELEMENT_COLUMN, createColumnPlugin } from '@udecode/plate-layout'
import { createLineHeightPlugin } from '@udecode/plate-line-height'
import { ELEMENT_LINK, createLinkPlugin } from '@udecode/plate-link'
import { ELEMENT_TODO_LI, createTodoListPlugin } from '@udecode/plate-list'
import {
  ELEMENT_IMAGE,
  ELEMENT_MEDIA_EMBED,
  createImagePlugin,
  createMediaEmbedPlugin,
} from '@udecode/plate-media'
import { createNodeIdPlugin } from '@udecode/plate-node-id'
import {
  ELEMENT_PARAGRAPH,
  createParagraphPlugin,
} from '@udecode/plate-paragraph'
import { createResetNodePlugin } from '@udecode/plate-reset-node'
import { createDeletePlugin } from '@udecode/plate-select'
import { createBlockSelectionPlugin } from '@udecode/plate-selection'
import { createTabbablePlugin } from '@udecode/plate-tabbable'
import {
  ELEMENT_TABLE,
  ELEMENT_TD,
  ELEMENT_TH,
  ELEMENT_TR,
  createTablePlugin,
} from '@udecode/plate-table'
import { createTogglePlugin } from '@udecode/plate-toggle'
import { createTrailingBlockPlugin } from '@udecode/plate-trailing-block'

import { createJuicePlugin } from '@udecode/plate-juice'
import { createDeserializeCsvPlugin } from '@udecode/plate-serializer-csv'
import { createDeserializeDocxPlugin } from '@udecode/plate-serializer-docx'
import { createDeserializeMdPlugin } from '@udecode/plate-serializer-md'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { BlockquoteElement } from '@/components/plate-ui/blockquote-element'
import { CodeBlockElement } from '@/components/plate-ui/code-block-element'
import { CodeLeaf } from '@/components/plate-ui/code-leaf'
import { CodeLineElement } from '@/components/plate-ui/code-line-element'
import { CodeSyntaxLeaf } from '@/components/plate-ui/code-syntax-leaf'
import { ColumnElement } from '@/components/plate-ui/column-element'
import { Editor } from '@/components/plate-ui/editor'
import { ExcalidrawElement } from '@/components/plate-ui/excalidraw-element'
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar'
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons'
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar'
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons'
import { HeadingElement } from '@/components/plate-ui/heading-element'
import { HighlightLeaf } from '@/components/plate-ui/highlight-leaf'
import { HrElement } from '@/components/plate-ui/hr-element'
import { ImageElement } from '@/components/plate-ui/image-element'
import { KbdLeaf } from '@/components/plate-ui/kbd-leaf'
import { LinkElement } from '@/components/plate-ui/link-element'
import { LinkFloatingToolbar } from '@/components/plate-ui/link-floating-toolbar'
import { MediaEmbedElement } from '@/components/plate-ui/media-embed-element'
import { ParagraphElement } from '@/components/plate-ui/paragraph-element'
import { withPlaceholders } from '@/components/plate-ui/placeholder'
import {
  TableCellElement,
  TableCellHeaderElement,
} from '@/components/plate-ui/table-cell-element'
import { TableElement } from '@/components/plate-ui/table-element'
import { TableRowElement } from '@/components/plate-ui/table-row-element'
import { TodoListElement } from '@/components/plate-ui/todo-list-element'
import { TooltipProvider } from '@/components/plate-ui/tooltip'
import { withDraggables } from '@/components/plate-ui/with-draggables'
import { Button } from '@/components/ui/button'
import { format } from '@/lib/date'
import { PostRecord } from '@/types/Editor'
import { useRef, useState } from 'react'
import { useAuth } from './SupabaseAuthProvider'
import { Skeleton } from './ui/skeleton'

const plugins = createPlugins(
  [
    createParagraphPlugin(),
    createHeadingPlugin(),
    createBlockquotePlugin(),
    createCodeBlockPlugin(),
    createHorizontalRulePlugin(),
    createLinkPlugin({
      renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
    }),
    createImagePlugin(),
    createMediaEmbedPlugin(),
    createCaptionPlugin({
      options: {
        pluginKeys: [
          // ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED
        ],
      },
    }),
    createTablePlugin(),
    createTodoListPlugin(),
    createExcalidrawPlugin(),
    createTogglePlugin(),
    createColumnPlugin(),
    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createStrikethroughPlugin(),
    createCodePlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),
    createFontColorPlugin(),
    createFontBackgroundColorPlugin(),
    createFontSizePlugin(),
    createHighlightPlugin(),
    createKbdPlugin(),
    createAlignPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3
          ],
        },
      },
    }),
    createIndentPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK
          ],
        },
      },
    }),
    createIndentListPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK
          ],
        },
      },
    }),
    createLineHeightPlugin({
      inject: {
        props: {
          defaultNodeValue: 1.5,
          validNodeValues: [1, 1.2, 1.5, 2, 3],
          validTypes: [
            ELEMENT_PARAGRAPH,
            // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3
          ],
        },
      },
    }),
    createAutoformatPlugin({
      options: {
        rules: [
          // Usage: https://platejs.org/docs/autoformat
        ],
        enableUndoOnDelete: true,
      },
    }),
    createBlockSelectionPlugin({
      options: {
        sizes: {
          top: 0,
          bottom: 0,
        },
      },
    }),
    createDndPlugin({
      options: { enableScroller: true },
    }),
    createEmojiPlugin(),
    createExitBreakPlugin({
      options: {
        rules: [
          {
            hotkey: 'mod+enter',
          },
          {
            hotkey: 'mod+shift+enter',
            before: true,
          },
          {
            hotkey: 'enter',
            query: {
              start: true,
              end: true,
              // allow: KEYS_HEADING,
            },
            relative: true,
            level: 1,
          },
        ],
      },
    }),
    createNodeIdPlugin(),
    createResetNodePlugin({
      options: {
        rules: [
          // Usage: https://platejs.org/docs/reset-node
        ],
      },
    }),
    createDeletePlugin(),
    createSoftBreakPlugin({
      options: {
        rules: [
          { hotkey: 'shift+enter' },
          {
            hotkey: 'enter',
            query: {
              allow: [ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD],
            },
          },
        ],
      },
    }),
    createTabbablePlugin(),
    createTrailingBlockPlugin({
      options: { type: ELEMENT_PARAGRAPH },
    }),
    createDeserializeDocxPlugin(),
    createDeserializeCsvPlugin(),
    createDeserializeMdPlugin(),
    createJuicePlugin(),
  ],
  {
    components: withDraggables(
      withPlaceholders({
        [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
        [ELEMENT_CODE_BLOCK]: CodeBlockElement,
        [ELEMENT_CODE_LINE]: CodeLineElement,
        [ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf,
        [ELEMENT_EXCALIDRAW]: ExcalidrawElement,
        [ELEMENT_HR]: HrElement,
        [ELEMENT_IMAGE]: ImageElement,
        [ELEMENT_LINK]: LinkElement,
        [ELEMENT_COLUMN]: ColumnElement,
        [ELEMENT_H1]: withProps(HeadingElement, { variant: 'h1' }),
        [ELEMENT_H2]: withProps(HeadingElement, { variant: 'h2' }),
        [ELEMENT_H3]: withProps(HeadingElement, { variant: 'h3' }),
        [ELEMENT_H4]: withProps(HeadingElement, { variant: 'h4' }),
        [ELEMENT_H5]: withProps(HeadingElement, { variant: 'h5' }),
        [ELEMENT_H6]: withProps(HeadingElement, { variant: 'h6' }),
        [ELEMENT_MEDIA_EMBED]: MediaEmbedElement,
        [ELEMENT_PARAGRAPH]: ParagraphElement,
        [ELEMENT_TABLE]: TableElement,
        [ELEMENT_TR]: TableRowElement,
        [ELEMENT_TD]: TableCellElement,
        [ELEMENT_TH]: TableCellHeaderElement,
        [ELEMENT_TODO_LI]: TodoListElement,
        [MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
        [MARK_CODE]: CodeLeaf,
        [MARK_HIGHLIGHT]: HighlightLeaf,
        [MARK_ITALIC]: withProps(PlateLeaf, { as: 'em' }),
        [MARK_KBD]: KbdLeaf,
        [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: 's' }),
        [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: 'sub' }),
        [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: 'sup' }),
        [MARK_UNDERLINE]: withProps(PlateLeaf, { as: 'u' }),
      })
    ),
  }
)

type EditorProps = {
  record?: PostRecord
}

export function PostEditor(initialState: EditorProps) {
  const containerRef = useRef(null)
  const id = 'pEditor'
  const readOnly = useEditorReadOnly()
  const { user } = useAuth()
  const isAdmin = !!user
  const initialPlugins = (() => {
    if (isAdmin) return plugins
    return undefined
  })()
  const initialValue = initialState.record?.content

  const [editorState, setEditorState] = useState<Value | undefined>(undefined)

  const onSave = () => {
    const content = editorState as object
    if (content === ([] as object) || content === undefined) {
      alert('no content')
      return
    }
    // savePost(content)
  }

  return (
    <div>
      {initialValue ? (
        <div className="max-w-[1336px] rounded-lg border bg-background shadow">
          <TooltipProvider>
            <DndProvider backend={HTML5Backend}>
              <Plate
                id={id}
                plugins={initialPlugins}
                initialValue={initialValue}
                onChange={(state) => {
                  console.log('change')
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

                  {initialState.record && (
                    <p className="px-[30px] py-[5px] font-bold text-left">
                      {format(initialState.record!.createdAt)}
                    </p>
                  )}
                  <Editor
                    className="px-[96px] py-5 text-left"
                    autoFocus
                    focusRing={false}
                    variant="ghost"
                    size="md"
                  />

                  <FloatingToolbar>
                    <FloatingToolbarButtons />
                  </FloatingToolbar>
                </div>
              </Plate>
            </DndProvider>
          </TooltipProvider>
        </div>
      ) : (
        <Skeleton className="h-[125px] w-full py-5 rounded-xl" />
      )}
      {!readOnly && isAdmin && (
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
