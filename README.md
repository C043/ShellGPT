# ShellGPT

Small tool that let you use ChatGPT directly from the shell.

[![ShellGPT Demo](https://img.youtube.com/vi/_zSZy0t-5gk/0.jpg)](https://www.youtube.com/watch?v=_zSZy0t-5gk)

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
npm i
npm i -g .

# The system might need your root privileges
sudo npm i -g .
```
3. Configure the tool with your api key
```bash
gpt configure -key
gpt configure -model
```
4. Use chatGPT!
```bash
gpt
```
