# ChatGpt - cli

Small tool that let you use ChatGPT directly from the shell.

## Rquisites
1. Having Nodejs installed in your system
2. Having GIT installed in your system
3. OpenAI api key

## Usage
1. Clone this repository
```bash
git clone https://github.com/c043/chatGPT-cli
```
2. Inside the root directory of the project use npm to install globally
```bash
npm i -g .

# The system might need your root privileges
sudo npm i -g .
```
3. Configure the tool with your api key
```bash
gpt --configure [your key]
```
4. Use chatGPT!
```bash
gpt "What is the sense of life?"
```
