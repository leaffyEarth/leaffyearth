# Use the entire repository as build context
FROM node:18-alpine AS builder
WORKDIR /app
# Copy all files from the repo to ensure workspace dependencies are available
COPY . .
# Set working directory to the API folder
RUN ls
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build-utils
RUN pnpm run build-marketplace

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app /app
RUN npm install -g pnpm
EXPOSE 8000
CMD ["pnpm", "run", "prod-marketplace"]
