export type Product = {
  id: number
  name: string
  price: number
  category: string
  rating: number
  image: string
  description: string
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Aurora Wireless Headphones',
    price: 189,
    category: 'Audio',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    description: 'Over-ear headphones with active noise cancelling and 40h battery.',
  },
  {
    id: 2,
    name: 'Nimbus Mechanical Keyboard',
    price: 139,
    category: 'Desk',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    description: 'Hot-swappable 75% keyboard with tactile switches and RGB.',
  },
  {
    id: 3,
    name: 'Orbit Smart Watch',
    price: 249,
    category: 'Wearables',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    description: 'AMOLED display, GPS, heart-rate tracking and 7-day battery.',
  },
  {
    id: 4,
    name: 'Pebble Bluetooth Speaker',
    price: 79,
    category: 'Audio',
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80',
    description: 'Pocket-sized speaker with punchy bass and IPX7 waterproofing.',
  },
  {
    id: 5,
    name: 'Lumen Desk Lamp',
    price: 59,
    category: 'Desk',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
    description: 'Dimmable LED lamp with wireless charging base.',
  },
  {
    id: 6,
    name: 'Vertex Laptop Stand',
    price: 69,
    category: 'Desk',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
    description: 'Aluminium stand with adjustable height and cable routing.',
  },
  {
    id: 7,
    name: 'Halo Earbuds',
    price: 129,
    category: 'Audio',
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
    description: 'True wireless earbuds with spatial audio and wireless charging.',
  },
  {
    id: 8,
    name: 'Trek Everyday Backpack',
    price: 99,
    category: 'Bags',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    description: 'Water-resistant 22L backpack with padded laptop sleeve.',
  },
  {
    id: 9,
    name: 'Cinder Travel Mug',
    price: 39,
    category: 'Bags',
    rating: 4.1,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80',
    description: 'Vacuum-insulated mug that keeps drinks hot for 12 hours.',
  },
]

export const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))]
