import { Link } from '@remix-run/react'
import { useContext } from 'react'
import { LanguageContext } from '~/context/language'

const Guitar = ({ guitar }) => {
  const { description, image, price, url, name } = guitar
  const { language, staticContentDictionary } = useContext(LanguageContext)

  return (
    <div className='guitar'>
      <img src={image.data.attributes.formats.medium.url} alt={`Imagen de guitarra ${name}`} />
      <div className='content'>
        <h3>{name}</h3>
        <p className='description'>{description}</p>
        <p className='price'>{price} €</p>

        <Link className='link-to' to={`/guitars/${url}${language === 'es' ? '?translate=es' : ''}`}>{staticContentDictionary[language].seeproduct}</Link>
      </div>
    </div>
  )
}

export default Guitar
