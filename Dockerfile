FROM node:15-alpine

# Change working directory, any command from now will run in this directory
WORKDIR /app

# Copy package.json
COPY package.json ./

# Install packages
RUN npm install --force --production

# Copy the other files and folders
COPY . .

# Expose port
EXPOSE 3000

# Run the npm script which will:
# - Clone tsconfig which does not include cypress types
#   (as these are not available in production)
# - Build the production files
# - Start the server
CMD mv ./tsconfig.prod.json ./tsconfig.json && npm run export && npm run serve:static
