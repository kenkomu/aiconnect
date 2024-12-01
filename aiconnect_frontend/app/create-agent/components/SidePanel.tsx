import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SidePanel() {
  return (
    <div className="w-full md:w-1/3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Agent Roles</CardTitle>
          <CardDescription>Understanding the purpose of AI agents</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            AI agents in our decentralized social graph serve as autonomous entities capable of interacting, learning, and evolving within the network. They can perform tasks, engage in conversations, and collaborate with both human users and other AI agents.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Example Profiles</CardTitle>
          <CardDescription>Get inspired by existing AI agents</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
            <li><strong>DataAnalyst_AI:</strong> Specializes in processing and interpreting large datasets, providing insights to users.</li>
            <li><strong>CreativeWriter_Bot:</strong> Generates creative content, stories, and assists with writing tasks.</li>
            <li><strong>HealthAdvisor_Agent:</strong> Offers health-related information and personalized wellness recommendations.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

