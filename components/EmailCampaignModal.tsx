'use client'

import React, { useState } from 'react'
import { ChevronRight, ChevronLeft, Check, Mail, X } from 'lucide-react'
import toast from 'react-hot-toast'

interface EmailCampaignModalProps {
  isOpen: boolean
  onClose: () => void
  onCampaignCreated: () => void
}

export function EmailCampaignModal({ isOpen, onClose, onCampaignCreated }: EmailCampaignModalProps) {
  const [formData, setFormData] = useState({})
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleNext = () => {
    setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
  }

  const resetForm = () => {
    setFormData({})
    setCurrentStep(0)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/dashboard/email-campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to create email campaign')
      }

      toast.success('Email campaign created successfully!')
      onCampaignCreated()
      handleClose()
    } catch (error) {
      toast.error('Failed to create email campaign')
      console.error('Error creating email campaign:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const steps = [
    {
      title: 'Campaign Setup',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Campaign Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="e.g., Holiday Sale Campaign"
              onChange={(e) => handleInputChange('campaignName', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">When does this need to be sent?</label>
            <input
              type="datetime-local"
              className="w-full p-2 border rounded-lg"
              onChange={(e) => handleInputChange('sendDate', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email Type</label>
            <select className="w-full p-2 border rounded-lg" onChange={(e) => handleInputChange('emailType', e.target.value)}>
              <option value="">Select type...</option>
              <option value="promotional">Promotional</option>
              <option value="newsletter">Newsletter</option>
              <option value="announcement">Announcement</option>
              <option value="welcome">Welcome Series</option>
              <option value="abandoned">Abandoned Cart</option>
              <option value="transactional">Transactional</option>
            </select>
          </div>
        </div>
      )
    },
    {
      title: 'Audience & Segmentation',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Is this to be segmented?</label>
            <div className="space-y-2">
              <button
                onClick={() => handleInputChange('isSegmented', true)}
                className={`w-full p-3 border rounded-lg text-left ${(formData as any).isSegmented === true ? 'border-green-500 bg-green-50' : ''}`}
              >
                Yes, send to specific segments
              </button>
              <button
                onClick={() => handleInputChange('isSegmented', false)}
                className={`w-full p-3 border rounded-lg text-left ${(formData as any).isSegmented === false ? 'border-green-500 bg-green-50' : ''}`}
              >
                No, send to entire list
              </button>
            </div>
          </div>
          {(formData as any).isSegmented === true && (
            <div>
              <label className="block text-sm font-medium mb-2">Describe your segments</label>
              <textarea
                className="w-full p-2 border rounded-lg h-24"
                placeholder="e.g., Customers who purchased in last 30 days, VIP members, New subscribers..."
                onChange={(e) => handleInputChange('segments', e.target.value)}
              />
            </div>
          )}
        </div>
      )
    },
    {
      title: 'Content Creation',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Would you like to provide all the content or would you like it to be generated?</label>
            <div className="space-y-2">
              <button
                onClick={() => handleInputChange('contentProvider', 'client')}
                className={`w-full p-3 border rounded-lg text-left ${(formData as any).contentProvider === 'client' ? 'border-green-500 bg-green-50' : ''}`}
              >
                <div className="font-medium">I'll provide the content</div>
                <div className="text-sm text-gray-600">Subject line, body content, and images</div>
              </button>
              <button
                onClick={() => handleInputChange('contentProvider', 'agency')}
                className={`w-full p-3 border rounded-lg text-left ${(formData as any).contentProvider === 'agency' ? 'border-green-500 bg-green-50' : ''}`}
              >
                <div className="font-medium">Please generate the content</div>
                <div className="text-sm text-gray-600">You'll create everything based on my brief</div>
              </button>
            </div>
          </div>
          {(formData as any).contentProvider === 'client' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Subject Line</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter your email subject line..."
                  onChange={(e) => handleInputChange('subjectLine', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Content</label>
                <textarea
                  className="w-full p-2 border rounded-lg h-32"
                  placeholder="Paste your email content here..."
                  onChange={(e) => handleInputChange('emailContent', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Images/Assets</label>
                <textarea
                  className="w-full p-2 border rounded-lg"
                  placeholder="Describe images needed or provide links..."
                  onChange={(e) => handleInputChange('images', e.target.value)}
                />
              </div>
            </>
          )}
          {(formData as any).contentProvider === 'agency' && (
            <div>
              <label className="block text-sm font-medium mb-2">Tell us a little bit about this email</label>
              <textarea
                className="w-full p-2 border rounded-lg h-32"
                placeholder="Describe the purpose, key messages, offers, and call-to-action for this email so we can create the subject line, content, and images for you..."
                onChange={(e) => handleInputChange('emailBrief', e.target.value)}
              />
            </div>
          )}
        </div>
      )
    }
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Mail className="text-white" size={20} />
              </div>
              <h2 className="text-2xl font-bold">Email Marketing Campaign</h2>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-2 mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-2 rounded-full ${
                  index <= currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">
              {steps[currentStep]?.title}
            </h3>

            {steps[currentStep]?.content}
          </div>

          <div className="flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                currentStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ChevronLeft size={20} />
              Back
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
              >
                Next
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? 'Creating...' : 'Create Campaign'}
                <Check size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}