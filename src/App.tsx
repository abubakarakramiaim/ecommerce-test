import { useMemo, useState } from 'react'
import CartDrawer from './components/CartDrawer'
import CheckoutModal from './components/CheckoutModal'
import ProductCard from './components/ProductCard'
import { categories, products, type Product } from './data/products'
import type { CartLine } from './types'

export default function App() {
  const [cart, setCart] = useState<CartLine[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [confirmation, setConfirmation] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured')

  const visible = useMemo(() => {
    const filtered = products.filter(
      (p) =>
        (category === 'All' || p.category === category) &&
        p.name.toLowerCase().includes(query.trim().toLowerCase()),
    )
    switch (sort) {
      case 'price-asc':
        return [...filtered].sort((a, b) => a.price - b.price)
      case 'price-desc':
        return [...filtered].sort((a, b) => b.price - a.price)
      case 'rating':
        return [...filtered].sort((a, b) => b.rating - a.rating)
      default:
        return filtered
    }
  }, [query, category, sort])

  const itemCount = cart.reduce((sum, line) => sum + line.qty, 0)
  const subtotal = cart.reduce((sum, line) => sum + line.qty * line.product.price, 0)

  function addToCart(product: Product) {
    setCart((prev) => {
      const existing = prev.find((line) => line.product.id === product.id)
      if (existing) {
        return prev.map((line) =>
          line.product.id === product.id ? { ...line, qty: line.qty + 1 } : line,
        )
      }
      return [...prev, { product, qty: 1 }]
    })
    setCartOpen(true)
  }

  function changeQty(id: number, delta: number) {
    setCart((prev) =>
      prev
        .map((line) => (line.product.id === id ? { ...line, qty: line.qty + delta } : line))
        .filter((line) => line.qty > 0),
    )
  }

  function removeLine(id: number) {
    setCart((prev) => prev.filter((line) => line.product.id !== id))
  }

  function placeOrder(name: string) {
    setCheckoutOpen(false)
    setCartOpen(false)
    setCart([])
    setConfirmation(`Thanks ${name}! Your order is confirmed.`)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4">
          <span className="text-xl font-bold tracking-tight">shop<span className="text-indigo-600">one</span></span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="ml-auto w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 sm:w-64"
          />
          <button
            onClick={() => setCartOpen(true)}
            className="relative rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Cart
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1 text-xs font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16">
        <section className="my-8 rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-12 text-white">
          <h1 className="max-w-lg text-3xl font-bold sm:text-4xl">Gear that makes your desk feel like home</h1>
          <p className="mt-3 max-w-md text-indigo-100">
            Free shipping on orders over $150. 30-day returns, no questions asked.
          </p>
        </section>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  category === c
                    ? 'bg-slate-900 text-white'
                    : 'border border-slate-300 bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            aria-label="Sort products"
            className="ml-auto rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>

        {visible.length === 0 ? (
          <p className="py-16 text-center text-slate-500">No products match your search.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={addToCart} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-500">
        Demo storefront — built as a single-page app. No real payments.
      </footer>

      <CartDrawer
        open={cartOpen}
        lines={cart}
        subtotal={subtotal}
        onClose={() => setCartOpen(false)}
        onChangeQty={changeQty}
        onRemove={removeLine}
        onCheckout={() => setCheckoutOpen(true)}
      />

      <CheckoutModal
        open={checkoutOpen}
        total={subtotal}
        onClose={() => setCheckoutOpen(false)}
        onConfirm={placeOrder}
      />

      {confirmation && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-medium text-white shadow-lg">
          {confirmation}
          <button onClick={() => setConfirmation(null)} className="ml-3 opacity-70 hover:opacity-100">
            ✕
          </button>
        </div>
      )}
    </div>
  )
}
