import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Search as SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

type Props = {
  setSearchWord: React.Dispatch<React.SetStateAction<string | undefined>>
}

export function Search({ setSearchWord }: Props) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [word, setWord] = useState<string | undefined>(undefined)

  useEffect(() => {
    console.log(word)
  }, [word])

  const onSearch = () => {
    setSearchWord(word)
    setWord(undefined)
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="font-thin text-xs px-2"
          variant="outline"
          onClick={() => {
            setDialogOpen(true)
          }}
        >
          <SearchIcon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-thin">Search</DialogTitle>
          {/* <DialogDescription className="font-thin">
            and with | space |, or with | OR |
          </DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="email"
              type="text"
              className="col-span-3"
              onChange={(e) => {
                setWord(e.target.value)
              }}
            />
            <Button
              className="font-thin"
              type="submit"
              onClick={() => {
                onSearch()
              }}
            >
              Search
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
