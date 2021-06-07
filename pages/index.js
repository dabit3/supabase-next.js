import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../api'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchPosts()
    const mySubscription = supabase
      .from('posts')
      .on('*', () => {
        console.log('something happened....')
        fetchPosts()
      })
      .subscribe()
    return () => supabase.removeSubscription(mySubscription)
  }, [])
  async function fetchPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select()
    setPosts(data)
    setLoading(false)
  }
  if (loading) return <p className="text-2xl">Loading ...</p>
  if (!posts.length) return <p className="text-2xl">No posts.</p>
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">Posts</h1>
      {
        posts.map(post => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <div className="cursor-pointer border-b border-gray-300	mt-8 pb-4">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-500 mt-2">Author: {post.user_email}</p>
            </div>
          </Link>)
        )
      }
    </div>
  )
}