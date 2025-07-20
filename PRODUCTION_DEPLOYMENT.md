# Production Deployment Guide

This guide provides comprehensive instructions for deploying PitchCraft to production environments.

## 🚀 Quick Start

### Option 1: Automated Deployment

```bash
# Run the automated deployment script
./scripts/deploy-production.sh
```

### Option 2: Docker Compose (Recommended for small to medium deployments)

```bash
# Set your OpenAI API key
export OPENAI_API_KEY="your-openai-api-key"

# Start all services
docker-compose up -d

# Check status
docker-compose ps
```

### Option 3: Manual Deployment

Follow the detailed instructions below for manual deployment.

## 📋 Prerequisites

- **Server Requirements:**

  - Ubuntu 20.04+ or CentOS 8+
  - 2+ CPU cores
  - 4GB+ RAM
  - 20GB+ storage
  - Node.js 18+
  - Docker & Docker Compose (optional)

- **Domain & SSL:**

  - Registered domain name
  - SSL certificate (Let's Encrypt recommended)

- **External Services:**
  - MongoDB Atlas account (recommended) or MongoDB server
  - OpenAI API key

## 🏗️ Deployment Options

### 1. Docker Compose Deployment (Recommended)

**Advantages:**

- Easy setup and management
- Consistent environment
- Built-in orchestration
- Easy scaling

**Setup:**

```bash
# Clone the repository
git clone <repository-url>
cd PitchCraft-AI-Powered-Pitch-Deck-Generator

# Set environment variables
export OPENAI_API_KEY="your-openai-api-key"
export JWT_SECRET="your-super-secure-jwt-secret"

# Start services
docker-compose up -d

# Check logs
docker-compose logs -f
```

**Access:**

- Frontend: http://your-domain.com
- Backend API: http://your-domain.com:3000

### 2. Manual Server Deployment

#### Step 1: Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB (if not using Atlas)
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

# Install Nginx
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx

# Install PM2
sudo npm install -g pm2
```

#### Step 2: Application Deployment

```bash
# Create application directory
sudo mkdir -p /var/www/pitchcraft
sudo chown $USER:$USER /var/www/pitchcraft

# Clone repository
cd /var/www/pitchcraft
git clone <repository-url> .

# Setup backend
cd backend
npm ci --only=production

# Create production environment file
cp .env.example .env.production
nano .env.production
```

**Backend Environment Variables:**

```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://localhost:27017/pitchcraft
JWT_SECRET=your-super-secure-jwt-secret-key
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d
OPENAI_API_KEY=your-openai-api-key
ALLOWED_ORIGINS=https://your-domain.com
BCRYPT_SALT_ROUNDS=12
MAX_LOGIN_ATTEMPTS=5
LOCKOUT_DURATION=900000
LOG_LEVEL=info
```

```bash
# Build backend
npm run build

# Setup frontend
cd ../frontend
npm ci

# Create production environment file
cp .env.example .env.production
nano .env.production
```

**Frontend Environment Variables:**

```env
VITE_NEST_API_URL=https://your-domain.com/api
```

```bash
# Build frontend
npm run build

# Start backend with PM2
cd ../backend
pm2 start dist/main.js --name "pitchcraft-backend"
pm2 save
pm2 startup
```

#### Step 3: Nginx Configuration

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/pitchcraft
```

**Nginx Configuration:**

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Frontend
    location / {
        root /var/www/pitchcraft/frontend/dist;
        try_files $uri $uri/ /index.html;

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Health check
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/pitchcraft /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### Step 4: SSL Certificate

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

### 3. Cloud Platform Deployment

#### Vercel (Frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd frontend
vercel --prod
```

#### Railway (Backend)

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### Heroku

```bash
# Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Deploy backend
cd backend
heroku create your-app-name
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-jwt-secret
heroku config:set OPENAI_API_KEY=your-openai-key
git push heroku main
```

## 🔒 Security Configuration

### 1. Environment Variables

- Use strong, unique JWT secrets
- Restrict CORS origins to production domains
- Use environment-specific API keys
- Enable HTTPS only in production

### 2. Database Security

```bash
# MongoDB security configuration
sudo nano /etc/mongod.conf
```

```yaml
security:
  authorization: enabled
net:
  bindIp: 127.0.0.1
```

### 3. Firewall Configuration

```bash
# Configure UFW firewall
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### 4. Rate Limiting

Add to Nginx configuration:

```nginx
# Rate limiting
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=login:10m rate=1r/s;

location /api/auth/login {
    limit_req zone=login burst=5 nodelay;
    proxy_pass http://localhost:3000/auth/login;
}

location /api/ {
    limit_req zone=api burst=20 nodelay;
    proxy_pass http://localhost:3000/;
}
```

## 📊 Monitoring & Logging

### 1. Application Monitoring

```bash
# PM2 monitoring
pm2 monit
pm2 logs pitchcraft-backend

# Setup PM2 monitoring dashboard
pm2 install pm2-server-monit
```

### 2. Log Management

```bash
# Configure log rotation
sudo nano /etc/logrotate.d/pitchcraft
```

```
/var/www/pitchcraft/backend/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
}
```

### 3. Health Checks

```bash
# Create health check script
nano /var/www/pitchcraft/health-check.sh
```

```bash
#!/bin/bash
curl -f http://localhost:3000/health || exit 1
```

```bash
# Make executable and add to crontab
chmod +x /var/www/pitchcraft/health-check.sh
crontab -e
# Add: */5 * * * * /var/www/pitchcraft/health-check.sh
```

## 🔄 Backup Strategy

### 1. Database Backup

```bash
# Create backup script
nano /opt/backup-mongodb.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/opt/backups"
MONGO_URI="mongodb://localhost:27017/pitchcraft"

mongodump --uri="$MONGO_URI" --out="$BACKUP_DIR/mongodb_$DATE"

# Keep only last 7 days
find $BACKUP_DIR -name "mongodb_*" -type d -mtime +7 -exec rm -rf {} \;
```

```bash
# Setup automated backups
chmod +x /opt/backup-mongodb.sh
crontab -e
# Add: 0 2 * * * /opt/backup-mongodb.sh
```

### 2. Application Backup

```bash
# Backup application files
tar -czf /opt/backups/app_$(date +%Y%m%d).tar.gz /var/www/pitchcraft
```

## 🚀 Scaling Considerations

### 1. Horizontal Scaling

```bash
# Load balancer configuration (Nginx)
upstream backend {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
}
```

### 2. Database Scaling

- Use MongoDB Atlas for managed scaling
- Implement read replicas for read-heavy workloads
- Use connection pooling

### 3. Caching

```bash
# Install Redis
sudo apt install redis-server

# Configure Redis for session storage
sudo nano /etc/redis/redis.conf
```

## 🔧 Troubleshooting

### Common Issues

1. **Port already in use:**

   ```bash
   sudo lsof -i :3000
   sudo kill -9 <PID>
   ```

2. **Permission denied:**

   ```bash
   sudo chown -R $USER:$USER /var/www/pitchcraft
   ```

3. **MongoDB connection failed:**

   ```bash
   sudo systemctl status mongod
   sudo systemctl restart mongod
   ```

4. **SSL certificate issues:**
   ```bash
   sudo certbot renew
   sudo systemctl reload nginx
   ```

### Log Locations

- **Application logs:** `/var/www/pitchcraft/backend/logs/`
- **Nginx logs:** `/var/log/nginx/`
- **PM2 logs:** `~/.pm2/logs/`
- **MongoDB logs:** `/var/log/mongodb/`

## 📞 Support

For deployment issues:

1. Check the logs: `pm2 logs pitchcraft-backend`
2. Verify environment variables: `pm2 env pitchcraft-backend`
3. Test database connection: `mongo --eval "db.runCommand('ping')"`
4. Check Nginx status: `sudo systemctl status nginx`

## 🔄 Updates & Maintenance

### Application Updates

```bash
# Pull latest changes
cd /var/www/pitchcraft
git pull origin main

# Update backend
cd backend
npm ci --only=production
npm run build
pm2 restart pitchcraft-backend

# Update frontend
cd ../frontend
npm ci
npm run build
sudo systemctl reload nginx
```

### System Updates

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Update Node.js (if needed)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```
