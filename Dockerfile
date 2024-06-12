# Use the official Node.js image as the base image
FROM node:20

# Set the working directory
WORKDIR /usr/src/git-actions-practice

# Copy the main package.json and package-lock.json files
COPY package*.json ./

# Install root dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Set the working directory to the server directory and install server dependencies
WORKDIR /usr/src/git-actions-practice/server
RUN npm ci

# Build the server
RUN npm run build

# Set the working directory to the client directory and install client dependencies
WORKDIR /usr/src/git-actions-practice/client
RUN npm ci

# Expose the port the client runs on
EXPOSE 5173

# Expose the port the server runs on
EXPOSE 5000

# Start both the server and the client using a script
WORKDIR /usr/src/git-actions-practice

COPY start.sh ./
RUN chmod +x start.sh

CMD ["./start.sh"]
