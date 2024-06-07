import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// export const GET = async (request) => {
//     try {
//         await connectToDB()
//         const prompts = await Prompt.find({}).populate('creator')
//         return new Response(JSON.stringify(prompts), { status: 200 })
//     } catch (error) {
//         console.log(error);
//         return new Response("Failed to fetch all prompts", { status: 500 })
//     }
// } 

export const GET = async (request) => {
    console.log(request);
    try {
        await connectToDB()
        const prompt = await Prompt.find({}).populate('creator')
        if (!prompt) return new Response("Prompt not found", { status: 404 })

        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch prompt", { status: 500 })
    }
}