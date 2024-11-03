import chalk from "chalk";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

const main = async (prompt) => {
    const chatCompletion = await client.chat.completions.create({
        messages: [{
            role: "user",
            content: prompt
        }],
        model: "gpt-3.5-turbo"
    })
    console.log(chatCompletion.choices[0].message.content)
}

const Start = prompt => {
    console.log(chalk.green("Working on it"))
    main(prompt)
}

export default Start


