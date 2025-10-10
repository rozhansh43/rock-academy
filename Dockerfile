# Multi-stage Dockerfile for Next.js 15 (App Router) with pnpm and standalone output

# 1) Base image with Node and pnpm
FROM node:20-alpine AS base
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable && corepack prepare pnpm@9 --activate

# 2) Install dependencies only (cached)
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
# If you have .npmrc or .yarnrc, copy them too for private registries
RUN pnpm install --frozen-lockfile

# 3) Build the app
FROM deps AS build
WORKDIR /app
COPY . .
# Ensure Next.js can use standalone output
ENV NODE_ENV=production
ARG NEXT_PUBLIC_BACKEND_BASE_URL
ENV NEXT_PUBLIC_BACKEND_BASE_URL=$NEXT_PUBLIC_BACKEND_BASE_URL
RUN pnpm build

# 4) Production image with minimal runtime
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_PUBLIC_BACKEND_BASE_URL=""

# Create non-root user
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

# Copy standalone server, static files, and required files from the build
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

# If you use next/image with sharp, ensure libc6-compat is present
RUN apk add --no-cache libc6-compat

USER nextjs
EXPOSE 3000

# Start Next.js standalone server
CMD ["node", "server.js"]


