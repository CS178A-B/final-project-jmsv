# Pull official Node.js image from Docker Hub
FROM node:10
# Create app directory
WORKDIR /usr/app
# Install dependencies
COPY package*.json ./
# COPY prisma ./prisma/
RUN npm install
# Bundle app source
COPY . .
# Expose container port 5000
EXPOSE 5000
# Run "start" script in package.json
CMD ["npm", "start"]