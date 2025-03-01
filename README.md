# Crypto Price Checker

To run the project, follow these steps:

### Local Development

#### Frontend

```sh
# Step 1: Install the necessary deps.
npm i

# Step 2: Start the dev server
npm run dev
```

#### Backend

```sh
# Step 1: Install the necessary deps.
go mod download

# Step 2: Start the dev server
go run main.go
```

### Docker

```sh
docker build -t crypto-app .
docker run -p 8080:8080 crypto-app
```

## This project is built with

- Go
- Fiber
- React
- TypeScript
- Tailwind CSS

# go-crypto-pricechecker
