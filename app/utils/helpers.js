export const formatDate = (date, language) => {
  const newDate = new Date(date)
  const options = {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  }

  if (language === 'es') {
    return newDate.toLocaleDateString('es-ES', options)
  }

  return newDate.toLocaleDateString('en-US', options)
}
