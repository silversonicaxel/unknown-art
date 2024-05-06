'use client'

import { useEffect, useState } from 'react'
import { totalPlaces } from '../api/place'

export type UseTotalPlacesHook = () => UseTotalPlacesHookResult

export type UseTotalPlacesHookResult = {
  data: number
  isLoading: boolean
  error: boolean
}

export const useTotalPlaces: UseTotalPlacesHook = () => {
  const [data, setData] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchTotalPlaces = async () => {
      setIsLoading(true)

      try {
        // const total = await totalPlaces()
        // setData(total)
        setData(12)
      } catch {
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTotalPlaces()
    return () => {}
  }, [])

  return { data, isLoading, error }
}
