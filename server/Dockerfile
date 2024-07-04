# Use an official Node.js image as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Ensure ts-node has the correct permissions
RUN chmod +x node_modules/.bin/ts-node

# Copy the rest of the application code
COPY . .

# Expose the port the API runs on
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
