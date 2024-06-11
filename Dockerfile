# Use the official Node.js image as the base image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy the main package.json and package-lock.json files
COPY package*.json ./

# Copy the rest of the application code
COPY . .

# Install root dependencies
RUN npm ci

# Set the working directory to the server directory and install server dependencies
WORKDIR /usr/src/app/DevOpsProject-app/server
RUN npm ci

# Build the application from the root directory
WORKDIR /usr/src/app/DevOpsProject-app
RUN npm run build

# Expose the port the app runs on
EXPOSE 5000

# Start the application from the server directory
WORKDIR /usr/src/app/DevOpsProject-app/server
CMD ["npm", "start"]
# THE END
