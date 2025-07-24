'use client'

import { PlusCircleOutline } from 'mdi-material-ui'
import { useMemo, useState } from 'react'
import { Column, Id, Task } from 'src/@core/components/card-statistics/types'
import ColumnContainer from 'src/pages/queue/ColumnContainer'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'
import TaskCard from 'src/pages/queue/TaskCard'

const defaultCols: Column[] = [
  { id: 'design', title: 'Design' },
  { id: 'print', title: 'Print' },
  { id: 'postProcess', title: 'Post-Process' },
  { id: 'completed', title: 'Completed' }
]

const defaultTasks: Task[] = [
  { id: '1', columnId: 'design', content: 'Design new prototype part in CAD' },
  { id: '2', columnId: 'prepare', content: 'Slice model for optimal printing' },
  { id: '3', columnId: 'print', content: 'Print prototype using PLA material' },
  { id: '4', columnId: 'postProcess', content: 'Remove support material and sand the surface' },
  { id: '5', columnId: 'completed', content: 'Inspect and verify prototype dimensions' }
]

const PrintQueue = () => {
  const [columns, setColumns] = useState<Column[]>(defaultCols)
  const columnsId = useMemo(() => columns.map(col => col.id), [columns])

  const [tasks, setTasks] = useState<Task[]>(defaultTasks)
  const [activeColumn, setActiveColumn] = useState<Column | null>(null)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      }
    })
  )

  function generateId() {
    return Math.floor(Math.random() * 10001).toString()
  }

  function createTask(columnId: Id) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`
    }
    setTasks(prev => [...prev, newTask])
  }

  function deleteTask(id: Id) {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  function updateTask(id: Id, content: string) {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, content } : task))
  }

  function createNewColumn() {
    const newColumn: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`
    }
    setColumns(prev => [...prev, newColumn])
  }

  function deleteColumn(id: Id) {
    setColumns(prev => prev.filter(col => col.id !== id))
    setTasks(prev => prev.filter(task => task.columnId !== id))
  }

  function updateColumn(id: Id, title: string) {
    setColumns(prev => prev.map(col => col.id === id ? { ...col, title } : col))
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column)
    }

    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task)
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null)
    setActiveTask(null)

    const { active, over } = event
    if (!over || active.id === over.id) return

    if (active.data.current?.type === 'Column') {
      const oldIndex = columns.findIndex(col => col.id === active.id)
      const newIndex = columns.findIndex(col => col.id === over.id)
      setColumns(arrayMove(columns, oldIndex, newIndex))
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const isActiveTask = active.data.current?.type === 'Task'
    const isOverTask = over.data.current?.type === 'Task'
    const isOverColumn = over.data.current?.type === 'Column'

    if (!isActiveTask) return

    setTasks(prev => {
      const activeIndex = prev.findIndex(t => t.id === active.id)

      if (isOverTask) {
        const overIndex = prev.findIndex(t => t.id === over.id)

        if (prev[activeIndex].columnId !== prev[overIndex].columnId) {
          prev[activeIndex].columnId = prev[overIndex].columnId
          return arrayMove(prev, activeIndex, overIndex - 1)
        }
        return arrayMove(prev, activeIndex, overIndex)
      }

      if (isOverColumn) {
        prev[activeIndex].columnId = over.id
        return arrayMove(prev, activeIndex, activeIndex)
      }

      return prev
    })
  }

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map(col => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter(task => task.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={createNewColumn}
            className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4 ring-stone-400 hover:ring-2 flex gap-2"
          >
            <PlusCircleOutline />
            Add Column
          </button>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter(task => task.columnId === activeColumn.id)}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  )
}

export default PrintQueue
