import React from 'react'
import useCart from '../store/cartStore'
import { Link } from 'react-router-dom'

export default function Cart() {
  const items = useCart(s => s.items)
  const clear = useCart(s => s.clear)

  return (
    <div style={{ padding: 20 }}>
      <h2>Cart</h2>
      {items.length === 0 ? (
        <p>Your Amazon Cart is empty.</p>
      ) : (
        <div>
          {items.map((i, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '10px 0' }}>
              <div>
                <strong>{i.meta?.title || i.title || 'Product'}</strong>
                <div style={{ fontSize: '12px', color: '#555' }}>Quantity: {i.quantity}</div>
                {i.size && <div style={{ fontSize: '12px', color: '#555' }}>Size: {i.size}</div>}
              </div>
              <div>${(i.price || i.meta?.price)?.toFixed(2)}</div>
            </div>
          ))}

          <div style={{ marginTop: 20, textAlign: 'right' }}>
            <h3>Subtotal ({items.length} items): ${(items.reduce((acc, curr) => acc + (curr.price || curr.meta?.price || 0) * curr.quantity, 0)).toFixed(2)}</h3>
            <button onClick={clear} style={{ marginRight: 10, backgroundColor: '#f0f0f0', border: '1px solid #d5d9d9', padding: '5px 10px', marginTop: 10 }}>Clear Cart</button>
            <Link to='/checkout'><button className="btn-primary" style={{ marginTop: 10 }}>Proceed to Checkout</button></Link>
          </div>
        </div>
      )}
    </div>
  )
}
