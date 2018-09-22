FROM node:8

# Create app directory
WORKDIR /src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./

# Install all the dependencies in package.json
RUN npm install

# Install nodemon to enable live reloading of source code
RUN npm install -g nodemon

# Bundle app source
COPY . .

# Expose internal application port
EXPOSE 3001

# Run the application
CMD [ "nodemon", "server.js" ]
