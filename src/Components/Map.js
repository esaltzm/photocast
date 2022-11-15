import React from 'react'
import LocationPin from './LocationPin'
import GoogleMapReact from 'google-map-react'


// for later https://stackoverflow.com/questions/61868955/how-to-set-center-and-zoom-of-google-map-to-cover-all-markers-generated-from-wor
export default function Map({ center, zoom, photoURLs, photoInfo, setPhotoInfo }) {

    return (
        <div className="map">
            <div className="google-map">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
                    defaultCenter={center}
                    defaultZoom={zoom}
                    options={function (maps) { return { mapTypeId: "terrain" } }}
                >
                    {photoURLs.map(photo => {
                        return photo.data.lat && photo.data.long ?
                            <LocationPin lat={photo.data.lat} lng={photo.data.long} photo={photo} setPhotoInfo={setPhotoInfo} key={photo.data.lat + ',' + photo.data.long}/> : <></>
                    })}
                </GoogleMapReact>
            </div>
        </div>
    )
}
