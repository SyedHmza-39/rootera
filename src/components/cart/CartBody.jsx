import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import Button from '../ui/Button'
import CartItem from './CartItem'
import CartSummary from './CartSummary'
import OrderRequest from './OrderRequest'
import { useCart } from '../../hooks/useCart'

export default function CartBody() {
  const { items, subtotal, currency, hasUnpriced, closeCart } = useCart()
  const [view, setView] = useState('cart') // 'cart' | 'order'

  if (items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
        <ShoppingBag size={36} strokeWidth={1.25} className="text-gold" />
        <p className="mt-5 font-serif text-2xl text-forest">Your cart is empty</p>
        <p className="body-text mt-3 max-w-xs">
          Add a ROOTERA product to begin your ritual.
        </p>
        <Button to="/shop" onClick={closeCart} className="mt-8">
          Shop the collection
        </Button>
      </div>
    )
  }

  if (view === 'order') {
    return <OrderRequest onBack={() => setView('cart')} onClose={closeCart} />
  }

  return (
    <>
      <ul className="flex-1 overflow-y-auto px-6">
        {items.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </ul>
      <CartSummary
        subtotal={subtotal}
        currency={currency}
        hasUnpriced={hasUnpriced}
        onOrder={() => setView('order')}
        onContinue={closeCart}
      />
    </>
  )
}