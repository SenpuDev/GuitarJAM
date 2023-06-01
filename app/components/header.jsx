// Remix hooks
import { Link } from '@remix-run/react'

// Components
import Navigation from './navigation'
// Image filess
import guitarJamImageEN from '../../public/img/logoEN.svg'
import guitarJamImageES from '../../public/img/logo.svg'
import { useContext } from 'react'
import { LanguageContext } from '~/context/language'

const Header = () => {
  const { language } = useContext(LanguageContext)
  return (
    <header className='header'>
      <div className='container bar'>
        <div className='logo'>
          <Link to={language !== 'en' ? `/?translate=${language}` : '/'}>
            <img src={language === 'en' ? guitarJamImageEN : guitarJamImageES} alt='GuitarJam logo' />
          </Link>
        </div>
        <Navigation isHeader />
      </div>
    </header>
  )
}

export default Header
