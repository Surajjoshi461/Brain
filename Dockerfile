# Use an official Node.js LTS image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the code
COPY . .

# Build the TypeScript project
RUN npm run build

# -----------------------
# Production Image
# -----------------------
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only the built files and dependencies
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Expose port (default Cloud Run port)
EXPOSE 8080

# Use environment variables (optional .env in Cloud Run)
ENV NODE_ENV=production

# Start the app
CMD ["node", "dist/index.js"]
