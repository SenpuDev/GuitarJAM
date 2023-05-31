import { useState } from 'react'
const useToggle = () => {
  const [state, setState] = useState('en')

  const toggle = () => { setState(prevState => (prevState === 'es' ? 'en' : 'es')) }

  return [state, toggle]
}

export default useToggle
