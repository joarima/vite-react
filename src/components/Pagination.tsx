import {
  Pagination as Pagi,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { PostListData, PostRecord } from '@/types/Editor'

type Props = {
  currentId?: string
  record?: PostRecord
  posts: PostListData[]
}

export function Pagination({ currentId, record, posts }: Props) {
  const currentPostIndex = posts.findIndex((p) => p.id === record?.id)
  const isFirstPost = currentPostIndex === 0
  const prevRecordId =
    !isFirstPost && currentPostIndex !== -1
      ? posts[currentPostIndex - 1].id
      : undefined

  const isLastPost = currentPostIndex === posts.length - 1
  const nextRecordId =
    !isLastPost && currentPostIndex !== -1
      ? posts[currentPostIndex + 1].id
      : undefined

  const paginationPrevItem = (
    <PaginationItem key="prev">
      <PaginationPrevious
        href={!isFirstPost ? `/${prevRecordId}` : undefined}
        aria-disabled={isFirstPost}
        tabIndex={isFirstPost ? -1 : undefined}
        className={isFirstPost ? 'pointer-events-none opacity-50' : undefined}
      />
    </PaginationItem>
  )

  const paginationItems = posts.map((post, index) => {
    return (
      <PaginationItem key={post.id}>
        <PaginationLink href={`/${post.id}`} isActive={currentId === post.id}>
          {index}
        </PaginationLink>
      </PaginationItem>
    )
  })

  const paginationNextItem = (
    <PaginationItem key="next">
      <PaginationNext
        href={!isLastPost ? `/${nextRecordId}` : undefined}
        aria-disabled={isLastPost}
        tabIndex={isLastPost ? -1 : undefined}
        className={isLastPost ? 'pointer-events-none opacity-50' : undefined}
      />
    </PaginationItem>
  )

  return (
    <Pagi>
      <PaginationContent>
        {paginationPrevItem}
        {paginationItems}
        {paginationNextItem}
      </PaginationContent>
    </Pagi>
  )
}
