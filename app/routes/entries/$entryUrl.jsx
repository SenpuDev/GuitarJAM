import { useLoaderData } from '@remix-run/react'
import { getEntry } from '~/models/entries.server'
import { formatDate } from '~/utils/helpers'
import urlParse from 'url-parse'

export async function loader ({ params, request }) {
  const { entryUrl } = params
  const parsedUrl = urlParse(request.url, true)
  const translate = (parsedUrl.query.translate === 'es')

  // Modify url -es/-en to get translated content on language change
  const newEntryUrl = translate ? entryUrl.replace(/-en$/, '-es') : entryUrl.replace(/-es$/, '-en')
  const entry = await getEntry(newEntryUrl, translate)

  if (entry.data.length === 0) {
    throw new Response('', {
      status: '404',
      statusText: 'Entry not found'
    })
  }

  return entry.data[0].attributes
}

export function meta ({ data }) { // El data de meta esta disponible SOLO cuando el loader retorna algo
  if (!data) {
    return {
      title: 'GuitarJAM - Blog not available',
      description: 'GuitarJAM - Blog not available'
    }
  }
  return {
    title: `GuitarJAM - ${data.title}`,
    description: `GuitarJAM - Guitarra ${data.title}`
  }
}

const Entry = () => {
  const entry = useLoaderData()
  const { title, content, image, publishedAt } = entry

  return (
    <article className='entry'>
      <img className='mt5' src={image.data.attributes.url} alt={`blog ${title}`} />
      <div className='content'>
        <h3>{title}</h3>
        <p className='date'>{formatDate(publishedAt)}</p>
        <p className='text'>{content}</p>
      </div>
    </article>
  )
}

export default Entry
