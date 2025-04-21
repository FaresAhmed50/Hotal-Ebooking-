#nodeFROM node:16
#
## Set working directory
#WORKDIR /app
#
## Ensure PATH includes npm
#ENV PATH /usr/local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
#
## Install dependencies
#COPY package*.json ./
#RUN npm install
#
## Copy the rest of the app files
#COPY . .
#
## Expose port
#EXPOSE 5000
#
## Start the app
#CMD ["npm", "start"]


FROM node:16

# Install MySQL (if you want to run it in the same container)
RUN apt-get update && apt-get install -y mysql-server

# Install pm2 to manage both processes
RUN npm install -g pm2

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 5000

# Start MySQL and Node.js using pm2
CMD pm2 start mysql --name mysql && pm2 start npm --name app -- run start
