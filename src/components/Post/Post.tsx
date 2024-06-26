import { PostEditor } from '@/components/Post/PostEdtor'

import { useAuth } from '@/lib/auth'
import { PlateController } from '@udecode/plate-common'
import { Pagination } from './Pagination'
import { usePost } from './Post.hooks'

export function Post() {
  const { isLoggedIn } = useAuth()

  const { id, searchWord, record, posts } = usePost(isLoggedIn)

  return (
    <div className="flex-1">
      <section className="w-full grid items-center gap-1 pb-8 pt-6 md:py-10">
        {searchWord && (
          <p className="w-1/3 mx-auto text-center text-2xl">
            &quot;{searchWord}&quot;
          </p>
        )}
        <PlateController>
          <PostEditor record={record} />
        </PlateController>
      </section>
      {record && <Pagination currentId={id} posts={posts} record={record} />}
    </div>
  )
}
