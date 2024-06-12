FROM node:20

# Install Chrome dependencies
RUN apt-get update && apt-get install -y wget gnupg2
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
RUN apt-get update && apt-get install -y google-chrome-stable

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Install server dependencies
WORKDIR /usr/src/app/server
RUN npm ci
RUN npm run build

# Install client dependencies
WORKDIR /usr/src/app/client
RUN npm ci
RUN npm run build

# Expose necessary ports
EXPOSE 5000
EXPOSE 5173

# Set the working directory back to the root
WORKDIR /usr/src/app

# Copy the start script
COPY start.sh ./
RUN chmod +x start.sh

# Command to run the start script
CMD ["./start.sh"]
