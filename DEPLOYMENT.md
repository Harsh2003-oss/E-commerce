# VoltEdge Electronics - Deployment Guide

This guide provides step-by-step instructions for deploying the **VoltEdge Electronics** MERN stack e-commerce web application to production.

---

## 📋 Pre-Deployment Checklist

- [ ] Node.js 18+ installed locally
- [ ] MongoDB Atlas cluster created (or local MongoDB container)
- [ ] Environment variables configured:
  - `MONGODB_URI`: MongoDB connection string
  - `NEXT_PUBLIC_BASE_URL`: Public domain URL (e.g. `https://voltedge.vercel.app`)

---

## 🚀 Option 1: Deploy to Vercel (Recommended)

Vercel is the native hosting platform for Next.js and provides zero-config continuous deployment, instant CDN caching, and edge network execution.

### Method A: Deploy via GitHub (Easiest)
1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - VoltEdge Electronics"
   git remote add origin https://github.com/your-username/voltedge-electronics.git
   git branch -M main
   git push -u origin main
   ```
2. Open [https://vercel.com](https://vercel.com) and log in.
3. Click **"Add New..."** → **"Project"**.
4. Import your `voltedge-electronics` GitHub repository.
5. In the **Environment Variables** section, add:
   - `MONGODB_URI` = `mongodb+srv://<username>:<password>@cluster0.mongodb.net/voltedge?retryWrites=true&w=majority`
   - `NEXT_PUBLIC_BASE_URL` = `https://<your-project>.vercel.app`
6. Click **"Deploy"**.
7. Once deployed, visit `https://<your-project>.vercel.app/api/seed` in your browser to seed the MongoDB database with initial sample products!

### Method B: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy preview
vercel

# Deploy to production
vercel --prod
```

---

## 🐳 Option 2: Deploy with Docker & Docker Compose

For deploying to your own VPS (Ubuntu/Debian, AWS EC2, DigitalOcean Droplet, Linode, Hetzner), Docker Compose runs both the Next.js app and the MongoDB database automatically.

### Run with Docker Compose
1. Ensure Docker & Docker Compose are installed on your server:
   ```bash
   docker --version
   docker compose version
   ```

2. Clone or copy the project files to your server.

3. Start both the web application and MongoDB:
   ```bash
   docker compose up -d --build
   ```

4. Check running containers:
   ```bash
   docker compose ps
   ```

5. Access the app:
   - Open `http://your-server-ip:3000`
   - Seed database: Visit `http://your-server-ip:3000/api/seed`

6. Stop containers:
   ```bash
   docker compose down
   ```

---

## 🚂 Option 3: Deploy to Render / Railway

### Deploy to Render
1. Go to [https://render.com](https://render.com) and create an account.
2. Click **New +** → **Web Service**.
3. Connect your GitHub repository.
4. Settings:
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run start`
5. Under **Environment Variables**, add:
   - `MONGODB_URI`
   - `NEXT_PUBLIC_BASE_URL`
6. Click **Create Web Service**.

### Deploy to Railway
1. Go to [https://railway.app](https://railway.app).
2. Click **New Project** → **Deploy from GitHub repo**.
3. Add a **MongoDB** plugin service inside Railway or connect an external Atlas URI.
4. Add environment variables:
   - `MONGODB_URI` = Railway Mongo connection string
   - `PORT` = `3000`
5. Railway will automatically build and expose the deployment URL.

---

## 🍃 MongoDB Atlas Setup Guide

If using cloud MongoDB (recommended for Vercel/Netlify/Render):

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and register for a free account.
2. Create a new free cluster (**M0 Free Tier**).
3. Under **Security** → **Database Access**:
   - Create a database user with username and strong password.
   - Set privileges to **Read and write to any database**.
4. Under **Security** → **Network Access**:
   - Click **Add IP Address**.
   - Select **Allow Access from Anywhere** (`0.0.0.0/0`) for serverless deployments like Vercel.
5. Under **Database** → **Connect**:
   - Choose **Drivers** (Node.js).
   - Copy connection string:
     ```
     mongodb+srv://<username>:<password>@cluster.mongodb.net/voltedge?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your real user password.
6. Paste into your `.env.local` or hosting provider environment variables.

---

## 🧪 Post-Deployment Verification

1. **Visit Homepage**: Ensure the hero section, featured products, categories, flash deals, and testimonials render smoothly.
2. **Shop Catalog**: Test category filters, price sliders, brand selection, and search query.
3. **Cart & Checkout**:
   - Add items to the cart
   - View order summary with tax & shipping computation
   - Fill out checkout form and place test order
4. **Blog**: Read articles and check related posts.
5. **Contact**: Submit a test inquiry via the contact form.
6. **API Endpoints**:
   - `GET /api/products` → returns JSON product list
   - `GET /api/seed` → automatically initializes MongoDB collections
   - `POST /api/contact` → persists customer inquiries
