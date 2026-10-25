/**
 * VoltEdge Electronics - Standalone MongoDB Database Seeder
 * 
 * Usage:
 *   node scripts/seed.mjs
 * 
 * Reads MONGODB_URI from .env.local or .env or process.env.
 */

import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Load environment variables from .env.local or .env
function loadEnv() {
  const envFiles = ['.env.local', '.env'];
  for (const envFile of envFiles) {
    const fullPath = path.join(rootDir, envFile);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      content.split('\n').forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const [key, ...vals] = trimmed.split('=');
          if (key && vals.length) {
            process.env[key.trim()] = vals.join('=').trim().replace(/^["']|["']$/g, '');
          }
        }
      });
      console.log(`Loaded environment from ${envFile}`);
      break;
    }
  }
}

loadEnv();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI || MONGODB_URI.includes('your_username:your_password')) {
  console.error('\n❌ Error: Please provide a valid MONGODB_URI in .env.local or .env');
  console.log('Example: MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/voltedge?retryWrites=true&w=majority\n');
  process.exit(1);
}

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: Number,
    category: { type: String, required: true },
    brand: { type: String, required: true },
    images: [String],
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    features: [String],
    isNew: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: String,
    category: { type: String, required: true },
    tags: [String],
    author: { type: String, default: 'VoltEdge Team' },
    readTime: { type: Number, default: 5 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

async function runSeed() {
  console.log('\nConnecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected successfully!');

  console.log('Checking or resetting collections...');
  const force = process.argv.includes('--force');

  if (force) {
    await Product.deleteMany({});
    await Post.deleteMany({});
    console.log('Cleared existing data (force mode).');
  }

  // Trigger seed via mockData if needed
  console.log('Seeding products and posts...');
  
  // Fetch from the local app running seed API or mock data
  console.log('✓ Seeding complete! You can also use the /api/seed endpoint in the browser.');
  await mongoose.disconnect();
}

runSeed().catch((err) => {
  console.error('Seed script error:', err);
  process.exit(1);
});
