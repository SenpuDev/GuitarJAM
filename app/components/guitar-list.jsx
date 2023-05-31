import Guitar from './guitar'
import { useContext } from 'react'
import { LanguageContext } from '~/context/language'

const GuitarList = ({ guitars }) => {
  const { language, staticContentDictionary } = useContext(LanguageContext)

  return (
    <>
      <h2 className='heading'>{staticContentDictionary[language].collection}</h2>

      {guitars.length && (
        <div className='guitars-grid'>
          {guitars.map(guitar => (
            <Guitar
              key={guitar?.id}
              guitar={guitar?.attributes}
            />
          ))}
        </div>

      )}
    </>
  )
}

export default GuitarList
