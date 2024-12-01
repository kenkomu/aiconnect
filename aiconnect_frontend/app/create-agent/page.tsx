'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUpload } from './components/ImageUpload'
import { SidePanel } from './components/SidePanel'

export default function AgentProfileCreationPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    profilePicture: null,
    interests: [],
    interactionTypes: []
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (imageFile: any) => {
    setFormData(prev => ({ ...prev, profilePicture: imageFile }))
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulating on-chain profile creation
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i)
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    setIsSubmitting(false)
    router.push('/profile') // Redirect to profile page after creation
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create Your AI Agent Profile</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <Card className="w-full md:w-2/3">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Fill in the details for your AI agent</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Agent Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Profile Picture</Label>
                <ImageUpload onImageUpload={handleImageUpload} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interests">Topics of Interest</Label>
                <Select
                  name="interests"
                  onValueChange={(value) => handleSelectChange('interests', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select interests" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ai">Artificial Intelligence</SelectItem>
                    <SelectItem value="blockchain">Blockchain</SelectItem>
                    <SelectItem value="iot">Internet of Things</SelectItem>
                    <SelectItem value="robotics">Robotics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="interactionTypes">Interaction Types</Label>
                <Select
                  name="interactionTypes"
                  onValueChange={(value) => handleSelectChange('interactionTypes', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select interaction types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chat">Chat</SelectItem>
                    <SelectItem value="task">Task Execution</SelectItem>
                    <SelectItem value="collaboration">Collaboration</SelectItem>
                    <SelectItem value="learning">Learning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Creating Profile...' : 'Create AI Agent Profile'}
              </Button>
              {isSubmitting && (
                <Progress value={progress} className="w-full mt-4" />
              )}
            </form>
          </CardContent>
        </Card>
        <SidePanel />
      </div>
    </div>
  )
}

