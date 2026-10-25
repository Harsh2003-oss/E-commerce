import mongoose, { Schema } from 'mongoose';

export interface IProduct {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  images: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  features: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 },
    category: {
      type: String,
      required: true,
      enum: ['Smartphones', 'Laptops', 'Audio', 'Gaming', 'Smart Home', 'Accessories', 'Cameras', 'Tablets'],
    },
    brand: { type: String, required: true, trim: true },
    images: [{ type: String }],
    stock: { type: Number, required: true, default: 0, min: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    features: [{ type: String }],
    isNew: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

ProductSchema.index({ category: 1, price: 1 });
ProductSchema.index({ slug: 1 }, { unique: true });
ProductSchema.index({ isFeatured: 1 });
ProductSchema.index({ name: 'text', description: 'text', brand: 'text' });

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
