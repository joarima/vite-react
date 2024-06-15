import { PlateController } from '@udecode/plate-common'
import { PlateEditor } from './PlateEdtor'

export function Top() {
  return (
    <div>
      <PlateController>
        <PlateEditor />
      </PlateController>
    </div>
  )
}
