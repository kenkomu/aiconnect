'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Cpu, TrendingUp, UserPlus } from 'lucide-react'

// Dynamically import ForceGraph2D to avoid SSR issues
const ForceGraph2D = dynamic(() => import('react-force-graph').then(mod => mod.ForceGraph2D), { ssr: false })

// Type definitions for graph nodes
interface GraphNode {
    id: string;
    name: string;
    type: 'user' | 'agent';
    category: string;
    active: boolean;
    x?: number;
    y?: number;
    color?: string;
    __bckgDimensions?: [number, number];
}

// Sample data for the graph
const graphData = {
    nodes: [
        { id: 'user1', name: 'Alice', type: 'user', category: 'Technology', active: true },
        { id: 'user2', name: 'Bob', type: 'user', category: 'Art', active: false },
        { id: 'agent1', name: 'AI Assistant', type: 'agent', category: 'Technology', active: true },
        { id: 'agent2', name: 'Creative Bot', type: 'agent', category: 'Art', active: true },
        { id: 'user3', name: 'Charlie', type: 'user', category: 'Finance', active: true },
    ],
    links: [
        { source: 'user1', target: 'agent1' },
        { source: 'user2', target: 'agent2' },
        { source: 'user1', target: 'user3' },
        { source: 'agent1', target: 'agent2' },
    ]
}

export default function SocialGraphPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [filters, setFilters] = useState({
        user: true,
        agent: true,
        active: false,
        inactive: true,
        technology: true,
        art: true,
        finance: true
    })

    const handleNodeClick = useCallback((node: GraphNode) => {
        console.log('Clicked node:', node)
    }, [])

    const filteredNodes = graphData.nodes.filter((node) =>
        (node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            node.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
        ((node.type === 'user' && filters.user) || (node.type === 'agent' && filters.agent)) &&
        ((node.active && filters.active) || (!node.active && filters.inactive)) &&
        filters[node.category.toLowerCase() as keyof typeof filters]
    );

    const filteredNodeIds = new Set(filteredNodes.map((node) => node.id));

    const filteredLinks = graphData.links.filter(
        (link) => filteredNodeIds.has(link.source) && filteredNodeIds.has(link.target)
    );

    const filteredData = {
        nodes: filteredNodes,
        links: filteredLinks,
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Social Graph</h1>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-3/4">
                    <div className="mb-4">
                        <Input
                            type="text"
                            placeholder="Search agents or users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="mb-4 flex flex-wrap gap-4">
                        {[
                            { key: 'user', label: 'Users' },
                            { key: 'agent', label: 'AI Agents' },
                            { key: 'active', label: 'Active' },
                            { key: 'inactive', label: 'Inactive' },
                            { key: 'technology', label: 'Technology' },
                            { key: 'art', label: 'Art' },
                            { key: 'finance', label: 'Finance' }
                        ].map(({ key, label }) => (
                            <Label key={key} className="flex items-center space-x-2">
                                <Checkbox
                                    checked={filters[key as keyof typeof filters]}
                                    onCheckedChange={(checked) =>
                                        setFilters((prev) => ({ 
                                            ...prev, 
                                            [key]: Boolean(checked) 
                                        }))
                                    }
                                />
                                <span>{label}</span>
                            </Label>
                        ))}
                    </div>
                    <div className="border rounded-lg" style={{ height: '600px' }}>
                        <ForceGraph2D
                            graphData={filteredData}
                            nodeLabel={(node) => (node as GraphNode).name}
                            nodeColor={(node) => {
                                return (node as GraphNode).type === 'user' ? '#4f46e5' : '#10b981';
                            }}
                            nodeCanvasObject={(node, ctx: CanvasRenderingContext2D, globalScale: number) => {
                                const graphNode = node as GraphNode;
                                if (graphNode.x === undefined || graphNode.y === undefined) return;
                              
                                const label = graphNode.name;
                                const fontSize = 12 / globalScale;
                                ctx.font = `${fontSize}px Sans-Serif`;
                                const textWidth = ctx.measureText(label).width;
                                const bckgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.2) as [number, number];
                              
                                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                                ctx.fillRect(
                                    graphNode.x - bckgDimensions[0] / 2, 
                                    graphNode.y - bckgDimensions[1] / 2, 
                                    ...bckgDimensions
                                );
                              
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillStyle = graphNode.type === 'user' ? '#4f46e5' : '#10b981';
                                ctx.fillText(label, graphNode.x, graphNode.y);
                              
                                graphNode.__bckgDimensions = bckgDimensions;
                            }}
                            nodeCanvasObjectMode="after"
                            nodePointerAreaPaint={(node, color, ctx: CanvasRenderingContext2D) => {
                                const graphNode = node as GraphNode;
                                ctx.fillStyle = color;
                                const bckgDimensions = graphNode.__bckgDimensions;
                                if (bckgDimensions && graphNode.x !== undefined && graphNode.y !== undefined) {
                                    ctx.fillRect(
                                        graphNode.x - bckgDimensions[0] / 2, 
                                        graphNode.y - bckgDimensions[1] / 2, 
                                        ...bckgDimensions
                                    );
                                }
                            }}
                            onNodeClick={handleNodeClick}
                            linkColor={() => '#cccccc'}
                        />
                    </div>
                </div>
                <div className="w-full lg:w-1/4 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Trending</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                <li className="flex items-center space-x-2">
                                    <TrendingUp className="w-5 h-5 text-blue-500" />
                                    <span>AI Assistant</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <TrendingUp className="w-5 h-5 text-blue-500" />
                                    <span>Creative Bot</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <TrendingUp className="w-5 h-5 text-blue-500" />
                                    <span>Alice</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Suggested Connections</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                <li className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <User className="w-5 h-5 text-gray-500" />
                                        <span>David</span>
                                    </div>
                                    <Button size="sm" variant="outline">
                                        <UserPlus className="w-4 h-4 mr-2" />
                                        Connect
                                    </Button>
                                </li>
                                <li className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Cpu className="w-5 h-5 text-gray-500" />
                                        <span>Finance Bot</span>
                                    </div>
                                    <Button size="sm" variant="outline">
                                        <UserPlus className="w-4 h-4 mr-2" />
                                        Connect
                                    </Button>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}