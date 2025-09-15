'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import toast from 'react-hot-toast'
import { CreateTaskModal } from './CreateTaskModal'
import { TaskDetailModal } from './TaskDetailModal'
import { EmailCampaignModal } from './EmailCampaignModal'

interface Task {
  id: string
  title: string
  description: string | null
  status: string
  dueDate: Date | null
  project: {
    id: string
    name: string
    service: {
      category: string
    } | null
  }
}

interface KanbanBoardProps {
  initialTasks: Task[]
  overdueTasks: number
}

const columns = [
  { id: 'TODO', title: 'To Do', color: 'gray' },
  { id: 'IN_PROGRESS', title: 'In Progress', color: 'blue' },
  { id: 'REVIEW', title: 'In Review', color: 'orange' },
  { id: 'DONE', title: 'Completed', color: 'green' },
]

export function KanbanBoard({ initialTasks, overdueTasks }: KanbanBoardProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEmailCampaignModalOpen, setIsEmailCampaignModalOpen] = useState(false)
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const tasksByStatus = {
    TODO: tasks.filter(t => t.status === 'TODO'),
    IN_PROGRESS: tasks.filter(t => t.status === 'IN_PROGRESS'),
    REVIEW: tasks.filter(t => t.status === 'REVIEW'),
    DONE: tasks.filter(t => t.status === 'DONE')
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    
    if (!over) {
      setActiveId(null)
      return
    }

    const taskId = active.id as string
    const newStatus = over.id as string
    
    // Find the task that was dragged
    const task = tasks.find(t => t.id === taskId)
    if (!task || task.status === newStatus) {
      setActiveId(null)
      return
    }

    // Optimistically update the UI
    setTasks(prevTasks => 
      prevTasks.map(t => 
        t.id === taskId ? { ...t, status: newStatus } : t
      )
    )

    try {
      // Update the task status in the database
      const response = await fetch('/api/dashboard/tasks', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: taskId,
          status: newStatus,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update task')
      }

      toast.success('Task status updated!')
    } catch (error) {
      // Revert the optimistic update on error
      setTasks(prevTasks => 
        prevTasks.map(t => 
          t.id === taskId ? { ...t, status: task.status } : t
        )
      )
      toast.error('Failed to update task status')
    }

    setActiveId(null)
  }

  const refreshTasks = async () => {
    try {
      const response = await fetch('/api/dashboard/tasks')
      if (response.ok) {
        const data = await response.json()
        setTasks(data)
      }
    } catch (error) {
      console.error('Failed to refresh tasks:', error)
    }
  }

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    setIsTaskDetailOpen(true)
  }

  const activeTask = activeId ? tasks.find(t => t.id === activeId) : null

  return (
    <>
      {/* Header with Create Button */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600 mt-2">
            Track and manage all your project tasks in one place
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
          >
            Create Task
          </button>
          <button
            onClick={() => setIsEmailCampaignModalOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Create Email Campaign
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
              <p className="text-xs text-gray-600 mt-1">Total Tasks</p>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        {columns.map((column) => {
          const count = tasksByStatus[column.id as keyof typeof tasksByStatus].length
          const colorClasses = {
            gray: 'text-gray-900',
            blue: 'text-blue-600',
            orange: 'text-orange-600',
            green: 'text-green-600',
          }
          const bgClasses = {
            gray: 'bg-gray-100',
            blue: 'bg-blue-100',
            orange: 'bg-orange-100',
            green: 'bg-green-100',
          }
          const dotClasses = {
            gray: 'bg-gray-400',
            blue: 'bg-blue-500',
            orange: 'bg-orange-500',
            green: 'bg-green-600',
          }

          return (
            <div key={column.id} className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-2xl font-bold ${colorClasses[column.color as keyof typeof colorClasses]}`}>
                    {count}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">{column.title}</p>
                </div>
                <div className={`w-10 h-10 ${bgClasses[column.color as keyof typeof bgClasses]} rounded-lg flex items-center justify-center`}>
                  {column.id === 'DONE' ? (
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <div className={`w-3 h-3 ${dotClasses[column.color as keyof typeof dotClasses]} rounded-full`}></div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Overdue Alert */}
      {overdueTasks > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-800">
              You have <span className="font-semibold">{overdueTasks} overdue task{overdueTasks > 1 ? 's' : ''}</span> that need attention
            </p>
          </div>
        </div>
      )}

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {columns.map((column) => (
            <DroppableColumn
              key={column.id}
              id={column.id}
              title={column.title}
              color={column.color}
              tasks={tasksByStatus[column.id as keyof typeof tasksByStatus]}
              onTaskClick={handleTaskClick}
            />
          ))}
        </div>
        
        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} isDragging /> : null}
        </DragOverlay>
      </DndContext>

      {/* Empty State */}
      {tasks.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 mt-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
            <p className="text-gray-500 mb-4">Create your first task to get started!</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg"
              >
                Create Your First Task
              </button>
              <button
                onClick={() => setIsEmailCampaignModalOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Create Email Campaign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskCreated={refreshTasks}
      />

      {/* Task Detail Modal */}
      <TaskDetailModal
        isOpen={isTaskDetailOpen}
        onClose={() => {
          setIsTaskDetailOpen(false)
          setSelectedTask(null)
        }}
        task={selectedTask}
        onTaskUpdated={refreshTasks}
      />

      {/* Email Campaign Modal */}
      <EmailCampaignModal
        isOpen={isEmailCampaignModalOpen}
        onClose={() => setIsEmailCampaignModalOpen(false)}
        onCampaignCreated={refreshTasks}
      />
    </>
  )
}

// Droppable Column Component
function DroppableColumn({ 
  id, 
  title, 
  color, 
  tasks,
  onTaskClick 
}: { 
  id: string
  title: string
  color: string
  tasks: Task[]
  onTaskClick: (task: Task) => void
}) {
  const bgClasses = {
    gray: 'bg-gray-50',
    blue: 'bg-blue-50',
    orange: 'bg-orange-50',
    green: 'bg-green-50',
  }

  const { setNodeRef, isOver } = useSortable({
    id,
    data: {
      type: 'column',
    },
  })

  return (
    <div 
      ref={setNodeRef}
      className={`${bgClasses[color as keyof typeof bgClasses]} rounded-xl p-4 ${
        isOver ? 'ring-2 ring-orange-500' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <span className="text-sm text-gray-500">{tasks.length}</span>
      </div>
      
      <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3 min-h-[200px]">
          {tasks.map((task) => (
            <SortableTaskCard key={task.id} task={task} onTaskClick={onTaskClick} />
          ))}
          {tasks.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-8">Drop tasks here</p>
          )}
        </div>
      </SortableContext>
    </div>
  )
}

// Sortable Task Card Component
function SortableTaskCard({ task, onTaskClick }: { task: Task; onTaskClick: (task: Task) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <TaskCard task={task} onClick={() => onTaskClick(task)} />
    </div>
  )
}

// Task Card Component
function TaskCard({ task, isDragging = false, onClick }: { task: Task; isDragging?: boolean; onClick?: () => void }) {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'DONE'
  
  return (
    <div onClick={onClick} className={`bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-move ${
      isDragging ? 'opacity-50' : ''
    }`}>
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{task.title}</h4>
      </div>
      
      {task.description && (
        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{task.description}</p>
      )}
      
      <div className="flex items-center justify-between">
        <Link 
          href={`/dashboard/projects/${task.project.id}`}
          className="text-xs text-orange-600 hover:text-orange-500"
          onClick={(e) => e.stopPropagation()}
        >
          {task.project.name}
        </Link>
        
        {task.dueDate && (
          <span className={`text-xs ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>
      
      {/* Priority/Service Badge */}
      {task.project.service && (
        <div className="mt-2">
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
            {task.project.service.category}
          </span>
        </div>
      )}
    </div>
  )
}