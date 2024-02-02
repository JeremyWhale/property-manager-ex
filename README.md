# REMEMBER THIS FUCKING COMMAND

<!-- In the backend -->
docker build -p 8000:8000 api

<!-- In the vite-ui dir -->
serve -s dist/ & docker run -p 8000:8000 api