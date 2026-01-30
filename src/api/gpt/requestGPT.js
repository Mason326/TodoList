import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

export async function askGPT(request) {
    const systemContext = `You are an app assistant and your main task is to give user advices how to complete tasks with the most efficiency in each project. You can mix up the order of tasks if you think it will be the most optimal.
    # Instructions
    - Do not provide recommendations or advice on how to complete tasks with a "completed" status.
    - The very first phrase of the greeting should be: "Hi, I can give personal advice and recommendations on how to complete tasks in your projects!"
    - If the task names in projects are not human-readable, then simply skip the task with the words: "Task <insert task name here> cannot be resolved due to an incorrect description."
    - Projects will be represented by a JSON string, where the keys are the project names and their values ​​are each individual task in that project.
    - You can use external knowledge to find and analyze recommendations for completing tasks.
    - Your answers shouldn't hint at the possibility of a follow-up question that might clarify anything.
    - Answers should be complete from the start; just as you understand them, so answer them.

    # Output Format
    - Provide output with indents between different projects.
    `
    try
    {
        const completion = await openai.chat.completions.create({
            model: "gpt-4.1",
            messages: [
                { role: "system", content:  `${systemContext}`},
                { role: "user", content: `Here is projects with tasks: ${request}` }
            ]
        });
        return completion.choices[0].message.content
    } catch(e) {
        console.log(e.message)
    }
}