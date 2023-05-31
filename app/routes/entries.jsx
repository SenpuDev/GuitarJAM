import styles from '~/styles/route-styling/entries.css'
import { Outlet } from 'react-router'

export function links () {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

const Blog = () => {
  return (
    <main className='container'>
      <Outlet />
    </main>
  )
}

export default Blog
