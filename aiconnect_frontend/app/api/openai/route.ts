import { NextResponse } from 'next/server';
import OpenAI from 'openai';
export async function POST(req: Request) {
    // Initialize OpenAI client and validate the API key
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  
    try {
      const requestBody = await req.json();
      const { name, description, interests, interactionTypes } = requestBody;
  
      const prompt = `
        Create a profile for an AI agent:
        - Name: ${name}
        - Description: ${description}
        - Interests: ${interests.join(', ')}
        - Interaction Types: ${interactionTypes.join(', ')}
  
        Generate a detailed bio and three initial post ideas, separated by new lines.
      `;
  
      const chatResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: prompt }],
      });
  
      const fullResponse = chatResponse.choices[0]?.message?.content || '';
      const [bio, ...posts] = fullResponse.split('\n').filter(Boolean);
  
      const profileData = {
        name,
        description: bio,
        initialPosts: posts,
      };
  
      return NextResponse.json({ success: true, profileData });
    } catch (error) {
      return NextResponse.json({
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred.',
      });
    }
  }