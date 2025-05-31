import ConfigurationHandler from "./ConfigurationHandler.js";
import OpenAI from "openai";
import ora from "ora";
import readline from "readline";
import chalk from "chalk";

class ShellGPT {
  constructor() {
    this.configurationHandler = new ConfigurationHandler();
    this.config = null;
    this.rl = null;
    this.client = null;
    this.messages = [];
  }

  initialize() {
    this.config = this.configurationHandler.getConfig();
    this.client = new OpenAI({ apiKey: this.config.key });
  }

  async handlePrompt(promptText) {
    this.messages.push({ role: "user", content: promptText });

    if (this.rl) {
      this.rl.output.write("\x1B[2K\r"); // Clear line and move to start
      this.rl.pause();
    }

    const spinner = ora({ text: "Thinking about it...", color: "green" });
    console.log();
    spinner.start();

    try {
      const completion = await this.client.chat.completions.create({
        model: this.config.model,
        messages: this.messages
      });

      const reply = completion.choices[0].message.content;
      this.messages.push({ role: "assistant", content: reply });

      //spinner.succeed("Done.");
      spinner.stop();

      console.log(chalk.cyanBright(`< ${reply}\n`));
    } catch (err) {
      spinner.fail("Invaild or missing OpenAI key");
      console.log("Try running: gpt configure -key\n");
      process.exit(1);
    }

    if (this.rl) this.rl.resume();
  }

  async start(prompt) {
    // Chat mode
    console.log(
      chalk.yellow(
        "\nInteractive mode started. Type your messages. Ctrl+d to disconnect.\n"
      )
    );
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: chalk.green("> ")
    });

    this.rl.prompt();
    this.rl.on("line", async line => {
      const input = line.trim();
      if (!input) {
        this.rl.prompt();
        return;
      }

      await this.handlePrompt(input);
      this.rl.prompt();
    });
  }
}

export default ShellGPT;
