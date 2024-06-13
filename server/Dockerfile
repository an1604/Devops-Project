# Dockerfile for Node.js Server

FROM node:14-alpine

# Create a non-root user and set permissions
RUN addgroup -S mygroup && adduser -S myuser -G mygroup

# Set working directory
WORKDIR /usr/src/git-actions-practice/server

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies as non-root user
RUN chown -R myuser:mygroup /usr/src/git-actions-practice/server
USER myuser

# Install dependencies
RUN --mount=type=ssh,uid=$(id -u myuser) npm ci

# Copy the rest of the application code
COPY . .

# Expose port 5000
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
