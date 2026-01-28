import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

export async function askGPT() {
    try
    {
        const completion = await openai.chat.completions.create({
            model: "gpt-4.1",
            messages: [
                { role: "user", content: "Talk about yourself" }
            ]
        });
        return completion.choices[0].message.content
    } catch(e) {
        console.log(e.message)
    }
}