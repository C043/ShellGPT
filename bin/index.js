#!/usr/bin/env node
import figlet from 'figlet'
import { resolve, join } from 'path'
import jsonfile from 'jsonfile'
import chalk from 'chalk'
import Start from '../src/commands/start.js'
import configure from "../src/commands/configure.js"
import { fileURLToPath } from 'url'

const usage = () => {
    console.log(`Usage:
chatGPT "your prompt"`)
}

const file = join(resolve(fileURLToPath(import.meta.url), "../.."), "configuration.json")
const key = jsonfile.readFileSync(file).key

const prompt = process.argv[2]

try {
    if (key) {
        if (prompt !== "--configure") {
            console.log(chalk.green(figlet.textSync("ChatGPT")))
            Start(prompt)
        } else if (prompt === "--configure") {
            configure(process.argv[3])
        }
    } else if (prompt === "--configure") {
        configure(process.argv[3])
    } else {
        console.log("You need to add your openai key")
        console.log()
        console.log("Try running gpt --configure [your key]")
    }
} catch (error) {
    console.log("Invalid prompt")
    console.log()
    usage()
}
