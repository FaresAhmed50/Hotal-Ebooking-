FROM node:16

# Set working directory
WORKDIR /app

# Ensure PATH includes npm
ENV PATH /usr/local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose port
EXPOSE 5000

# Start the app
CMD ["npm", "start"]