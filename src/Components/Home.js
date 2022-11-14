import React, { useEffect, useState } from 'react'
import Photo from './Photo'

export default function Home({ photoURLs, setPhotoURLS, noData }) {
    const [param, setParam] = useState('Altitude (ft)')
    const [dir, setDir] = useState('highest')
    const params = ['Altitude (ft)', 'Temperature (f)', 'Windchill (f)', 'Precipitation (in)', 'Humidity (rh)', 'Wind gust speed (mph)', 'Visibility (mi)']
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

    useEffect(() => {
        sortPhotos(param,dir)
    }, [param,dir])

    return (
        <div className='home'>
            <select defaultValue={'default'} onChange={(e) => {setParam(e.target.value)}}>
                <option value='default' disabled>Choose a parameter!</option>
                {params.map(param => <option value={param} key={param}>{param}</option>)}
            </select>
            <select defaultValue={'highest'} onChange={(e) => {setDir(e.target.value)}}>
                <option value='highest'>High to low</option>
                <option value='lowest'>Low to high</option>
            </select>
            <div className='noData'>{noData} of your photos were excluded for insufficient EXIF data</div>
            <div className='photosContainer'>
                {photoURLs.map(img => <Photo url={img.url} data={img.data} key={img.url} />)}
            </div>
        </div>
    )
}
