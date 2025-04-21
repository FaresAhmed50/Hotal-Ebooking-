FROM node:16

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose port
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
