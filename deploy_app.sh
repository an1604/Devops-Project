#!/bin/bash

# Ensure the script exits if any command fails
set -e

# DockerHub user information
DOCKER_USERNAME="${DOCKER_USERNAME}"
DOCKER_PASSWORD="${DOCKER_PASSWORD}"

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

# Server variables to run it
MONGO_URI="${MONGO_URI}"
JWT_SECRET="${JWT_SECRET}"
JWT_EXPIRATION="${JWT_EXPIRATION}"
JWT_REFRESH_SECRET="${JWT_REFRESH_SECRET}"
GOOGLE_CLIENT_ID="${GOOGLE_CLIENT_ID}"
PORT="${PORT}"
NODE_ENV="${NODE_ENV}"
VITE_GOOGLE_CLIENT_ID="${VITE_GOOGLE_CLIENT_ID}"
VITE_GOOGLE_CLIENT_SECRET="${VITE_GOOGLE_CLIENT_SECRET}"
VITE_WEATHER_API_KEY="${VITE_WEATHER_API_KEY}"

# Stop and remove existing containers
docker stop mongodb api client reverseproxy || true
docker rm mongodb api client reverseproxy || true

# Remove old images
docker rmi avivnat13/devops_project-client:latest || true
docker rmi avivnat13/devops_project-server:latest || true
docker rmi mongo:6-jammy || true
docker rmi avivnat13/reverseproxy:latest || true

# Pulling the docker images for the application
docker pull avivnat13/devops_project-client:latest
docker pull avivnat13/devops_project-server:latest
docker pull mongo:6-jammy
docker pull avivnat13/reverseproxy:latest

# Creating a Docker network to make a full communication between the different containers
docker network create node-network || true

docker run -d --name mongodb --network=node-network -p 27017:27017 -v dbdata6:/data/db mongo:6-jammy

docker run -d --name api --network=node-network -p 5000:5000 \
  -e MONGO_URI="${MONGO_URI}" \
  -e JWT_SECRET="${JWT_SECRET}" \
  -e JWT_REFRESH_SECRET="${JWT_REFRESH_SECRET}" \
  -e JWT_EXPIRATION="${JWT_EXPIRATION}" \
  -e GOOGLE_CLIENT_ID="${GOOGLE_CLIENT_ID}" \
  avivnat13/devops_project-server:latest

docker run -d --name client --network=node-network -p 5173:5173 avivnat13/devops_project-client:latest

docker run -d --name reverseproxy --network=node-network -p 80:80 avivnat13/reverseproxy:latest
