import { resolve, join } from "path";
import { fileURLToPath } from "url";
import jsonfile from "jsonfile";
import chalk from "chalk";
import OpenAI from "openai";

const file = join(resolve(fileURLToPath(import.meta.url), "../../.."), "configuration.json")


const main = async (prompt) => {
    try {
        const client = new OpenAI({
            apiKey: jsonfile.readFileSync(file).key
        })
        const chatCompletion = await client.chat.completions.create({
            messages: [{
                role: "user",
                content: prompt
            }],
            model: "gpt-3.5-turbo"
        })
        console.log(chatCompletion.choices[0].message.content)
    } catch (e) {
        console.log("You need to add your openai key")
        console.log()
        console.log("Try running gpt --configure [your key]")
    }
}

const Start = prompt => {
    console.log(chalk.green("Working on it"))
    main(prompt)
}

export default Start


