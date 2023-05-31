import { Link } from 'react-router-dom'
import { formatDate } from '~/utils/helpers'
import { useContext } from 'react'
import { LanguageContext } from '~/context/language'

const Entry = ({ entry }) => {
  const { content, image, title, url, publishedAt } = entry
  const { language, staticContentDictionary } = useContext(LanguageContext)

  return (
    <article className='entry'>
      <img src={image.data.attributes.formats.small.url} alt={`blog ${title}`} />
      <div className='content'>
        <h3>{title}</h3>
        <p className='date'>{formatDate(publishedAt, language)}</p>
        <p className='summary'>{content}</p>
        <Link className='link-to' to={`/entries/${url}${language === 'es' ? '?translate=es' : ''}`}>{staticContentDictionary[language].readentry}</Link>
      </div>
    </article>
  )
}

export default Entry
