import { resolve, join } from "path";
import { fileURLToPath } from "url";
import jsonfile from "jsonfile";
import OpenAI from "openai";
import ora from "ora";

const file = join(resolve(fileURLToPath(import.meta.url), "../../.."), "configuration.json")


const main = async (prompt) => {
    const spinner = ora({
        text: "Thinking about it...",
        color: "green",
    }).start()
    try {
        const client = new OpenAI({
            apiKey: jsonfile.readFileSync(file).key
        })
        const chatCompletion = await client.chat.completions.create({
            messages: [{
                role: "user",
                content: prompt
            }],
            model: jsonfile.readFileSync(file).model
        })
        spinner.succeed(chatCompletion.choices[0].message.content)
    } catch (e) {
        spinner.fail("You need to add your openai key or your openai key is wrong")
        console.log()
        console.log("Try running gpt configure")
    }
}

const Start = prompt => {
    main(prompt)
}

export default Start


