import React from 'react'
import LocationPin from './LocationPin'
import GoogleMapReact from 'google-map-react'

export default function Map({ center, zoom, photoURLs, setPhotoInfo, colors, hoverPhoto, param, paramKeys }) {
    return (
        <div className='map'>
            <div className='google-map'>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
                    defaultCenter={center}
                    defaultZoom={zoom}
                    options={function (maps) { return { mapTypeId: "terrain" } }}
                >
                    {photoURLs.map((photo, i) => {
                        let size, color, z
                        colors.length ? z = colors[i].z.toString() : z = 1
                        if (photo.url === hoverPhoto.url) {
                            size = '2rem'
                            color = '255, 255, 0'
                            z = 1000000
                        } else {
                            size = '1.5rem'
                            if (colors.length) {
                                color = colors[i].rgb.toString()
                            } else {
                                color = '18, 72, 18'
                            }
                        }
                        return photo.data.lat && photo.data.long ?
                            <LocationPin lat={photo.data.lat} lng={photo.data.long} photo={photo} setPhotoInfo={setPhotoInfo} key={photo.url} color={color} z={z} size={size} /> : <></>
                    })}
                </GoogleMapReact>
            </div>
        </div>
    )
}
