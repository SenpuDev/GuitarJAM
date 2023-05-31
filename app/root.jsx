import { Meta, Links, Outlet, Scripts, LiveReload, useCatch, Link } from '@remix-run/react'
import { useState, useEffect } from 'react'
import Header from '~/components/header' // ~ focus on tsconfig.json "~/*": ["./app/*"]
import Footer from '~/components/footer'
import { LanguageProvider } from './context/language'

import styles from '~/styles/general-styles/global.css'

export function meta (params) {
  const translate = (params.location.search === '?translate=es')
  return (
    {
      charset: 'utf-8',
      title: translate ? 'GuitarJAM - Inicio' : 'GuitarJAM - Home',
      viewport: 'width=device-width, initial-scale=1'
    }
  )
}

// Remix dinamic stylesheets, can add prefetch/preload images too
export function links () {
  return [
    {
      rel: 'stylesheet',
      as: styles,
      href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'true'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap'
    },
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

export default function App () {
  // npm i remix-utils to use ClientOnly on cart.jsx
  const localStorageCart = typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('cart')) ?? [] : null
  const [cart, setCart] = useState(localStorageCart)

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = selectedGuitar => {
    setCart([...cart, selectedGuitar])

    if (cart.some(guitarOnCart => guitarOnCart.name === selectedGuitar.name)) {
      const updatedCart = cart.map(guitarOnCart => {
        if (guitarOnCart.name === selectedGuitar.name) {
          guitarOnCart.amount = selectedGuitar.amount
        }
        return guitarOnCart
      })
      setCart(updatedCart)
    } else {
      setCart([...cart, selectedGuitar])
    }
  }

  const updateCartAmount = selectedGuitar => {
    const updatedCart = cart.map(guitarOnCart => {
      if (guitarOnCart.name === selectedGuitar.name) {
        guitarOnCart.amount = selectedGuitar.amount
      }
      return guitarOnCart
    })
    setCart(updatedCart)
  }

  const deleteGuitar = selectedGuitarName => {
    const updatedCart = cart.filter(guitarOnCart => guitarOnCart.name !== selectedGuitarName)
    setCart(updatedCart)
  }

  return (
    <Document>
      <Outlet
        context={{
          addToCart,
          cart,
          updateCartAmount,
          deleteGuitar
        }}
      />
    </Document>
  )
}

function Document ({ children }) {
  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>

      <body>
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
        <Scripts />
        <LiveReload />
      </body>

    </html>
  )
}

/* Fix bug websocked in dev enviorment:
        <script>
          const socket = new WebSocket('ws://localhost:8080')
          console.log(socket)
        </script>
*/

// Scripts -> Remix optimizations to prevent flash on page reload
// LiveReload -> Update instantly the web on code changes detect (Like live server)

/* Error handling with - useCatch CatchBoundary & ErrorBoundary */
export function CatchBoundary () {
  const error = useCatch()

  return (
    <Document>
      <p className='error'>{error.status} {error.statusText}</p>
      <Link className='error-link-to' to='/'>Back to home</Link>
    </Document>
  )
}

export function ErrorBoundary ({ error }) {
  return (
    <Document>
      <p className='error'>{error.status} {error.statusText}</p>
      <Link className='error-link-to' to='/'>Back to home</Link>
    </Document>
  )
}
