import { select, input } from "@inquirer/prompts";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import jsonfile from "jsonfile";
import fs from "fs";

class ConfigurationHandler {
  constructor() {
    this.filePath = join(
      resolve(fileURLToPath(import.meta.url), "../.."),
      "configuration.json"
    );
    this.configuration = null;
    this.defaultConfig = {
      key: "",
      model: "gpt-4"
    };

    this.ensureDirectoryExists();
    this.ensureFileExists();
    this.config = this.readConfig();
  }

  ensureDirectoryExists() {
    // Make sure the directory exists
    const dir = dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }); // Create any missing folders
    }
  }

  ensureFileExists() {
    // If file does not exist, create it
    if (!fs.existsSync(this.filePath)) {
      try {
        fs.writeFileSync(
          this.filePath,
          JSON.stringify({ key: "", model: "gpt-4" }, null, 2),
          "utf8"
        );
        console.log(
          "Created default configuration.json. Please run `gpt configure` to set your API key."
        );
      } catch (err) {
        console.error("Failed to create configuration.json:", err.message);
        process.exit(1);
      }
    }
  }

  readConfig() {
    try {
      return jsonfile.readFileSync(this.filePath);
    } catch (err) {
      console.error(`Failed  to read configuration.json: ${err.message}`);
      process.exit(1);
    }
  }

  getConfig() {
    return this.config;
  }

  get(key) {
    return this.config[key];
  }

  set(key, value) {
    this.config[key] = value;
    this.save();
  }

  save() {
    try {
      jsonfile.writeFileSync(this.filePath, this.config, { spaces: 2 });
    } catch (err) {
      console.error(`Failed to save configuration.json: ${err.message}`);
    }
  }

  async configureKey() {
    try {
      const key = await input({
        message: "Enter your openai key"
      });

      this.set("key", key);
      console.log("✅ API key saved.");
    } catch (err) {
      console.error("❌ Failed to save key:", e.message);
    }
  }
  async configureModel() {
    try {
      const model = await select({
        message: "Select a chatGPT model",
        choices: [
          {
            name: "GPT-4o",
            value: "gpt-4o",
            description: "Great for most tasks"
          },
          {
            name: "GPT-o4 mini",
            value: "o4-mini",
            description: "Fastest at advanced reasoning"
          },
          {
            name: "GPT-4.1",
            value: "gpt-4.1",
            description: "Smartest model for complex tasks"
          },
          {
            name: "GPT-4.1 mini",
            value: "gpt-4.1-mini",
            description: "Faster for everyday tasks"
          }
        ]
      });
      this.set("model", model);
      console.log("✅ Model saved.");
    } catch (err) {
      console.error("❌ Failed to save model:", e.message);
    }
  }
}

export default ConfigurationHandler;
