import styles from '~/styles/route-styling/guitars.css'
import { Outlet, useOutletContext } from '@remix-run/react'

export function links () {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

const Shop = () => {
  return (
    <main className='container'>
      <Outlet
        context={useOutletContext()}
      />
    </main>
  )
}

export default Shop
