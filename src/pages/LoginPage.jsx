import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage({ onLogin }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    const users = [
      { email: 'dwi@student.ub.ac.id', password: '123456', nama: 'Dwi Kurniawan', role: 'mahasiswa' },
      { email: 'staff@ub.ac.id', password: 'staff123', nama: 'Staff', role: 'staff' }
    ]
    const user = users.find(u => u.email === email && u.password === password)
    if (user) {
      onLogin(user)
      navigate('/')
    } else {
      alert('Login gagal!')
    }
  }

  return (
    <div style={{padding: 50, textAlign: 'center'}}>
      <h1>Login</h1>
      <form onSubmit={handleLogin} style={{maxWidth: 300, margin: '0 auto'}}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{width: '100%', padding: 10, marginBottom: 10}} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{width: '100%', padding: 10, marginBottom: 10}} />
        <button type="submit" style={{width: '100%', padding: 10, background: '#2563eb', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer'}}>Masuk</button>
      </form>
      <p style={{fontSize: 12, color: '#999', marginTop: 20}}>Demo: dwi@student.ub.ac.id / 123456</p>
    </div>
  )
}

export default LoginPage