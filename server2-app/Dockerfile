# Use an official Node.js runtime as a parent image.
FROM node:18-slim

# Set the working directory inside the container.
WORKDIR /app

# Copy package files and install only production dependencies.
COPY package*.json ./
RUN npm ci --only=production

# Copy the rest of the application code.
COPY . .

# Create and switch to a non-root user for security.
RUN useradd --create-home --shell /bin/bash appuser
USER appuser

# Expose the port your app listens on (3000 in this example).
EXPOSE 3001

# Command to run the application.
CMD ["node", "index.js"]
