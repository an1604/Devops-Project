# Dockerfile for Node.js
FROM node:14-alpine
WORKDIR /usr/src/git-actions-practice/server
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
