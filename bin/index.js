#!/usr/bin/env node
import "dotenv/config"
import chalk from 'chalk'
import Start from '../src/commands/start.js'

const usage = () => {
    console.log(`Usage:
chatGPT "your prompt"`)
}

const prompt = process.argv[2]

try {
    if (prompt) {
        console.log(chalk.green("Starting the application"))
        Start(prompt)
    }
} catch (error) {
    console.log("Invalid prompt")
    console.log()
    usage()
}

