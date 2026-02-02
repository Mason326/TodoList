# TodoList
This project is a todolist with supabase authentication and a little helper as a gpt assistant.

## How to run the project ??

- Firstly, you need to clone this project:
    ```git
        git clone https://github.com/Mason326/TodoList.git
    ```
- Then you need to go to the project folder;
- Rename the .env.example file to .env;
- Replace the variable values ​​in the .env file:
    ```dotenv
        VITE_OPENAI_API_KEY=
        VITE_SUPABASE_URL=
        VITE_SERVICE_ROLE_KEY=
        VITE_SUPABASE_KEY=
    ```
- To avoid using placeholders in variables, you can use the variable value generation script in utils/gen-keys.sh;
- After that you need to run docker (of course you need docker itself for this):
    ```docker-compose
        docker compose up -d
    ```
- Then open your browser at https://localhost:8888