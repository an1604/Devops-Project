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

#TODO: CHECK THIS ONE OUT!
#WORKDIR /usr/src/git-actions-practice/server
#RUN npm run build

# Expose the port the app runs on
EXPOSE 5000

# Start the application from the server directory
WORKDIR /usr/src/git-actions-practice/server
CMD ["npm", "start"]
