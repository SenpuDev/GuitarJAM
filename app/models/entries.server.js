export async function getEntries (translate = false) {
  const url = `${process.env.API_URL}/entries${translate ? '?locale=es&' : '?'}populate=image` // Change localhost for 127.0.0.1: on .env
  console.log(url)
  const response = await fetch(url)
  const data = await response.json()

  return data
}

export async function getEntry (entryUrl, translate = false) {
  const url = `${process.env.API_URL}/entries${translate ? '?locale=es&' : '?'}filters[url]=${entryUrl}&populate=image`
  console.log(url)
  const response = await fetch(url)
  const data = await response.json()

  return data
}
