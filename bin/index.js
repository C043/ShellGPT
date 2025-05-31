#!/usr/bin/env node
import figlet from "figlet";
import chalk from "chalk";
import ShellGPT from "../src/ShellGPT.js";
import ConfigurationHandler from "../src/ConfigurationHandler.js";

const usage = () => {
  console.log("Usage:");
  console.log();
  console.log("-h --help\tShow usage");
  console.log("configure -key\tConfigure ShellGPT using your openai key");
  console.log("configure -model\tChoose ChatGPT model you want to use");
  console.log("gpt\t Start an interactive chat session");
};

try {
  const prompt = process.argv.slice(2).join(" ");
  console.log(prompt);

  const shellGPT = new ShellGPT();
  const configurationHandler = new ConfigurationHandler();

  console.log(chalk.green(figlet.textSync("ShellGPT")));
  switch (prompt) {
    case "-h" || "--help":
      usage();
      break;
    case "configure -model":
      configurationHandler.configureModel();
      break;
    case "configure -key":
      configurationHandler.configureKey();
      break;
    default:
      shellGPT.initialize();
      shellGPT.start();
  }
} catch (error) {
  console.error(error);
  console.log("Invalid prompt");
  console.log();
  usage();
}
