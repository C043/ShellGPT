#!/usr/bin/env node
import figlet from 'figlet'
import chalk from 'chalk'
import Start from '../src/commands/start.js'
import configure from "../src/commands/configure.js"

const usage = () => {
    console.log("Usage:")
    console.log()
    console.log("-h --help\tShow usage")
    console.log("configure\tConfigure ShellGPT using your openai key")
    console.log("gpt [your prompt]")
}

const prompt = process.argv[2]

try {
    console.log(chalk.green(figlet.textSync("ShellGPT")))
    if (prompt !== "configure" && prompt !== "-h" && prompt !== "--help") {
        Start(prompt)
    } else if (prompt === "-h" || prompt === "--help") {
        usage()
    } else if (prompt === "configure") {
        configure()
    } else throw new Error()
} catch (error) {
    console.log("Invalid prompt")
    console.log()
    usage()
}
