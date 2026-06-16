# Lisa Properties Website - Full Stack Setup Guide

## Overview
This is a complete real estate website with:
- **Frontend**: Next.js 15 with React 19 (Property listings & admin dashboard)
- **Backend**: Express.js with MongoDB (API, scraping, sync engine)
- **Features**: Property24 scraping, manual listing management, CSV import, status tracking

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (cloud) or local MongoDB
- Git

---

## 📦 Backend Setup (Express.js)

### 1. Install Dependencies
```bash
cd api
npm install
```

### 2. Environment Configuration
Create `.env` file in `/api` directory:

```env
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lisa-properties?retryWrites=true&w=majority

# JWT Secret (change this!)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Admin User
ADMIN_EMAIL=admin@lisaproperties.co.za
ADMIN_PASSWORD=change_me_in_production

# Property24 Scraper
PROPERTY24_AGENT_ID=560632
PROPERTY24_BASE_URL=https://www.property24.com/for-sale/agency/keller-williams-jacaranda/lisa-aphane/560632

# CORS
FRONTEND_URL=http://localhost:3000

# Cron Schedule (runs daily at 2 AM)
SYNC_SCHEDULE=0 2 * * *

# Optional: Run sync on server start for testing
SYNC_ON_START=false
```

### 3. MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Create a database user
4. Get connection string: `mongodb+srv://user:password@cluster.mongodb.net/dbname`
5. Add to `.env` as `MONGODB_URI`

### 4. Start Backend Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

You should see:
```
✅ Lisa Properties API Server Running
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Port: 5000
Environment: development
Frontend: http://localhost:3000
```

---

## 🎨 Frontend Setup (Next.js)

### 1. Install Dependencies
```bash
# From project root
npm install
```

### 2. Environment Configuration
Create `.env.local` in project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Start Frontend Development Server
```bash
npm run dev
```

Frontend will be available at: `http://localhost:3000`

---

## 🔐 First Time Admin Setup

### 1. Create Admin Account
1. Navigate to: `http://localhost:3000/admin/auth/register`
2. Fill in:
   - Email: Your admin email
   - Password: Strong password (min 8 chars)
   - Name: Your name
3. Click "Create Account" - You'll be logged in automatically

### 2. Login
- URL: `http://localhost:3000/admin/auth/login`
- Email & password from step 1

---

## 📊 Admin Dashboard Features

### Dashboard (`/admin/dashboard`)
- Real-time listing statistics
- Latest sync status
- Manual sync trigger
- Quick access to key features

### Listings Management (`/admin/listings`)
- View all listings
- Filter by status (available, on-show, sold, withdrawn)
- Sort and paginate
- Bulk status update
- Edit individual listings
- Search functionality

### Create Listing (`/admin/listings/create`)
- Manual property entry
- Full form with all property details
- Image URL support
- Status assignment

### Property24 Sync (`/admin/dashboard`)
- **Automatic**: Runs daily at 2 AM (configurable in `.env`)
- **Manual**: Click "🔄 Trigger Manual Sync" button
- Scrapes all current listings from Property24
- Auto-detects sold/delisted properties
- Updates pricing and details

### Sync Logs (`/admin/logs`)
- View sync history
- See what was added/updated/removed
- Check success/failure status
- Track sync duration

### CSV Bulk Import (`/admin/listings/import`)
1. **Download template**: Get CSV template
2. **Fill data**: Add your property listings
3. **Upload**: Import all at once

**CSV Format:**
```csv
price,bedrooms,bathrooms,parkingSpaces,erfSize,zoning,propertyType,abbreviated,fullDescription,location,mainImage,status
R 1000000,3,2,1,382 m²,Residential,House,Beautiful home,Full description here,Johannesburg,https://example.com/image.jpg,available
```

---

## 🔗 API Endpoints

### Authentication
```
POST   /api/auth/register       - Create first admin
POST   /api/auth/login          - Admin login
GET    /api/auth/me             - Get current user (requires token)
```

### Listings (Public)
```
GET    /api/listings            - Get all listings (filters: status, type, page, limit)
GET    /api/listings/:id        - Get single listing
```

### Listings (Admin - Requires Token)
```
POST   /api/listings            - Create new listing
PATCH  /api/listings/:id        - Update listing
DELETE /api/listings/:id        - Withdraw listing (soft delete)
PATCH  /api/listings/bulk/status - Update multiple listings
PATCH  /api/listings/:id/featured - Mark as featured
```

### Sync & Logs
```
POST   /api/sync/sync           - Trigger manual sync (requires token)
GET    /api/sync/logs           - Get sync history (paginated)
GET    /api/sync/logs/latest    - Get latest sync log
```

### CSV Import
```
GET    /api/csv/template        - Download CSV template
POST   /api/csv/import          - Upload and import CSV (requires token)
```

---

## 🔄 How Scraping Works

1. **Property24 URL Structure**
   ```
   https://www.property24.com/for-sale/agency/keller-williams-jacaranda/lisa-aphane/{AGENT_ID}/p{PAGE}
   ```

2. **Scrape Process**
   - Puppeteer launches headless browser
   - Navigates to Property24 listing page
   - Extracts listing data (price, bedrooms, location, images, etc.)
   - Handles pagination automatically
   - **Duration**: ~10-20 seconds per page

3. **Sync Engine**
   - Compares scraped listings with database
   - **New**: Creates new DB records
   - **Updated**: Updates existing prices/details
   - **Delisted**: Marks as "sold" (doesn't hard delete)
   - Creates sync log with statistics

4. **Automatic Sync**
   - Runs on schedule: `0 2 * * *` (2 AM daily)
   - Configurable via `SYNC_SCHEDULE` in `.env`
   - Logs all activity for auditing

---

## 📝 Database Schema

### Listing Document
```javascript
{
  // Source
  source: "property24" | "manual",
  property24Id: "116364280", // null for manual
  
  // Property Details
  price: "R 1,000,000",
  bedrooms: 3,
  bathrooms: 2,
  parkingSpaces: 1,
  erfSize: "382 m²",
  zoning: "Single Residential",
  propertyType: "House",
  abbreviated: "Short description",
  fullDescription: "Full description...",
  location: "Johannesburg",
  
  // Media
  galleryImgs: ["url1", "url2"],
  mainImage: "url1",
  
  // Status
  status: "available" | "on-show" | "sold" | "withdrawn",
  statusUpdatedBy: "admin@example.com",
  statusUpdatedAt: ISODate,
  
  // Dates
  listingDate: ISODate,
  soldDate: ISODate,
  createdAt: ISODate,
  updatedAt: ISODate,
  lastScrapedAt: ISODate,
  
  // Featured
  isFeatured: false
}
```

### Admin Document
```javascript
{
  email: "admin@lisaproperties.co.za",
  password: "hashed_bcrypt_password",
  name: "Admin Name",
  role: "super_admin" | "admin",
  isActive: true,
  lastLogin: ISODate,
  createdAt: ISODate
}
```

### SyncLog Document
```javascript
{
  syncType: "property24_scrape" | "csv_import" | "manual_sync",
  status: "success" | "failed" | "partial",
  totalScraped: 50,
  newListings: 5,
  updatedListings: 10,
  removedListings: 2,
  duration: 45, // seconds
  createdAt: ISODate,
  createdBy: "admin@example.com"
}
```

---

## 🧪 Testing

### Test Endpoints with cURL

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lisaproperties.co.za","password":"your_password"}'
```

**Get Listings:**
```bash
curl http://localhost:5000/api/listings
```

**Trigger Sync (with token):**
```bash
curl -X POST http://localhost:5000/api/sync/sync \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🚨 Troubleshooting

### Backend Won't Start
```
❌ MongoDB connection failed: connection timeout
```
- Check `.env` MONGODB_URI is correct
- Ensure IP is whitelisted in MongoDB Atlas
- Test connection string in MongoDB Compass

### Puppeteer Scraping Issues
```
Error: Failed to launch the browser process
```
- Install Chromium: `npm install chromium-browser`
- On Linux, install: `apt-get install libgconf-2-4`

### CORS Errors
```
Access to XMLHttpRequest blocked by CORS policy
```
- Ensure `.env` `FRONTEND_URL` matches your frontend URL
- Check backend CORS middleware is enabled

### Admin Login Fails
```
Invalid credentials
```
- Ensure `.env` ADMIN_EMAIL matches your registration email
- Check JWT_SECRET hasn't been changed mid-session
- Clear browser cache and try again

---

## 📈 Scaling & Production

### Before Production Deploy
1. **Security**
   - Change `JWT_SECRET` to strong random string
   - Use environment variables for all secrets
   - Add rate limiting to API
   - Implement HTTPS

2. **Performance**
   - Enable MongoDB indexes
   - Add caching (Redis)
   - Optimize Puppeteer (concurrent page scraping)
   - CDN for image delivery

3. **Monitoring**
   - Set up error logging (Sentry)
   - Monitor sync jobs (PM2)
   - Database backups
   - API uptime monitoring

4. **Deployment Options**
   - **Backend**: Heroku, Railway, Render, AWS EC2
   - **Frontend**: Vercel, Netlify
   - **Database**: MongoDB Atlas (managed)

---

## 📚 Additional Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Express Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Puppeteer API](https://pptr.dev/)
- [JWT Handbook](https://auth0.com/resources/ebooks/jwt-handbook)

---

## 📞 Support

For issues or questions:
1. Check troubleshooting section above
2. Review error logs in API console
3. Check browser console for frontend errors
4. Review MongoDB logs in Atlas dashboard

---

**Good luck! 🚀**
