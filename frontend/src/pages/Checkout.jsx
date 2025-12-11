import React from 'react'
import useCart from '../store/cartStore'
import api from '../api/axios'

export default function Checkout(){
  const items = useCart(s=>s.items)
  const handle = async ()=>{
    const res = await api.post('/checkout/create-checkout-session', { items, successUrl: window.location.origin+'/checkout/success', cancelUrl: window.location.origin+'/checkout/cancel' });
    if(res.data.url) window.location.href = res.data.url;
  }
  return (<div style={{padding:20}}>
    <h2>Checkout</h2>
    <button onClick={handle}>Pay with Stripe</button>
  </div>)
}
