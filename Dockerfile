# ----------- Builder Stage -----------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy only necessary files for dependency installation
COPY package*.json ./
COPY tsconfig.json ./

COPY . .
# Add this line temporarily to debug
RUN ls -R /app

# 🔍 Debug: List contents before build
RUN echo "==== PROJECT STRUCTURE ====" && ls -la /app && echo "==== SRC CONTENT ====" && ls -la /app/src

# Install dependencies
RUN npm ci

# Build TypeScript code
RUN npm run build

# ----------- Production Stage -----------
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Copy built app and dependencies from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Set environment variable for production
ENV NODE_ENV=production

# Expose port (change this if your app uses a different port)
EXPOSE 8080

# Start the app
CMD ["node", "dist/index.js"]
