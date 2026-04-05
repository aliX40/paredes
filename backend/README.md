# Paredes.tn Backend

Backend infrastructure for paredes.tn, powered by Medusa.js v2.

## Architecture

| Service    | Image              | Port | Purpose                          |
|------------|--------------------|------|----------------------------------|
| postgres   | postgres:16-alpine | 5432 | Database                         |
| redis      | redis:7-alpine     | 6379 | Cache, events, workflow engine   |
| medusa     | node:20-alpine     | 9000 | Backend API + Admin dashboard    |

Nginx (host) handles reverse proxy + SSL via certbot.

## Prerequisites

- Docker and Docker Compose installed on the VPS
- Nginx installed on the host (already running)
- Certbot installed (for SSL)
- DNS records pointing `api.paredes.tn` and `admin.paredes.tn` to the VPS IP

## Quick Start

### 1. Configure environment

```bash
cd /root/paredes/backend
cp .env.example .env
```

Edit `.env` and set strong, unique values:

```bash
# Generate secrets
openssl rand -hex 32   # use for JWT_SECRET
openssl rand -hex 32   # use for COOKIE_SECRET
openssl rand -hex 16   # use for POSTGRES_PASSWORD
```

Make sure `DATABASE_URL` uses the same password as `POSTGRES_PASSWORD`.

### 2. Start all services

```bash
docker compose up -d --build
```

This will:
- Build the Medusa container
- Start PostgreSQL and Redis
- Run database migrations
- Start the Medusa server on port 9000 (bound to localhost only)

### 3. Set up Nginx reverse proxy

```bash
# Copy the nginx configs
sudo cp nginx/api.paredes.tn /etc/nginx/sites-available/
sudo cp nginx/admin.paredes.tn /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/api.paredes.tn /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/admin.paredes.tn /etc/nginx/sites-enabled/

# Test and reload
sudo nginx -t && sudo systemctl reload nginx

# Get SSL certificates
sudo certbot --nginx -d api.paredes.tn
sudo certbot --nginx -d admin.paredes.tn
```

### 4. Create admin user

```bash
docker compose exec medusa npx medusa user -e admin@paredes.tn -p YOUR_PASSWORD
```

### 5. Run the seed script

```bash
docker compose exec medusa npx medusa exec src/scripts/seed.ts
```

This creates:
- Store configuration with TND currency
- Tunisia region
- Stock location
- Fulfillment set for Tunisia
- Sales channel

### 6. Access the admin

- Production: https://admin.paredes.tn/app
- Direct (VPS): http://YOUR_VPS_IP:9000/app

Log in with the admin credentials from step 3.

## Post-Setup Configuration (via Admin Dashboard)

After seeding, complete the following in the admin dashboard:

### Add Flat Rate Shipping
1. Go to **Settings > Regions > Tunisie**
2. Under **Shipping Options**, click **Add Shipping Option**
3. Set name: `Livraison standard`
4. Set type: Flat rate
5. Set price (e.g., 7.000 TND)

### Enable Cash on Delivery Payment
The seed script registers the `system` (manual) payment provider. Verify it is active:
1. Go to **Settings > Regions > Tunisie**
2. Under **Payment Providers**, ensure **System Payment** is enabled
3. This allows cash on delivery (paiement a la livraison)

### Add Products
1. Go to **Products > Add Product**
2. Fill in title, description (in French), images
3. Set prices in TND
4. Assign to the "Boutique en ligne" sales channel

## Useful Commands

```bash
# View logs
docker compose logs -f medusa

# Restart medusa only
docker compose restart medusa

# Stop everything
docker compose down

# Stop and remove volumes (DESTRUCTIVE - deletes all data)
docker compose down -v

# Access medusa container shell
docker compose exec medusa sh

# Check medusa health
curl http://localhost:9000/health
```

## API Endpoints

| Endpoint | URL |
|----------|-----|
| Store API | https://api.paredes.tn/store/* |
| Admin API | https://api.paredes.tn/admin/* |
| Admin UI  | https://admin.paredes.tn/app |
| Health    | https://api.paredes.tn/health |

## Troubleshooting

### Medusa won't start
Check logs: `docker compose logs medusa`
Common issues:
- PostgreSQL not ready yet (should be handled by health check dependency)
- Invalid environment variables in `.env`

### Nginx/SSL errors
- Ensure DNS A records point to the VPS IP
- Ensure ports 80 and 443 are open in the firewall
- Check Nginx config: `sudo nginx -t`
- Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
- Renew certs: `sudo certbot renew`

### Database connection errors
- Verify `POSTGRES_PASSWORD` in `.env` matches the password in `DATABASE_URL`
- Check PostgreSQL is healthy: `docker compose ps`
