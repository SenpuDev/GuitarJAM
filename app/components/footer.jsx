import Navigation from './navigation'
import { useContext } from 'react'
import { LanguageContext } from '~/context/language'

const Footer = () => {
  const { language, staticContentDictionary } = useContext(LanguageContext)

  return (
    <footer className='footer'>
      <div className='container content'>
        <Navigation isHeader={false} />

        <p className='copyright'>{staticContentDictionary[language].rights} {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}

export default Footer
