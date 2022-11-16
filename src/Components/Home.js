import React, { useEffect, useState } from 'react'
import Map from './Map'
import PhotosContainer from './PhotosContainer'
import PhotoInfoBox from './PhotoInfoBox'

export default function Home({ photoURLs, setPhotoURLS, noData, photoInfo, setPhotoInfo, photoFiles, loaded }) {
    const [param, setParam] = useState('Altitude (ft)')
    const [dir, setDir] = useState('highest')
    const params = ['Altitude (ft)', 'Temperature (f)', 'Windchill (f)', 'Precipitation (in)', 'Humidity (rh)', 'Wind gust speed (mph)', 'Visibility (mi)']

    useEffect(() => {
        const sortPhotos = (param, direction) => {
            const paramKeys = {
                'Altitude (ft)': 'alt',
                'Temperature (f)': 'temp',
                'Windchill (f)': 'windchill',
                'Precipitation (in)': 'precip',
                'Humidity (rh)': 'humidity',
                'Wind gust speed (mph)': 'gust',
                'Visibility (mi)': 'vis'
            }
            const sortParam = paramKeys[param]
            let sortedPhotos
            direction === 'highest' ?
                sortedPhotos = photoURLs.sort((a, b) => b.data[sortParam] - a.data[sortParam]) :
                sortedPhotos = photoURLs.sort((a, b) => a.data[sortParam] - b.data[sortParam])
            setPhotoURLS([...sortedPhotos])
        }
        sortPhotos(param, dir)
    }, [param, dir])

    return (
        <div className='home'>
            {photoInfo && <PhotoInfoBox photo={photoInfo} setPhotoInfo={setPhotoInfo}/>}
            <h4>Loaded {loaded} of {photoFiles.length} photos</h4>
            <select className='select' defaultValue={'default'} onChange={(e) => { setParam(e.target.value) }}>
                <option value='default' disabled>Choose a parameter!</option>
                {params.map(param => <option value={param} key={param}>{param}</option>)}
            </select>
            <select className='select' defaultValue={'highest'} onChange={(e) => { setDir(e.target.value) }}>
                <option value='highest'>High to low</option>
                <option value='lowest'>Low to high</option>
            </select>
            <div className='noData'>{noData} of your photos were excluded for insufficient EXIF data</div>
            <Map center={{ lat: 38.74, lng: -106.41 }} zoom={8} photoURLs={photoURLs} photoInfo={photoInfo} setPhotoInfo={setPhotoInfo} />
            <PhotosContainer photoURLs={photoURLs} photoInfo={photoInfo} setPhotoInfo={setPhotoInfo} />
        </div>
    )
}
