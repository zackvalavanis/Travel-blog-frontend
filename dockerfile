# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if any)
COPY package*.json ./

# Install dependencies (including dev dependencies)
RUN npm install

# Copy rest of the source code
COPY . .

# Expose port (Vite default dev server port)
EXPOSE 5173

# Start dev server
CMD ["npm", "run", "dev"]
