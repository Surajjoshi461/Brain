# -----------------------
# Build Stage
# -----------------------
FROM node:18-alpine AS builder

# Create app directory
WORKDIR /app

# Install dependencies separately to leverage layer caching
COPY package*.json ./
RUN npm ci

# Copy rest of the application code
COPY . .

# Build the project (make sure 'build' script runs 'tsc')
RUN npm run build

# -----------------------
# Production Stage
# -----------------------
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Ensure production environment
ENV NODE_ENV=production

# Expose the port used by your app (Cloud Run uses 8080 by default)
EXPOSE 8080

# Start the app
CMD ["node", "dist/index.js"]
