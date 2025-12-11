import React, { useState } from 'react'
import api from '../api/axios'

export default function Signup(){
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const submit=async e=>{ e.preventDefault(); const r=await api.post('/auth/signup',{ name,email,password }); localStorage.setItem('access', r.data.access); localStorage.setItem('refresh', r.data.refresh); window.location.href='/' }
  return (<div style={{padding:20}}>
    <h2>Signup</h2>
    <form onSubmit={submit}>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder='name' />
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder='email' />
      <input type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='password' />
      <button>Signup</button>
    </form>
  </div>)
}
