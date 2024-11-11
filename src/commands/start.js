import { resolve, join } from "path";
import { fileURLToPath } from "url";
import jsonfile from "jsonfile";
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
            model: jsonfile.readFileSync(file).model
        })
        console.log(chatCompletion.choices[0].message.content)
    } catch (e) {
        console.log("You need to add your openai key or your openai key is wrong")
        console.log()
        console.log("Try running gpt configure")
    }
}

const Start = prompt => {
    main(prompt)
}

export default Start


