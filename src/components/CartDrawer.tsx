import type { CartLine } from '../types'

type Props = {
  open: boolean
  lines: CartLine[]
  subtotal: number
  onClose: () => void
  onChangeQty: (id: number, delta: number) => void
  onRemove: (id: number) => void
  onCheckout: () => void
}

export default function CartDrawer({
  open,
  lines,
  subtotal,
  onClose,
  onChangeQty,
  onRemove,
  onCheckout,
}: Props) {
  return (
    <div className={`fixed inset-0 z-40 ${open ? '' : 'pointer-events-none'}`}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-slate-900/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-xl transition-transform ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-semibold">Your cart</h2>
          <button onClick={onClose} aria-label="Close cart" className="text-slate-400 hover:text-slate-900">
            ✕
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 items-center justify-center p-8 text-center text-slate-500">
            Your cart is empty.
          </div>
        ) : (
          <ul className="flex-1 space-y-4 overflow-y-auto p-5">
            {lines.map((line) => (
              <li key={line.product.id} className="flex gap-3">
                <img
                  src={line.product.image}
                  alt={line.product.name}
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-2">
                    <span className="font-medium text-slate-900">{line.product.name}</span>
                    <span className="font-semibold">${line.product.price * line.qty}</span>
                  </div>
                  <span className="text-sm text-slate-500">${line.product.price} each</span>
                  <div className="mt-auto flex items-center gap-2">
                    <button
                      onClick={() => onChangeQty(line.product.id, -1)}
                      aria-label={`Decrease quantity of ${line.product.name}`}
                      className="h-7 w-7 rounded border border-slate-300 hover:bg-slate-100"
                    >
                      −
                    </button>
                    <span className="w-6 text-center">{line.qty}</span>
                    <button
                      onClick={() => onChangeQty(line.product.id, 1)}
                      aria-label={`Increase quantity of ${line.product.name}`}
                      className="h-7 w-7 rounded border border-slate-300 hover:bg-slate-100"
                    >
                      +
                    </button>
                    <button
                      onClick={() => onRemove(line.product.id)}
                      className="ml-auto text-sm text-slate-400 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <footer className="border-t border-slate-200 p-5">
          <div className="mb-4 flex justify-between text-base">
            <span className="text-slate-600">Subtotal</span>
            <span className="font-bold">${subtotal.toFixed(2)}</span>
          </div>
          <button
            disabled={lines.length === 0}
            onClick={onCheckout}
            className="w-full rounded-lg bg-slate-900 py-3 font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Checkout
          </button>
        </footer>
      </aside>
    </div>
  )
}
