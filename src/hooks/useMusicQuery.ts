import { useQuery } from 'react-query'
import { getMyTopTracks } from '../pages/api/spotify/spotify'


const FIVE_MINUTES_IN_MS = 5 * 60 * 1000

export default function useTopTracksQuery(page: number, skip: number) {
  return useQuery(
    ['topTracks', page],
    () => getMyTopTracks(page, skip),
    {
      staleTime: FIVE_MINUTES_IN_MS,
      keepPreviousData: true,
      retry: false,
    }
  )
}