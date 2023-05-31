import { useLoaderData } from 'react-router'
import { getEntries } from '~/models/entries.server'
import BlogList from '~/components/entries-list'
import urlParse from 'url-parse'

export function meta (params) {
  const translate = (params.location.search === '?translate=es')
  return {
    title: translate ? 'GuitarJAM - Nuestro Blog' : 'GuitarJAM - Our Blog',
    description: translate ? 'Entérate de las ultimas novedades' : 'Find out the latest news'
  }
}

export async function loader ({ request }) {
  const parsedUrl = urlParse(request.url, true)
  const translate = (parsedUrl.query.translate === 'es')
  const entries = await getEntries(translate)
  return entries.data
}

const Blog = () => {
  const entries = useLoaderData()

  return (
    <BlogList entries={entries} />
  )
}

export default Blog
