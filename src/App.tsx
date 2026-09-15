import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'

type Filter = 'all' | 'active' | 'done'

type Task = {
  id: number
  title: string
  done: boolean
}

const starterTasks: Task[] = [
  { id: 1, title: 'Review project brief', done: true },
  { id: 2, title: 'Sketch the first user flow', done: false },
  { id: 3, title: 'Set up the component library', done: false },
  { id: 4, title: 'Share progress with the team', done: false },
]

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All tasks' },
  { value: 'active', label: 'Active' },
  { value: 'done', label: 'Done' },
]

function PlusIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 24 24" width="16">
      <path d="m5 12 4 4L19 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
    </svg>
  )
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(starterTasks)
  const [filter, setFilter] = useState<Filter>('all')
  const [newTask, setNewTask] = useState('')

  const remainingCount = tasks.filter((task) => !task.done).length
  const visibleTasks = useMemo(
    () => tasks.filter((task) => filter === 'all' || (filter === 'done' ? task.done : !task.done)),
    [filter, tasks],
  )

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const title = newTask.trim()
    if (!title) return

    setTasks((current) => [...current, { id: Date.now(), title, done: false }])
    setNewTask('')
  }

  function toggleTask(id: number) {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-[#172033]">
      <header className="border-b border-[#e5e9f1] bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5b5ce2] text-sm font-bold text-white shadow-[0_6px_16px_rgba(91,92,226,0.28)]">
              T
            </div>
            <span className="text-lg font-semibold tracking-[-0.02em]">Taskboard</span>
          </div>
          <span className="hidden text-sm text-[#8a93a5] sm:block">Keep the momentum going.</span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
        <section className="mb-9">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#5b5ce2]">Your workspace</p>
          <h1 className="text-4xl font-semibold tracking-[-0.045em] text-[#172033] sm:text-5xl">A clear mind starts here.</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#727d91]">
            Capture what needs doing, then make steady progress one task at a time.
          </p>
        </section>

        <form onSubmit={addTask} className="mb-8 flex flex-col gap-3 rounded-2xl border border-[#e5e9f1] bg-white p-3 shadow-[0_10px_30px_rgba(34,48,78,0.05)] sm:flex-row">
          <label className="sr-only" htmlFor="new-task">New task</label>
          <input
            id="new-task"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            placeholder="What needs to get done?"
            className="min-h-12 flex-1 rounded-xl bg-[#f7f8fc] px-4 text-[15px] text-[#172033] outline-none transition placeholder:text-[#a0a8b8] focus:bg-white focus:ring-2 focus:ring-[#c9c9fa]"
          />
          <button
            type="submit"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#5b5ce2] px-5 text-sm font-semibold text-white transition hover:bg-[#4d4ed0] focus:outline-none focus:ring-4 focus:ring-[#d9d9fb] active:translate-y-px"
          >
            <PlusIcon />
            Add task
          </button>
        </form>

        <section aria-label="Task list" className="overflow-hidden rounded-2xl border border-[#e5e9f1] bg-white shadow-[0_10px_30px_rgba(34,48,78,0.05)]">
          <div className="flex flex-col gap-4 border-b border-[#edf0f5] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="font-semibold text-[#172033]">Tasks</h2>
              <p className="mt-1 text-sm text-[#8a93a5]">
                {remainingCount === 0 ? 'Everything is complete.' : `${remainingCount} ${remainingCount === 1 ? 'task' : 'tasks'} remaining`}
              </p>
            </div>
            <div className="flex rounded-lg bg-[#f5f6fa] p-1" role="tablist" aria-label="Filter tasks">
              {filters.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="tab"
                  aria-selected={filter === option.value}
                  onClick={() => setFilter(option.value)}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition sm:text-sm ${
                    filter === option.value ? 'bg-white text-[#4e4fd2] shadow-sm' : 'text-[#8a93a5] hover:text-[#555f73]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            {visibleTasks.length > 0 ? visibleTasks.map((task) => (
              <div key={task.id} className="group flex items-center gap-4 border-b border-[#edf0f5] px-5 py-4 last:border-b-0 sm:px-6">
                <button
                  type="button"
                  aria-label={task.done ? `Mark "${task.title}" as active` : `Mark "${task.title}" as done`}
                  aria-pressed={task.done}
                  onClick={() => toggleTask(task.id)}
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition focus:outline-none focus:ring-4 focus:ring-[#e1e1fc] ${
                    task.done ? 'border-[#5b5ce2] bg-[#5b5ce2] text-white' : 'border-[#cbd2df] bg-white text-transparent hover:border-[#7778e9]'
                  }`}
                >
                  <CheckIcon />
                </button>
                <span className={`text-[15px] transition ${task.done ? 'text-[#a0a8b8] line-through' : 'text-[#3f4a60]'}`}>
                  {task.title}
                </span>
                {task.done && <span className="ml-auto text-xs font-medium text-[#a0a8b8]">Completed</span>}
              </div>
            )) : (
              <div className="px-6 py-14 text-center">
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0f0ff] text-[#5b5ce2]">
                  <CheckIcon />
                </div>
                <p className="font-medium text-[#3f4a60]">{filter === 'done' ? 'No completed tasks yet.' : 'You are all caught up.'}</p>
                <p className="mt-1 text-sm text-[#8a93a5]">{filter === 'done' ? 'Finish a task and it will show up here.' : 'Add a new task whenever something comes up.'}</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
