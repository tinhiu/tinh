
/**
 * Paginates the list of music by page, this is one of the ways of doing pagination
 * when you know the total of music and jumping to X page is fast in your DB.
 */

export default async function getProducts({
  music,
  limit,
  page,
}: {
  music: any;
  limit: number;
  page: number;
}) {
  // Usually pagination is done by your DB, and the total is also known by the
  // DB, in this case we're using a demo json so things are simpler.
  const paginatedProducts = music.slice((page - 1) * limit, page * limit)
  const totalPages = Math.ceil(music.length / limit)
  return { music: paginatedProducts, total: music.length, totalPages }
}
