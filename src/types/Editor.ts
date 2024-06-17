import { Value } from '@udecode/plate-common'

export type PostRecord = {
  id: string
  order: number
  content: Value
  isOpen: boolean
  createdAt: string
  updatedAt: string
}
