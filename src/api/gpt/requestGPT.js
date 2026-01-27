import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY
});

export async function askGPT() {
    const completion = await openai.chat.completions.create({
        model: "gpt-4.1",
       messages: [
            { role: "user", content: "How are you today?" }
        ]
    });
    console.log(completion.choices[0].message.content)
}