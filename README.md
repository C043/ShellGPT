# ShellGPT

Small tool that let you use ChatGPT directly from the shell.

<iframe width="100%" src="https://www.youtube.com/embed/_zSZy0t-5gk?si=2DOv4e9QiJaWUINN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

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
