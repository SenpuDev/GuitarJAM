import { useLoaderData } from '@remix-run/react'
import { getGuitars } from '~/models/guitars.server'
import GuitarList from '~/components/guitar-list'
import urlParse from 'url-parse'

export function meta (params) {
  const translate = (params.location.search === '?translate=es')
  return {
    title: translate ? 'GuitarJAM - Tienda de guitarras' : 'GuitarJAM - Guitar Shop',
    description: translate ? 'Echa un ojo a nuestra colección de guitarras!' : 'Check out our guitar collection!'
  }
}

export async function loader ({ request }) {
  const parsedUrl = urlParse(request.url, true)
  const translate = (parsedUrl.query.translate === 'es')
  const guitars = await getGuitars(translate)
  return guitars.data
}

const Shop = () => {
  const guitars = useLoaderData()

  return (
    <GuitarList guitars={guitars} />
  )
}

export default Shop
