# ShellGPT

Small tool that let you use ChatGPT directly from the shell.

[![Demo ShellGPT](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2o1cmlxeG5uNHFyOWt6eW1hcGQxcjMzNjlpNzJ6NjRtanV1dXc1ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/v8vMF4avxLFX2ZGWoq/giphy.gif)](https://www.youtube.com/watch?v=_zSZy0t-5gk)

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
gpt configure
```
4. Use chatGPT!
```bash
gpt "What is the meaning of life?"
```
