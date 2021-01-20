# Load test using k6

## Run
docker-compose up -d influxdb grafana
docker-compose run k6 run scripts/script.js

## Grafana
Dashboard at:
http://localhost:3000/d/k6/k6-load-testing-results