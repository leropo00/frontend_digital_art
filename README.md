# Frontend for Digital Art AI Assistant


The frontend counterpart to the project: https://github.com/leropo00/backend_digital_art. 
This project is currently still being developed together with the backend for the purpose of testing project functionalities.


## Project tech stack and coding style

Project uses NodeJs, Vue 3, Vite and Tailwind. Project is configured to use Typescript, but Typescript functionalities are currently not used much and will be gradually added. Project is intended for testing the backend project functionalities. Design is intentiontaly simple and code is not optimized.


## Project setup

The project is containerized with Docker. 

To set up your environment variables, you need to copy the `.env.sample` file and rename it to `.env`. You can do this manually or use the following terminal command:



```bash

cp .env.sample .env # Linux, macOS, Git Bash, WSL

copy .env.sample .env # Windows Command Prompt

```

Run the project dependencies by moving to the project root directory and running the command:



```

docker-compose up -d

```



### Environment variables


By default project is accesed at url: http://localhost:3000/.

This is defined in .env file. If you plan to change the url of the application, make sure to also change in the backend's project .env file, variable FRONTEND_URL, because of CORS.







