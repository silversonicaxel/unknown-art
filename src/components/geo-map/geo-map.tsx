'use client'

import { Map, View } from 'ol'
import { Tile as TileLayer } from 'ol/layer'
import 'ol/ol.css'
import { fromLonLat } from 'ol/proj'
import { OSM } from 'ol/source'
import type { FC } from 'react'
import { useEffect, useRef } from 'react'
import { MAP_ZOOM_LEVEL } from 'src/helpers/config/map'
import type { MapCoordinates } from 'src/types/map'


type GeoMapProps = {
  address: string
  coordinates: MapCoordinates
}

export const GeoMap: FC<GeoMapProps> = ({ coordinates }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<Map | null>(null)

  useEffect(() => {
    if (coordinates !== null) {
      const centerCoordinates = fromLonLat(coordinates)

      if (mapContainerRef.current && !mapRef.current) {
        mapRef.current = new Map({
          layers: [new TileLayer({ source: new OSM() })],
          view: new View({
            center: centerCoordinates,
            zoom: MAP_ZOOM_LEVEL,
          }),
          target: mapContainerRef.current,
        })
      } else if (mapRef.current) {
        mapRef.current.getView().setCenter(centerCoordinates)
      }
    }
  }, [coordinates])

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        console.log('unmount')
        mapRef.current.setTarget(undefined)
        mapRef.current = null
      }
    }
  }, [])

  if (coordinates === null) {
    return null
  }

  return (
    <div
      ref={mapContainerRef}
      style={{ width: '100%', height: '400px', position: 'relative' }}
    />
  )
}
