import React from 'react'
import LocationPin from './LocationPin'
import GoogleMapReact from 'google-map-react'


// for later https://stackoverflow.com/questions/61868955/how-to-set-center-and-zoom-of-google-map-to-cover-all-markers-generated-from-wor
export default function Map({ center, zoom, photoURLs }) {
    return (
        <div className="map">
            <div className="google-map">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: '' }}
                    defaultCenter={center}
                    defaultZoom={zoom}
                    options={function (maps) { return { mapTypeId: "terrain" } }}
                >
                    {photoURLs.map(photo => {
                        if (photo.data.lat && photo.data.long) {
                            console.log('data', photo.data.lat, photo.data.long)
                            return <LocationPin lat={photo.data.lat} lng={photo.data.long} />
                        }
                    })}
                </GoogleMapReact>
            </div>
        </div>
    )
}
