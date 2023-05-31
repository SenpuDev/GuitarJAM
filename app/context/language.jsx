import { createContext } from 'react'
import useToggle from '~/hooks/useToggle'

export const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, toggleLanguage] = useToggle()

  // Other alternative could be a local .json
  const staticContentDictionary = {
    en: {
      homenav: 'Home',
      aboutusnav: 'About us',
      shopnav: 'Shop',
      blognav: 'Blog',
      cartnav: 'Cart',
      collection: 'Our guitar collection',
      aboutus: 'About us',
      aboutuscontent: 'Explore the world of guitars at our store! At GuitarJAM, we are dedicated to providing our customers with an exceptional guitar experience. Our team consists of music enthusiasts and guitar experts, ready to guide you in your search for the perfect instrument. We offer a wide selection of high-quality guitars, ranging from acoustic to electric, from renowned brands in the industry. Whether you are an enthusiastic beginner or an experienced musician, we have the right instrument for you. Our knowledgeable staff is here to help you find the sound and feel you desire, providing personalized advice and recommendations based on your level and preferences.',
      seeproduct: 'See product',
      readentry: 'Read entry',
      rights: 'All rights reserved',
      cart: 'Your cart',
      emptycart: 'Empty Cart',
      cartproductamount: 'Amount',
      products: 'Products',
      orderpreview: 'Order preview',
      totaltopay: 'Total to pay',
      selectquantity: '-- Select quantity --',
      addtocart: 'Add to Cart',
      perunit: '/pu.',
      buy: 'Checkout'
    },
    es: {
      homenav: 'Inicio',
      aboutusnav: 'Nosotros',
      shopnav: 'Tienda',
      blognav: 'Blog',
      cartnav: 'Carrito',
      collection: 'Nuestra colección de guitarras',
      aboutus: 'Nosotros',
      aboutuscontent: 'En GuitarJAM, nos dedicamos a ofrecer a nuestros clientes una experiencia excepcional en el mundo de las guitarras. Nuestro equipo está formado por amantes de la música y expertos en guitarras, listos para guiarte en tu búsqueda del instrumento perfecto. Contamos con una amplia selección de guitarras de alta calidad, desde acústicas hasta eléctricas, de marcas reconocidas en la industria. Ya seas un principiante entusiasta o un músico experimentado, tenemos el instrumento adecuado para ti. Nuestro personal capacitado está aquí para ayudarte a encontrar el sonido y la sensación que deseas, ofreciéndote asesoramiento personalizado y recomendaciones basadas en tu nivel y preferencias.',
      seeproduct: 'Ver producto',
      readentry: 'Leer entrada',
      rights: 'Todos los derechos reservados',
      cart: 'Tu carrito de compras',
      emptycart: 'Carrito vacio',
      cartproductamount: 'Cantidad',
      products: 'Articulos',
      orderpreview: 'Resumen del pedido',
      totaltopay: 'Total a pagar',
      selectquantity: '-- Selecciona cantidad --',
      addtocart: 'Añadir al carrito',
      perunit: '/ud.',
      buy: 'Tramitar pedido'
    }
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, staticContentDictionary }}>
      {children}
    </LanguageContext.Provider>
  )
}
