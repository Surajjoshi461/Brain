# -----------------------
# Build Stage
# -----------------------
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# ✅ Copy tsconfig.json before npm install (important for tsc to work)
COPY tsconfig.json ./

# ✅ Copy only package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm ci

# ✅ Copy the rest of your source code (after tsconfig and deps)
COPY . .

# ✅ Build TypeScript (make sure package.json has "build": "tsc")
RUN npm run build

# -----------------------
# Production Stage
# -----------------------
FROM node:18-alpine

WORKDIR /app

# ✅ Copy built code, deps, and package.json
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production

EXPOSE 8080

# ✅ Run the compiled code
CMD ["node", "dist/index.js"]
