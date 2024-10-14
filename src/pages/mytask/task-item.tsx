import { Button } from '@/components/ui/button'
import { Task } from '@/types'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { formatDistanceToNow } from 'date-fns'
import { CircleCheck, CircleDot, Clock } from 'lucide-react'
import _ from 'lodash'

const darkModeColors = [
  '#FF6F61', // 亮橙色
  '#6EC1E4', // 亮蓝色
  '#F09232', // 亮粉色
]

const getRandomColor = () => _.sample(darkModeColors)

export const TaskItem = ({ item }: { item: Task }) => {
  return (
    <article className="group relative z-[1] h-full w-full rounded-2xl border p-4 transition-all duration-200 ease-in hover:scale-[0.998] hover:border hover:border-opacity-80 hover:bg-white/10">
      <div className="flex items-center justify-between gap-4">
        <div className="flex w-full flex-row items-start gap-3">
          <div className="mt-1 h-8">
            {item.state === 'open' ? (
              <CircleDot className="w-6 text-green-600" />
            ) : (
              <CircleCheck className="w-6 text-purple-600" />
            )}
          </div>
          <Button asChild variant="link" className="!line-clamp-2 h-16 w-full break-all !p-0 px-0 text-2xl font-bold">
            <span
              className="z-10"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                window.open(item.htmlUrl, '_blank')
              }}
            >
              {`${item.title}`}
            </span>
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex h-full flex-col justify-between gap-2 overflow-hidden rounded">
          <div className="flex flex-col gap-4">
            <div className="mt-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-muted-foreground">
              {item.body || 'No description...'}
            </div>
          </div>
          <div className="mt-2 flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-4">
              <Avatar className="h-4 w-4">
                <AvatarImage
                  src={item.assignees[0]?.avatarUrl || 'https://avatars.githubusercontent.com/u/8191686?v=4'}
                />
              </Avatar>
              <div className="flex flex-row items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-xs">{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</span>
              </div>
            </div>

            <div className="flex flex-row items-center justify-between gap-2 pr-4">
              <div>
                {item.state === 'closed' ? (
                  <Button
                    disabled
                    className="bg-greyscale-50/8 w-24 border border-white/80 text-white hover:border-opacity-80 hover:bg-white/10"
                  >
                    Closed
                  </Button>
                ) : !item.assignees.length ? (
                  <></>
                ) : (
                  // <Button
                  //   onClick={handleDisclaim}
                  //   className="border-white/80 bg-greyscale-50/8 hover:bg-white/10 border hover:border-opacity-80 w-24 text-white"
                  // >
                  //   Disclaim
                  // </Button>
                  <Button
                    disabled
                    className="bg-greyscale-50/8 w-24 border border-white/80 text-white hover:border-opacity-80 hover:bg-white/10"
                  >
                    Claimed
                  </Button>
                )}
              </div>
            </div>
          </div>
          {/* <div className="h-8">
            {item.labels.length > 0 && (
              <span
                className="inline-flex items-center px-2.5 py-0.5 border rounded-full focus:ring-2 focus:ring-ring focus:ring-offset-2 font-semibold text-xs transition-colors focus:outline-none"
                style={{ backgroundColor: getRandomColor() }}
              >
                {item.labels[0]}
              </span>
            )}
          </div> */}
          <div className="mt-2 border-t border-muted pt-2">
            {item.labels.length > 0 && (
              <span
                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                style={{ backgroundColor: getRandomColor() }}
              >
                {item.labels[0]}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
