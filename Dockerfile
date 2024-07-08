# Use an official Node.js runtime as the base image
FROM node:20.9.0

# Create and set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install server dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

# Expose the port that your server will run on
EXPOSE 3000

# Start your Node.js application when the container starts
CMD ["npm", "start"]