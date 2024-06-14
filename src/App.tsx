import './App.css'
import { Top } from './components/Top'
import { Button } from '@/components/ui/button'

function App() {
  return (
    <div className="flex-1">
      <Button>Click me</Button>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <Top />
      </section>
    </div>
  )
}

export default App
