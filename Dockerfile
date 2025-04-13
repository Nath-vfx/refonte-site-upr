# Build stage
FROM ubuntu:24.04 AS builder

RUN apt-get update && apt-get install -y \
    curl bash git ca-certificates unzip && \
    rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://bun.sh/install | bash

ENV PATH="/root/.bun/bin:$PATH"

WORKDIR /app
COPY . /app
RUN bun install && bun run build

# Runtime stage
FROM nginx:1.25-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
