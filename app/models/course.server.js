export async function getCourse (translate = false) {
  const url = `${process.env.API_URL}/course${translate ? '?locale=es&' : '?'}populate=image`
  const response = await fetch(url)
  const data = await response.json()

  return data
}
