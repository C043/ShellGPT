#!/usr/bin/env node
import figlet from 'figlet'
import { resolve, join } from 'path'
import jsonfile from 'jsonfile'
import chalk from 'chalk'
import Start from '../src/commands/start.js'
import configure from "../src/commands/configure.js"
import { fileURLToPath } from 'url'

const usage = () => {
    console.log("Usage:")
    console.log()
    console.log("-h --help\tShow usage")
    console.log("--configure\tAdd your openai api key")
    console.log("gpt [your prompt]")
}

const file = join(resolve(fileURLToPath(import.meta.url), "../.."), "configuration.json")
const key = jsonfile.readFileSync(file).key

const prompt = process.argv[2]

try {
    console.log(chalk.green(figlet.textSync("ShellGPT")))
    if (prompt !== "--configure" && prompt !== "-h" && prompt !== "--help") {
        Start(prompt)
    } else if (prompt === "--configure") {
        configure(process.argv[3])
    } else if (prompt === "-h" || prompt === "--help") {
        usage()
    } else if (prompt === "--configure") {
        configure(process.argv[3])
    } else throw new Error()
} catch (error) {
    console.log("Invalid prompt")
    console.log()
    usage()
}
