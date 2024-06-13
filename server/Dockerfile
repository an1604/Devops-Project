# Dockerfile for Node.js

FROM node:14-alpine

# Set working directory
WORKDIR /usr/src/git-actions-practice/server

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose port 5000
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
