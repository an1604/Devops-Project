# Dockerfile for React.js Client
FROM node:14-alpine

# Set working directory
WORKDIR /usr/src/git-actions-practice/client

COPY package.json package-lock.json ./
RUN npm ci # Install dependencies
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
