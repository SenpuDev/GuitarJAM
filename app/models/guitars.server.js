export async function getGuitars (translate = false) {
  const url = `${process.env.API_URL}/guitars${translate ? '?locale=es&' : '?'}populate=image` // Cambiar localhost por 127.0.0.1:
  console.log(url)
  const response = await fetch(url)
  const data = await response.json()

  return data
}

export async function getGuitar (guitarUrl, translate = false) {
  const url = `${process.env.API_URL}/guitars${translate ? '?locale=es&' : '?'}filters[url]=${guitarUrl}&populate=image`
  console.log(url)
  const response = await fetch(url)
  const data = await response.json()

  return data
}
