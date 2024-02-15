# Next Dimension Journal ft. Todo (Nxd-Journal)

### What is it?
Nxd-Journal is a progressive web application that does the following:
1. Captures user journals via voice/text and stores them in the user device.
2. Analyses the journals using Large Language Models(LLMs) to suggest todos and reminders and categorise them.
3. Help user to manage the todos and reminders.

No, this is not yet another todo app. This is more of application where you can log your journals like daily activities and thoughts via voice/text. And LLMs uses this input to suggest todos, reminders etc. This will be stored in the user device. There is no backend server for this application. And you can search the logs using natural language.  

### How it works?
Built using React and OpenAI APIs, this how it works. 
1. User provides natural languge input via voice or text. Example - _"I need to buy some gorceries for home."_
3. The input is send to OpenAI with relevent prompts to extract/update the todos and reminders.
3. The todos and reminder are given for review to the user.
4. The todos, reminder and user inputs are stored in the local storage.

There is a settings page which is displayed at the application start that captures the OpenAI key.

### Why? (Motivation)
LLMs have enhanced the capabilities of computing devices. So how to use that capability to enhance age old Todo and reminder application.

Plus it seemed there is a scope for a todo application without backend with data stored only in the user device with the application source open. 

### Demo link
https://being-self-1acab.web.app

### To run locally
1. Clone the repo 
```bash
git clone git@github.com:arunghosh/being-self.git
```
2. Go to the directory
```bash
cd being-self
``` 
3. Install the dependencies
```bash
npm install 
```
4. Copy the environment file and set the OpenAI API key
```bash
cp config/.env.template .
```
5. Start the local server
```
npm run dev
```
