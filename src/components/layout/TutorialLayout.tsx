import Header from '@/components/layout/Header'
import { Toaster } from '@/components/ui/toaster'
import { Meteors } from '@/components/ui/meteors'
import Title from './Title'
import Sidebar from './Sidebar'
import React, { Fragment } from 'react'
import { Chapter } from '@/types'
import { useAtomValue } from 'jotai'
import { tutorialToCAtom } from '@/store'
import { useParams } from 'react-router-dom'

interface ITutorialToC {
  tutorialToC: Chapter[]
  depth?: number
  path?: string
}

const TutorialToC = React.memo(({ tutorialToC, path, depth = 0 }: ITutorialToC) => {
  const renderTitle = (chapter: Chapter, depth: number) => {
    const isActive = path === chapter.path.match(/^(.*?).md$/)?.[1]

    return (
      <li
        id={chapter.path.match(/^(.*?).md$/)?.[1]}
        className={`border-slate-600 py-1   ${depth === 0 ? 'mb-1 border-none pl-1' : 'border-l-2 pl-2'} ${
          depth === 0 && chapter.children?.length === 0 ? 'mb-3' : ''
        }
        ${isActive ? '' : 'cursor-pointer hover:border-slate-500 hover:bg-slate-800'}
        `}
      >
        <a href={isActive ? undefined : encodeURIComponent(chapter.path.match(/^(.*?).md$/)?.[1] || '')}>
          <p
            className={`pl-${depth * 2} break-words text-left text-muted-foreground ${
              depth === 0 ? 'text-white' : ''
            } ${isActive ? '!text-blue-400' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {chapter.title}
          </p>
        </a>
      </li>
    )
  }

  return (
    <ul className="mb-6 flex flex-col">
      {tutorialToC.map((chapter, index) => (
        <Fragment key={index}>
          {renderTitle(chapter, depth)}
          {chapter.children && chapter.children.length > 0 && (
            <TutorialToC tutorialToC={chapter.children} path={path} depth={depth + 1} />
          )}
        </Fragment>
      ))}
    </ul>
  )
})

TutorialToC.displayName = 'TutorialToC'

export default function TutorialLayout({ children }: { children: React.ReactNode }) {
  const { path } = useParams()
  const tutorialToC = useAtomValue(tutorialToCAtom)

  return (
    <div className="grid h-screen w-full overflow-hidden md:grid-cols-[240px_1fr] lg:grid-cols-[300px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Title />
          </div>
          <div className="flex-1 overflow-y-auto">
            <Sidebar />
            {/* <Separator.Root className="mx-4 lg:mx-6 h-[2px] w-[85%] bg-muted mt-2" /> */}
            <section className="flex flex-col items-start px-4 py-4 text-sm font-medium lg:px-6">
              {tutorialToC && <TutorialToC tutorialToC={tutorialToC} path={path} />}
            </section>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex flex-1 flex-col gap-4 overflow-auto scroll-smooth p-4 lg:gap-6 lg:p-6" id="scrollRef">
          {children}
          <div className="pointer-events-none fixed bottom-0 left-[220px] right-0 top-14 z-[-1] overflow-hidden md:left-[220px] lg:left-[280px] lg:top-[60px]">
            <Meteors number={20} />
          </div>
        </main>
        <Toaster />
      </div>
    </div>
  )
}
