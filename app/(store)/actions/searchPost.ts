'use server'

import { client } from "@/sanity/lib/client"


export async function searchPosts(query: string) {
  if (!query) return []

  const groqQuery = `*[_type == "product" && title match "${query}*"]{
    _id,
    title,
    slug,
    mainImage
  }`

  const results = await client.fetch(groqQuery)
  return results
}