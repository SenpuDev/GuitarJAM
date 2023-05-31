import styles from '~/styles/route-styling/cart.css'

import { useState, useEffect, useContext } from 'react'
import { useOutletContext } from '@remix-run/react'

import { ClientOnly } from 'remix-utils'

import { LanguageContext } from '~/context/language'
import toast, { Toaster } from 'react-hot-toast'

export function links () {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

export function meta (params) {
  const translate = (params.location.search === '?translate=es')
  return {
    title: translate ? 'GuitarJAM - Tu Carrito' : 'GuitarJAM - Your Cart',
    description: translate ? 'Tu tienda de guitarras, cursos, música...' : 'Your guitar shop, courses, music...'
  }
}

const Cart = () => {
  const { language, staticContentDictionary } = useContext(LanguageContext)
  const { cart, updateCartAmount, deleteGuitar } = useOutletContext()
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const totalCount = cart.reduce((total, product) => total + (product.amount * product.price), 0)

    setTotal(totalCount)
  }, [total, cart])

  const handleCheckout = () => {
    if (cart?.length !== 0) {
      toast.success(language === 'es' ? 'Simulando compra completada :)' : 'Simulating successful checkout :)')
      return
    }
    toast.error(language === 'es' ? 'Añade algún producto al carrito!' : 'Add some products to cart!')
  }

  return (
    <ClientOnly fallback='Loading...'>{() => ( // Prevents Hydratation errors
      <main className='contenedor'>
        <Toaster
          position='top-right'
          reverseOrder={false}
        />
        <h1 className='heading'>{staticContentDictionary[language].cart}</h1>
        <div className='content'>
          <div className='cart'>
            <h2>{staticContentDictionary[language].products}</h2>
            {cart?.length === 0
              ? staticContentDictionary[language].emptycart
              : (
                  cart?.map(product => (
                    <div key={product.name} className='product container'>
                      <div>
                        <img src={product.image} alt={`Product ${product.nombre}`} />
                      </div>

                      <div>
                        <div className='cart-wrap'>
                          <p className='name'>{product.name}</p>
                          <button type='button' className='delete-btn' onClick={e => deleteGuitar(product.name)}>X</button>
                        </div>
                        <p>{staticContentDictionary[language].cartproductamount}:</p>

                        <select
                          defaultValue={product.amount} className='select' onChange={e => updateCartAmount({
                            amount: +e.target.value,
                            name: product.name
                          })}
                        >
                          <option value='1'>1</option>
                          <option value='2'>2</option>
                          <option value='3'>3</option>
                          <option value='4'>4</option>
                          <option value='5'>5</option>
                        </select>

                        <div className='cart-wrap'>
                          <p><span>{product.price}</span>€{staticContentDictionary[language].perunit}</p>
                          <p><span>Subtotal: {product.price * product.amount}</span>€</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
          </div>

          <aside className='summary'>
            <h3>{staticContentDictionary[language].orderpreview}</h3>

            {cart?.length === 0
              ? staticContentDictionary[language].emptycart
              : cart?.map(product =>
                <div key={product.name} className='cart-preview-wrap'>
                  <p>{product.name} <span>x{product.amount}</span></p>
                  <p>{product.price * product.amount}€</p>
                </div>
              )}
            <p className='total-to-pay'>{staticContentDictionary[language].totaltopay}: {total}€</p>
            <button onClick={handleCheckout} className='checkout-button'>{staticContentDictionary[language].buy}</button>
          </aside>
        </div>
      </main>

    )}
    </ClientOnly>
  )
}

export default Cart
