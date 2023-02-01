import React from 'react'
import { useState } from 'react'
import {useRouter} from 'next/router'
import axios from 'axios'
import styles from '../../styles/Login.module.css'
function Login() {
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [error, setError] = useState(false)
  const router = useRouter()

  const handleClick = async () => {
    try {
      await axios.post('https://woksfoods.vercel.app/api/login', {username, password});
      router.push('/admin')
    } catch (error) {
      console.log(error)
      setError(true)
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Admin Dashboard</h1>
        <input type="text"
        placeholder='username' 
        className={styles.input}
        onChange={(e) =>setUsername(e.target.value) }/>

        <input type="text"
        placeholder='password' 
        className={styles.input}
        onChange={(e) =>setPassword(e.target.value) }/>
        <button onClick={handleClick} className={styles.button}>Sign in</button>
        {error && <span className={styles.error}>Wrong Credentials!</span>}
      </div>
    </div>
  )
}

export default Login
