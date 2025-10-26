import { GoogleGenAI, Chat, Type } from "@google/genai";
import type { Listing, CommunityPost } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
let chat: Chat | null = null;

export const getChatInstance = (): Chat => {
  if (!chat) {
    chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: 'You are BookLoop AI, a helpful assistant for students using the BookLoop platform. BookLoop is an online marketplace for students to buy and sell textbooks, notes, and equipment. Be friendly, helpful, and concise in your answers. You can help with study tips, explaining concepts, summarizing texts, and answering questions about course materials.',
      },
    });
  }
  return chat;
};

export interface SearchResults {
  listings: Listing[];
  posts: CommunityPost[];
  academicAnswer: string | null;
}

export const performSearch = async (query: string, allListings: Listing[], allPosts: CommunityPost[]): Promise<SearchResults> => {
    const systemInstruction = `You are a helpful search assistant for BookLoop, a campus marketplace app.
    You will be given a user's search query and JSON data for all available listings and community posts.
    Your task is to analyze the query and return relevant results from the provided data.
    The user's intent could be:
    1. Finding an item to buy (e.g., "chemistry textbook").
    2. Looking for community discussion (e.g., "study tips").
    3. Asking an academic question (e.g., "what is mitosis?").

    You MUST return a single, valid JSON object that adheres to the provided schema.
    - For item searches, find matching listings by checking the title, description, and category. Return the full listing objects.
    - For discussion searches, find matching community posts by checking the content. Return the full post objects.
    - For academic questions, provide a concise answer in the 'academicAnswer' field and leave the listings/posts arrays empty.
    - If nothing matches, return empty arrays and a null academicAnswer.

    Here is the available data:
    Listings: ${JSON.stringify(allListings)}
    Posts: ${JSON.stringify(allPosts)}
    `;

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
          listings: {
            type: Type.ARRAY,
            description: "An array of marketplace listing objects that match the user's query.",
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                price: { type: Type.NUMBER },
                category: { type: Type.STRING },
                imageUrl: { type: Type.STRING },
                seller: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    name: { type: Type.STRING },
                    avatarUrl: { type: Type.STRING },
                    campus: { type: Type.STRING },
                    major: { type: Type.STRING },
                    listingsCount: { type: Type.NUMBER },
                  },
                },
              },
            },
          },
          posts: {
            type: Type.ARRAY,
            description: "An array of community post objects that match the user's query.",
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                author: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    name: { type: Type.STRING },
                    avatarUrl: { type: Type.STRING },
                    campus: { type: Type.STRING },
                    major: { type: Type.STRING },
                    listingsCount: { type: Type.NUMBER },
                  },
                },
                content: { type: Type.STRING },
                timestamp: { type: Type.STRING },
                likes: { type: Type.NUMBER },
                comments: { type: Type.NUMBER },
              },
            },
          },
          academicAnswer: {
            type: Type.STRING,
            description: "A direct, concise answer if the user's query is an academic question. Null otherwise.",
          },
        },
      };

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `User query: "${query}"`,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        const result = JSON.parse(response.text);

        // Validate results from Gemini to prevent rendering errors from incomplete data.
        // The model can sometimes return objects that don't fully adhere to the schema.
        const validListings = (result.listings || []).filter(
            (l: Partial<Listing>): l is Listing =>
                typeof l.id === 'string' &&
                typeof l.title === 'string' &&
                typeof l.price === 'number' && // This check fixes the `.toFixed` error
                typeof l.imageUrl === 'string'
        );

        const validPosts = (result.posts || []).filter(
            (p: Partial<CommunityPost>): p is CommunityPost =>
                typeof p.id === 'string' &&
                typeof p.content === 'string' &&
                p.author !== undefined &&
                typeof p.author.name === 'string' // Prevents crash if author is missing
        );

        return {
            listings: validListings,
            posts: validPosts,
            academicAnswer: result.academicAnswer || null
        };
    } catch (error) {
        console.error("Error performing Gemini search:", error);
        return { listings: [], posts: [], academicAnswer: "Sorry, an error occurred during the search." };
    }
};