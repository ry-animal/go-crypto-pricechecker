package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

type CryptoCurrency struct {
	ID                 string  `json:"id"`
	Symbol             string  `json:"symbol"`
	Name               string  `json:"name"`
	Image              string  `json:"image"`
	CurrentPrice       float64 `json:"current_price"`
	MarketCap          float64 `json:"market_cap"`
	PriceChangePercent float64 `json:"price_change_percentage_24h"`
}

func main() {
	app := fiber.New(fiber.Config{
		DisableStartupMessage: true,
	})

	app.Use(recover.New())
	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000",
		AllowHeaders: "Origin, Content-Type, Accept",
		AllowMethods: "GET",
	}))

	api := app.Group("/api/v1")
	api.Get("/health", func(c *fiber.Ctx) error {
		return c.SendString("OK")
	})
	api.Get("/prices", getPrices)

	app.Static("/", "./dist")

	app.Get("/*", func(c *fiber.Ctx) error {
		return c.SendFile("./dist/index.html")
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	log.Fatal(app.Listen(":" + port))
}

func getPrices(c *fiber.Ctx) error {
	currencies, err := fetchCryptoData()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch cryptocurrency data",
		})
	}

	return c.JSON(currencies)
}

func fetchCryptoData() ([]CryptoCurrency, error) {
	client := &http.Client{
		Timeout: 10 * time.Second,
	}

	resp, err := client.Get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1")
	if err != nil {
		log.Printf("Error fetching data from CoinGecko: %v", err)
		return nil, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Printf("Error reading response body: %v", err)
		return nil, err
	}

	var allCurrencies []CryptoCurrency
	if err := json.Unmarshal(body, &allCurrencies); err != nil {
		log.Printf("Error unmarshaling JSON: %v", err)
		return nil, err
	}

	// Take only the first 12 currencies
	if len(allCurrencies) > 12 {
		return allCurrencies[:12], nil
	}
	return allCurrencies, nil
}
