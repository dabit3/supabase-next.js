import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../api'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(checkUser)
    checkUser()
    return () => {
      authListener?.unsubscribe()
    };
  }, [])
  function checkUser() {
    const user = supabase.auth.user()
    setUser(user)
  }
  return (
  <div>
    <nav className="p-6 border-b border-gray-300">
      <Link href="/">
        <a className="m-6">Home</a>
      </Link>
      {
        user && (
          <Link href="/create-post">
            <a className="m-6">Create Post</a>
          </Link>
        )
      }
      {
        user && (
          <Link href="/my-posts">
            <a className="m-6">My Posts</a>
          </Link>
        )
      }
      <Link href="/profile">
        <a className="m-6">Profile</a>
      </Link>
    </nav>
    <div className="py-8 px-16">
      <Component {...pageProps} />
    </div>
  </div>
  )
}

export default MyApp
