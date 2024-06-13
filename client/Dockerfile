# Dockerfile for React.js Client

FROM node:14-alpine

# Set working directory
WORKDIR /usr/src/git-actions-practice/client

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose port 5173
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev"]
