# Load test using k6

## Run
k6 run -e MY_HOSTNAME=ia.dev.ia.afaforsakring.se scripts/script.js

## Run with docker compose
docker-compose up -d influxdb grafana  
docker-compose run k6 run scripts/script.js

### Grafana
Dashboard at: http://localhost:3000/d/k6/k6-load-testing-results
