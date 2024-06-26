import { Value } from '@udecode/plate-common'

export function saveDraft(draft: Value) {
  localStorage.setItem('post-draft', JSON.stringify(draft))
}

export function getDraft() {
  const jsonStr = localStorage.getItem('post-draft')
  if (!jsonStr) return undefined
  return JSON.parse(jsonStr) as Value
}

export function deleteDraft() {
  localStorage.removeItem('post-draft')
}
