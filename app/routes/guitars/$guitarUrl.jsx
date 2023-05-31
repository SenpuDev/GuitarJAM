import { useContext, useState } from 'react'
import { useLoaderData } from 'react-router'
import { getGuitar } from '~/models/guitars.server'
import { useOutletContext } from '@remix-run/react'
import urlParse from 'url-parse'
import { LanguageContext } from '~/context/language'
import toast, { Toaster } from 'react-hot-toast'

export async function loader ({ params, request }) {
  const { guitarUrl } = params
  const parsedUrl = urlParse(request.url, true)
  const translate = (parsedUrl.query.translate === 'es')

  // Modify url -es/-en to get translated content on language change
  const newGuitarUrl = translate ? guitarUrl.replace(/-en$/, '-es') : guitarUrl.replace(/-es$/, '-en')
  const guitar = await getGuitar(newGuitarUrl, translate)

  if (guitar.data.length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'Guitar not found'
    })
  }

  return guitar
}

export function meta ({ data }) {
  if (!data) {
    return {
      title: 'GuitarJAM - Guitar not found',
      description: 'GuitarJAM - Guitar not found'
    }
  }
  return {
    title: `GuitarJAM - ${data.data[0].attributes.name}`,
    description: `GuitarJAM - ${data.data[0].attributes.name}`
  }
}

export const Guitar = () => {
  const { addToCart } = useOutletContext()
  const [guitarAmount, setGuitarAmount] = useState(0)
  const guitar = useLoaderData()
  const { name, description, image, price } = guitar.data[0].attributes
  const { language, staticContentDictionary } = useContext(LanguageContext)

  const handleSubmit = e => {
    e.preventDefault()
    if (guitarAmount < 1) {
      language === 'es' ? toast('¡Espera! Primero selecciona la cantidad', { icon: '✋' }) : toast('Wait! First select quantity', { icon: '✋' })
      return
    }

    const selectedGuitar = {
      id: guitar.data[0].id,
      image: image.data.attributes.url,
      name,
      price,
      amount: guitarAmount

    }

    language === 'es' ? toast(`${selectedGuitar.name} x${guitarAmount} se ha añadido al carrito`, { icon: '👏' }) : toast(`${selectedGuitar.name} x${guitarAmount} added to cart`, { icon: '👏' })

    addToCart(selectedGuitar)
  }

  return (

    <div className='guitar'>
      <Toaster
        position='top-right'
        reverseOrder={false}
      />
      <img src={image.data.attributes.url} alt={`Guitar ${name}`} />

      <div className='content'>
        <h3>{name}</h3>
        <p className='text'>{description}</p>
        <p className='price'>{price} €</p>

        <form className='form' onSubmit={handleSubmit}>
          <label htmlFor='amount'>{staticContentDictionary[language].cartproductamount}</label>

          <select
            id='amount'
            onChange={e => setGuitarAmount(+e.target.value)}
          >
            <option value='0'>{staticContentDictionary[language].selectquantity}</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>

          <input type='submit' value={staticContentDictionary[language].addtocart} />
        </form>
      </div>
    </div>
  )
}

export default Guitar
