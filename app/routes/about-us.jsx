import nosotrosimg from '~/../public/img/nosotros.jpg'
import styles from '~/styles/route-styling/about-us.css'
import { useContext } from 'react'
import { LanguageContext } from '~/context/language'

export function meta (params) {
  const translate = (params.location.search === '?translate=es')
  return {
    title: translate ? 'GuitarJAM - Sobre nosotros' : 'GuitarJAM - About us',
    description: translate ? 'Tu tienda de guitarras, cursos, música...' : 'Your guitar shop, courses, music...'
  }
}

export function links () {
  return [
    {
      rel: 'stylesheet',
      href: styles
    },
    {
      rel: 'preload',
      href: nosotrosimg,
      as: 'image'
    }
  ]
}

const Nosotros = () => {
  const { language, staticContentDictionary } = useContext(LanguageContext)
  return (
    <main className='container about-us'>
      <h2 className='heading'>{staticContentDictionary[language].aboutus}</h2>

      <div className='content'>
        <img src={nosotrosimg} alt={staticContentDictionary[language].aboutus} />

        <div>
          <p>{staticContentDictionary[language].aboutuscontent}</p>
        </div>
      </div>
    </main>
  )
}

export default Nosotros
