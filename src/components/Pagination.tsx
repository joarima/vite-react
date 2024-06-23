import {
  Pagination as Pagi,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { PostListData, PostRecord } from '@/types/Editor'

type Props = {
  currentId?: string
  record: PostRecord
  posts: PostListData[]
  totalPagesToDisplay?: number
}

export function Pagination({
  currentId,
  record,
  posts,
  totalPagesToDisplay = 5,
}: Props) {
  const currentPostIndex = posts.findIndex((p) => p.id === record?.id)
  const currentPostNumber = currentPostIndex + 1
  const totalPostNumber = posts.length
  const indexArray = Array.from(
    { length: totalPostNumber },
    (_, i) => totalPostNumber - i
  )

  const showLeftEllipsis = currentPostNumber - 1 > totalPagesToDisplay / 2
  const showRightEllipsis =
    posts.length - currentPostNumber > totalPagesToDisplay / 2

  const getPaginationPosts = () => {
    if (posts.length <= totalPagesToDisplay) {
      return posts
    } else {
      const half = Math.floor(totalPagesToDisplay / 2)
      // To ensure that the current page is always in the middle
      let start = currentPostNumber - half
      let end = currentPostNumber + half
      // If the current page is near the start
      if (start < 1) {
        start = 1
        end = totalPagesToDisplay
      }
      // // If the current page is near the end
      if (end > totalPostNumber) {
        start = totalPostNumber - totalPagesToDisplay + 1
        end = totalPostNumber
      }
      return posts.slice(start - 1, end)
    }
  }

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

  const paginationItems = getPaginationPosts().map((post, index) => {
    return (
      <PaginationItem key={post.id}>
        <PaginationLink
          href={`/${post.id}`}
          isActive={(!currentId && index === 0) || currentId === post.id}
        >
          {indexArray[post.order - 1]}
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
        {showLeftEllipsis && (
          <PaginationItem>
            <PaginationLink href={`/${posts[0].id}`}>{1}</PaginationLink>
          </PaginationItem>
        )}
        {showLeftEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {paginationItems}
        {showRightEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {showRightEllipsis && (
          <PaginationItem>
            <PaginationLink href={`/${posts[totalPostNumber - 1].id}`}>
              {totalPostNumber}
            </PaginationLink>
          </PaginationItem>
        )}
        {paginationNextItem}
      </PaginationContent>
    </Pagi>
  )
}
