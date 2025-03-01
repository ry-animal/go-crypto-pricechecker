# Frontend build stage
FROM node:20-alpine as frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Backend build stage
FROM golang:1.21-alpine as backend-builder
WORKDIR /app
COPY be/ .
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# Final stage
FROM alpine:latest
WORKDIR /app

# Install certificates for HTTPS requests
RUN apk --no-cache add ca-certificates

# Copy built artifacts
COPY --from=frontend-builder /app/dist ./dist
COPY --from=backend-builder /app/main .

# Environment variables
ENV PORT=8080

# Expose port
EXPOSE 8080

# Run the binary
CMD ["./main"]
