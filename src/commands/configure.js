import { select, input } from "@inquirer/prompts"
import { fileURLToPath } from "url"
import { join, resolve } from "path"
import jsonfile from "jsonfile"

const file = join(resolve(fileURLToPath(import.meta.url), "../../.."), "configuration.json")

const configure = async () => {
    try {
        const key = await input({
            message: "Enter your openai key"
        })
        const model = await select({
            message: "Select a chatGPT model",
            choices: [
                {
                    name: "GPT-4o",
                    value: "gpt-4o",
                    description: "Our high-intelligence flagship model for complex, multi-step tasks"
                },
                {
                    name: "GPT-3.5 Turbo",
                    value: "gpt-3.5-turbo",
                    description: "A fast, inexpensive model for simple tasks"
                }
            ]
        })
        const obj = {
            key: key,
            model: model
        }
        jsonfile.writeFile(file, obj)
        console.log("ShellGPT successfully configurated")
    } catch (e) {
        console.log(e)
    }
}

export default configure
