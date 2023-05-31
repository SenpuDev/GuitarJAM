import { Link, useLocation, useNavigate } from '@remix-run/react'
import cartImage from '~/../public/img/carrito.png'
import { useContext, useEffect } from 'react'
import { LanguageContext } from '~/context/language'

const Navigation = ({ isHeader }) => {
  const { language, toggleLanguage, staticContentDictionary } = useContext(LanguageContext)

  const location = useLocation()
  const navigate = useNavigate()

  const handleChange = () => {
    toggleLanguage()
  }

  useEffect(() => {
    if (language === 'es') {
      navigate(`${location.pathname}?translate=${language}`)
      return
    }
    navigate(`${location.pathname}`)
  }, [language])

  return (
    <>
      <div>
        {isHeader && (
          <div className='right-align'>

            <div className='switch-button'>
              <input className='switch-button-checkbox' type='checkbox' id='checkbox' onChange={handleChange} />
              <label className={language === 'en' ? 'switch-button-label selected' : 'switch-button-label'} htmlFor='checkbox'>EN</label>
              <span>/</span>
              <label className={language === 'es' ? 'switch-button-label selected' : 'switch-button-label'} htmlFor='checkbox'>ES</label>
            </div>
          </div>
        )}
        <nav className='navigation'>
          <Link
            to={language !== 'en' ? `/?translate=${language}` : '/'}
            className={location.pathname === '/' ? 'active' : ''}
          >{staticContentDictionary[language].homenav}
          </Link>

          <Link
            to={language !== 'en' ? `about-us?translate=${language}` : '/about-us'}
            className={location.pathname === '/about-us' ? 'active' : ''}
          >{staticContentDictionary[language].aboutusnav}
          </Link>

          <Link
            to={language !== 'en' ? `guitars?translate=${language}` : '/guitars'}
            className={location.pathname.includes('/guitars') ? 'active' : ''}
          >{staticContentDictionary[language].shopnav}
          </Link>

          <Link
            to={language !== 'en' ? `entries?translate=${language}` : 'entries'}
            className={location.pathname.includes('/entries') ? 'active' : ''}
          >{staticContentDictionary[language].blognav}
          </Link>

          <Link
            to={language !== 'en' ? `cart?translate=${language}` : 'cart'}
          >
            <img className={location.pathname === '/cart' ? 'active' : ''} src={cartImage} alt={staticContentDictionary[language].cartnav} />
          </Link>

        </nav>
      </div>
    </>
  )
}

export default Navigation
