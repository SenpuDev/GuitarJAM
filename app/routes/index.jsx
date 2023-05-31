import stylesGuitarras from '~/styles/route-styling/guitars.css'
import stylesBlog from '~/styles/route-styling/entries.css'
import stylesCurso from '~/styles/route-styling/course.css'

import { getGuitars } from '~/models/guitars.server'
import { getEntries } from '~/models/entries.server'
import { getCourse } from '~/models/course.server'

import GuitarList from '~/components/guitar-list'
import BlogList from '~/components/entries-list'
import Course from '~/components/curso'

import { useLoaderData } from '@remix-run/react'

import urlParse from 'url-parse'

// Loader - Remix obtain data before render any component
export async function loader ({ request }) {
  // Obtain query.translate for get content in correct language (strapi nationalization)
  const parsedUrl = urlParse(request.url, true)
  const translate = (parsedUrl.query.translate === 'es')

  const [guitars, entries, course] = await Promise.all([getGuitars(translate), getEntries(translate), getCourse(translate)])
  return { guitars: guitars.data, entries: entries.data, course: course.data }
}

// export function meta () {} already declared on root as a mainpage, so no needed here

export function links () {
  return [
    {
      rel: 'stylesheet',
      href: stylesGuitarras
    },
    {
      rel: 'stylesheet',
      href: stylesBlog
    },
    {
      rel: 'stylesheet',
      href: stylesCurso
    }
  ]
}

function Index () {
  const { guitars, entries, course } = useLoaderData()
  return (
    <>
      <main className='container'>
        <GuitarList guitars={guitars} />
      </main>

      <Course course={course.attributes} />

      <section className='container'>
        <BlogList entries={entries} />
      </section>
    </>
  )
}

export default Index
