import { useState } from 'react'

type Props = {
  open: boolean
  total: number
  onClose: () => void
  onConfirm: (name: string) => void
}

export default function CheckoutModal({ open, total, onClose, onConfirm }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  if (!open) return null

  const valid = name.trim() && email.includes('@') && address.trim()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-slate-900/50" />
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-semibold">Checkout</h2>
        <p className="mt-1 text-sm text-slate-500">Demo checkout — no payment is processed.</p>

        <form
          className="mt-5 space-y-3"
          onSubmit={(e) => {
            e.preventDefault()
            if (valid) onConfirm(name.trim())
          }}
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
          />
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Shipping address"
            rows={3}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
          />

          <div className="flex justify-between border-t border-slate-200 pt-3 text-base">
            <span className="text-slate-600">Total</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-slate-300 py-2.5 font-medium hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!valid}
              className="flex-1 rounded-lg bg-slate-900 py-2.5 font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Place order
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
