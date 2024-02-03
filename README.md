# Commands to deploy on AWS EC2

<!-- In the backend -->

docker build -t api

<!-- In the vite-ui dir -->

serve -s dist/ & docker run -p 8000:8000 api
