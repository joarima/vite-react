import { PlateEditor } from '@/components/PlateEdtor'
import { PlateController } from '@udecode/plate-common'
import { useParams } from 'react-router-dom'

function App() {
  const { id } = useParams<{ id: string }>()

  const value = (() => {
    if (id) {
      console.log(id)
      // get value with id
      return `value with ${id}`
    }
    console.log('no id')
    // get latest value
    return 'latest value'
  })()
  console.log(String(value))
  return (
    <div className="flex-1">
      <p>
        id: {value}, value: {value}
      </p>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <PlateController>
          <PlateEditor />
        </PlateController>
      </section>
    </div>
  )
}

export default App
