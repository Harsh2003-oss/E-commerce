'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X, ArrowUpDown, Check, RefreshCw } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { ALL_PRODUCTS, CATEGORIES } from '@/data/mockData';

const ALL_BRANDS = ['All', ...Array.from(new Set(ALL_PRODUCTS.map((p) => p.brand))).sort()];

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured Flagships' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest Arrivals' },
];

export default function ShopClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sort, setSort] = useState('featured');
  const [search, setSearch] = useState(initialSearch);
  const [maxPrice, setMaxPrice] = useState(4000);
  const [minRating, setMinRating] = useState(0);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let products = [...ALL_PRODUCTS];

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.tagline && p.tagline.toLowerCase().includes(q)) ||
          (p.highlights && p.highlights.some((h) => h.value.toLowerCase().includes(q))) ||
          (p.specs && Object.values(p.specs).some((val) => val.toLowerCase().includes(q)))
      );
    }

    if (selectedCategory !== 'All') {
      products = products.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (selectedBrand !== 'All') {
      products = products.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    products = products.filter((p) => p.price <= maxPrice);

    if (minRating > 0) {
      products = products.filter((p) => p.rating >= minRating);
    }

    if (onlyInStock) {
      products = products.filter((p) => p.stock > 0);
    }

    switch (sort) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        products.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return products;
  }, [search, selectedCategory, selectedBrand, sort, maxPrice, minRating, onlyInStock]);

  const resetAllFilters = () => {
    setSelectedCategory('All');
    setSelectedBrand('All');
    setSearch('');
    setMaxPrice(4000);
    setMinRating(0);
    setOnlyInStock(false);
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedBrand !== 'All' ||
    search !== '' ||
    maxPrice < 4000 ||
    minRating > 0 ||
    onlyInStock;

  return (
    <div style={{ background: '#07080c', minHeight: '100vh', paddingBottom: '96px' }}>
      {/* Page Title & Search Header */}
      <section style={{ padding: '30px 0 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Hardware Inventory
              </span>
              <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                Catalog & <span className="gradient-text">Devices</span>
              </h1>
              <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>
                Showing {filtered.length} of {ALL_PRODUCTS.length} authentic electronics products
              </p>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="btn btn-secondary mobile-filter-btn"
              style={{ display: 'none', fontSize: '13px' }}
            >
              <SlidersHorizontal size={15} />
              Filters {hasActiveFilters && '• Active'}
            </button>
          </div>
        </div>
      </section>

      {/* Main Catalog Layout */}
      <div className="container" style={{ paddingTop: '32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '36px' }} className="shop-grid">
          {/* Left Filter Sidebar */}
          <aside
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '28px',
            }}
            className={`shop-sidebar ${filtersOpen ? 'open' : ''}`}
          >
            {/* Clear All */}
            {hasActiveFilters && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                  Filters Applied
                </span>
                <button
                  onClick={resetAllFilters}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'none',
                    border: 'none',
                    color: '#f43f5e',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <RefreshCw size={12} /> Reset All
                </button>
              </div>
            )}

            {/* Categories */}
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
                Categories
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('All')}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: selectedCategory === 'All' ? 'rgba(37, 99, 235, 0.15)' : 'transparent',
                    color: selectedCategory === 'All' ? '#60a5fa' : '#94a3b8',
                    border: selectedCategory === 'All' ? '1px solid rgba(37, 99, 235, 0.3)' : '1px solid transparent',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 600,
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>All Categories</span>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>{ALL_PRODUCTS.length}</span>
                </button>
                {CATEGORIES.map((c) => {
                  const isSelected = selectedCategory.toLowerCase() === c.slug.toLowerCase();
                  return (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => setSelectedCategory(c.slug)}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: isSelected ? 'rgba(37, 99, 235, 0.15)' : 'transparent',
                        color: isSelected ? '#60a5fa' : '#94a3b8',
                        border: isSelected ? '1px solid rgba(37, 99, 235, 0.3)' : '1px solid transparent',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: 600,
                        textAlign: 'left',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span>{c.name}</span>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>
                        {ALL_PRODUCTS.filter((p) => p.category.toLowerCase() === c.slug.toLowerCase()).length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Brands */}
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
                Authorized Brand
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {ALL_BRANDS.map((brand) => {
                  const isSelected = selectedBrand.toLowerCase() === brand.toLowerCase();
                  return (
                    <button
                      key={brand}
                      type="button"
                      onClick={() => setSelectedBrand(brand)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        background: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                        color: isSelected ? '#07080c' : '#94a3b8',
                        border: isSelected ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.08)',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {brand}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Max Price
                </h4>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#3b82f6' }}>
                  ${maxPrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="99"
                max="4000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: '#3b82f6',
                  cursor: 'pointer',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', marginTop: '6px' }}>
                <span>$99</span>
                <span>$4,000+</span>
              </div>
            </div>

            {/* In-stock toggle */}
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  color: '#cbd5e1',
                  fontWeight: 600,
                }}
              >
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: '#3b82f6', cursor: 'pointer' }}
                />
                In-Stock Ready to Ship
              </label>
            </div>
          </aside>

          {/* Right Product Grid Area */}
          <div>
            {/* Top Toolbar: Search + Sort Dropdown */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px',
                flexWrap: 'wrap',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
                padding: '12px 18px',
                marginBottom: '28px',
              }}
            >
              {/* Search Bar */}
              <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
                <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Filter by title, specs, features..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: '36px', height: '40px', fontSize: '13px' }}
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Sort Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Sort by:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  style={{
                    background: '#151926',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    padding: '8px 12px',
                    fontSize: '13px',
                    fontWeight: 600,
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filtered.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '80px 24px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '16px',
                }}
              >
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>
                  No hardware matches your active filters
                </h3>
                <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '20px' }}>
                  Try adjusting your price ceiling or removing brand restrictions.
                </p>
                <button onClick={resetAllFilters} className="btn btn-primary">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
                  gap: '24px',
                }}
              >
                {filtered.map((product, idx) => (
                  <ProductCard key={product._id} product={product} index={idx} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 860px) {
          .shop-grid {
            grid-template-columns: 1fr !important;
          }
          .mobile-filter-btn {
            display: inline-flex !important;
          }
          .shop-sidebar {
            display: none !important;
          }
          .shop-sidebar.open {
            display: flex !important;
            padding: 20px;
            background: #0e111a;
            border-radius: 12px;
            margin-bottom: 24px;
          }
        }
      `}</style>
    </div>
  );
}
