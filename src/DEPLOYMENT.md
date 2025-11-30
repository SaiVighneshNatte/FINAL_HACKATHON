# Deployment Guide

This guide covers multiple ways to deploy your Constitution of India app.

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Production Build

The production build optimizes your app for best performance:

```bash
npm run build
```

This creates a `dist` folder with:
- Minified JavaScript bundles
- Optimized CSS
- Asset optimization
- Source maps for debugging

## ☁️ Cloud Deployment Options

### 1. Vercel (Recommended)

**Why Vercel?**
- Zero-config deployment
- Automatic HTTPS
- Global CDN
- Perfect for React apps

**Steps:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

**Or use Vercel Dashboard:**
1. Go to [vercel.com](https://vercel.com)
2. Import your Git repository
3. Vercel auto-detects Vite configuration
4. Click "Deploy"

### 2. Netlify

**Steps:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the app
npm run build

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

**Or use Netlify Dashboard:**
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `dist` folder
3. Or connect your Git repository

**Configuration (netlify.toml):**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. GitHub Pages

**Steps:**

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/constitution-app"
}
```

3. Update vite.config.ts:
```typescript
export default defineConfig({
  base: '/constitution-app/', // Your repo name
  // ... rest of config
});
```

4. Deploy:
```bash
npm run deploy
```

### 4. AWS S3 + CloudFront

**Steps:**

1. Build the app:
```bash
npm run build
```

2. Create S3 bucket:
```bash
aws s3 mb s3://constitution-app
```

3. Upload build:
```bash
aws s3 sync dist/ s3://constitution-app
```

4. Enable static website hosting in S3 console

5. Create CloudFront distribution pointing to S3 bucket

### 5. Firebase Hosting

**Steps:**

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Initialize Firebase:
```bash
firebase init hosting
```

3. Configure firebase.json:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

4. Deploy:
```bash
npm run build
firebase deploy
```

### 6. Docker

**Dockerfile:**
```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**Build and run:**
```bash
# Build image
docker build -t constitution-app .

# Run container
docker run -p 8080:80 constitution-app
```

## 🔒 Environment Variables

For production deployments with different configurations:

1. Create `.env.production`:
```env
VITE_API_URL=https://api.constitution-app.com
VITE_ANALYTICS_ID=your-analytics-id
```

2. Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 🌐 Custom Domain

### Vercel
1. Go to Project Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Follow DNS configuration steps

### CloudFront
1. Add alternate domain name (CNAME)
2. Add SSL certificate from ACM
3. Update DNS to point to CloudFront distribution

## 📊 Performance Optimization

### Code Splitting
Already configured with Vite's automatic code splitting.

### Image Optimization
All images are loaded from Unsplash CDN, which automatically optimizes them.

### Compression
Enable gzip/brotli compression on your server:

**Nginx example:**
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1000;
```

### Caching
Set cache headers for static assets:

**Netlify (_headers file):**
```
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable
```

## 🔍 Monitoring

### Analytics

Add Google Analytics:
```typescript
// In index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Tracking

Add Sentry:
```bash
npm install @sentry/react
```

```typescript
// In main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: import.meta.env.MODE,
});
```

## ✅ Pre-Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Test production build locally with `npm run preview`
- [ ] Update meta tags in index.html
- [ ] Add favicon
- [ ] Test on mobile devices (390×844px)
- [ ] Check all images load correctly
- [ ] Verify all routes work
- [ ] Test all user roles
- [ ] Check console for errors
- [ ] Optimize bundle size
- [ ] Set up error tracking
- [ ] Configure analytics
- [ ] Set up custom domain (optional)
- [ ] Enable HTTPS
- [ ] Test in multiple browsers

## 🐛 Common Issues

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

### 404 on Routes
Ensure your hosting platform redirects all routes to index.html for SPA routing.

### Images Not Loading
Check that Unsplash URLs are accessible and not blocked by CSP.

### Slow Build
Consider reducing image sizes and enabling build caching.

## 📱 PWA (Progressive Web App)

To make the app installable:

1. Install vite-plugin-pwa:
```bash
npm install -D vite-plugin-pwa
```

2. Update vite.config.ts:
```typescript
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Constitution of India',
        short_name: 'Constitution',
        description: 'Civic Education App',
        theme_color: '#FF9933',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
```

## 🎉 Success!

Your app is now deployed and accessible worldwide!

**Next Steps:**
- Share the URL
- Gather user feedback
- Monitor analytics
- Plan feature updates

---

Need help? Check the [README.md](./README.md) for more information.
