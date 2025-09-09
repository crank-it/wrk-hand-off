'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

interface TaskDetailModalProps {
  isOpen: boolean
  onClose: () => void
  task: any
  onTaskUpdated: () => void
}

export function TaskDetailModal({ isOpen, onClose, task, onTaskUpdated }: TaskDetailModalProps) {
  const [loading, setLoading] = useState(false)
  const [comments, setComments] = useState<any[]>([])
  const [newComment, setNewComment] = useState('')
  const [editingTask, setEditingTask] = useState(false)
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: '',
    dueDate: ''
  })

  useEffect(() => {
    if (task && isOpen) {
      setTaskData({
        title: task.title,
        description: task.description || '',
        status: task.status,
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
      })
      fetchComments()
    }
  }, [task, isOpen])

  const fetchComments = async () => {
    if (!task) return
    
    try {
      const response = await fetch(`/api/dashboard/tasks/${task.id}/comments`)
      if (response.ok) {
        const data = await response.json()
        setComments(data)
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error)
    }
  }

  const handleUpdateTask = async () => {
    setLoading(true)

    try {
      const response = await fetch(`/api/dashboard/tasks/${task.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: taskData.title,
          description: taskData.description || null,
          status: taskData.status,
          dueDate: taskData.dueDate ? new Date(taskData.dueDate).toISOString() : null
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update task')
      }

      toast.success('Task updated successfully!')
      setEditingTask(false)
      onTaskUpdated()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTask = async () => {
    if (!confirm('Are you sure you want to delete this task?')) {
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`/api/dashboard/tasks/${task.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to delete task')
      }

      toast.success('Task deleted successfully!')
      onTaskUpdated()
      onClose()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddComment = async () => {
    if (!newComment.trim()) return

    setLoading(true)

    try {
      const response = await fetch(`/api/dashboard/tasks/${task.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newComment.trim()
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to add comment')
      }

      const comment = await response.json()
      setComments([comment, ...comments])
      setNewComment('')
      toast.success('Comment added!')
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Delete this comment?')) return

    try {
      const response = await fetch(`/api/dashboard/tasks/${task.id}/comments/${commentId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to delete comment')
      }

      setComments(comments.filter(c => c.id !== commentId))
      toast.success('Comment deleted')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  if (!isOpen || !task) return null

  const statusColors = {
    TODO: 'bg-gray-100 text-gray-700',
    IN_PROGRESS: 'bg-blue-100 text-blue-700',
    REVIEW: 'bg-orange-100 text-orange-700',
    DONE: 'bg-green-100 text-green-700'
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              {editingTask ? (
                <input
                  type="text"
                  value={taskData.title}
                  onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                  className="text-2xl font-bold text-gray-900 w-full px-2 py-1 border border-gray-300 rounded-lg"
                />
              ) : (
                <h2 className="text-2xl font-bold text-gray-900">{task.title}</h2>
              )}
              <div className="flex items-center space-x-3 mt-2">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[task.status as keyof typeof statusColors]}`}>
                  {task.status.replace('_', ' ')}
                </span>
                <span className="text-sm text-gray-500">
                  in {task.project.name}
                </span>
                {task.dueDate && (
                  <span className="text-sm text-gray-500">
                    Due {format(new Date(task.dueDate), 'MMM d, yyyy')}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors ml-4"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Task Details */}
          <div className="space-y-6">
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              {editingTask ? (
                <textarea
                  value={taskData.description}
                  onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Add a description..."
                />
              ) : (
                <p className="text-gray-600">
                  {task.description || <span className="text-gray-400 italic">No description</span>}
                </p>
              )}
            </div>

            {/* Edit Form Fields */}
            {editingTask && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={taskData.status}
                    onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="REVIEW">Review</option>
                    <option value="DONE">Done</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                  <input
                    type="date"
                    value={taskData.dueDate}
                    onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center space-x-2">
                {editingTask ? (
                  <>
                    <button
                      onClick={handleUpdateTask}
                      disabled={loading}
                      className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:shadow-lg transition-shadow disabled:opacity-50"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setEditingTask(false)
                        setTaskData({
                          title: task.title,
                          description: task.description || '',
                          status: task.status,
                          dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
                        })
                      }}
                      className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditingTask(true)}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                  >
                    Edit Task
                  </button>
                )}
              </div>
              <button
                onClick={handleDeleteTask}
                disabled={loading}
                className="px-4 py-2 text-red-600 hover:text-red-700 font-medium transition-colors disabled:opacity-50"
              >
                Delete Task
              </button>
            </div>

            {/* Comments Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Comments</h3>
              
              {/* Add Comment Form */}
              <div className="mb-6">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                    placeholder="Add a comment..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleAddComment}
                    disabled={loading || !newComment.trim()}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:shadow-lg transition-shadow disabled:opacity-50"
                  >
                    Comment
                  </button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No comments yet</p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-gray-900">
                              {comment.user?.name || 'Unknown User'}
                            </span>
                            <span className="text-xs text-gray-500">
                              {format(new Date(comment.createdAt), 'MMM d, yyyy h:mm a')}
                            </span>
                          </div>
                          <p className="text-gray-700">{comment.content}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors ml-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}