import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProgressBar from "@ramonak/react-progress-bar"
import { Icon } from '@iconify/react'
import Map from './Map'
import PhotosContainer from './PhotosContainer'
import PhotoInfoBox from './PhotoInfoBox'

export default function Home({ photoURLs, setPhotoURLS, noData, photoInfo, setPhotoInfo, photoFiles }) {
    const [param, setParam] = useState('millis')
    const [hoverPhoto, setHoverPhoto] = useState(false)
    const [dir, setDir] = useState('highest')
    const [colors, setColors] = useState([])
    const params = ['Altitude (ft)', 'Temperature (f)', 'Windchill (f)', 'Precipitation (in)', 'Humidity (rh)', 'Wind gust speed (mph)', 'Visibility (mi)']
    const paramKeys = {
        'Altitude (ft)': 'alt',
        'Temperature (f)': 'temp',
        'Windchill (f)': 'windchill',
        'Precipitation (in)': 'precip',
        'Humidity (rh)': 'humidity',
        'Wind gust speed (mph)': 'gust',
        'Visibility (mi)': 'vis'
    }

    useEffect(() => {
        const sortPhotos = (param, direction) => {
            const sortParam = paramKeys[param]
            let sortedPhotos
            direction === 'highest' ?
                sortedPhotos = photoURLs.sort((a, b) => b.data[sortParam] - a.data[sortParam]) :
                sortedPhotos = photoURLs.sort((a, b) => a.data[sortParam] - b.data[sortParam])
            setPhotoURLS([...sortedPhotos])
        }
        const sortColors = () => {
            const lightest = photoURLs[photoURLs.length - 1].data[paramKeys[param]]
            const darkest = photoURLs[0].data[paramKeys[param]]
            const diff = darkest - lightest
            const newColors = [...photoURLs.map((photo, i) => {
                const rScale = 255 - 255 * Math.abs((photo.data[paramKeys[param]] - darkest) / diff)
                const z = 1000 - i
                return {
                    rgb: [rScale, 0, 0],
                    z: z
                }
            })]
            setColors(newColors)
        }
        sortPhotos(param, dir)
        if (photoURLs.length) sortColors()
    }, [param, dir])

    useEffect(() => {
        let sortedPhotos
        const sortPhotos = () => {
            sortedPhotos = photoURLs.sort((a, b) => a.data.millis - b.data.millis)
            setPhotoURLS([...sortedPhotos])
        }
        sortPhotos()
    }, [photoURLs.length])

    return (
        <div className='home'>
            {photoFiles.length ?
                <div className='home-after'>
                    <div className='info-header'>
                        {photoInfo && <PhotoInfoBox photo={photoInfo} setPhotoInfo={setPhotoInfo} />}
                        <p>Loaded {photoURLs.length} of {photoFiles.length - noData} photos, {noData} were excluded for lack of EXIF data</p>
                        {photoURLs.length / (photoFiles.length - noData) < 1 &&
                            <ProgressBar
                                completed={photoURLs.length / (photoFiles.length - noData) * 100}
                                customLabel={' '}
                                bgColor={'forestgreen'}
                                width={'200px'}
                                margin={'0 auto'}
                            />}
                        <div className='menukey'>
                            <div className='menu'>
                                <select className='select' defaultValue={'default'} onChange={(e) => { setParam(e.target.value) }}>
                                    <option value='default' disabled>Choose a parameter!</option>
                                    {params.map(param => <option value={param} key={param}>{param}</option>)}
                                </select>
                                <select className='select' defaultValue={'highest'} onChange={(e) => { setDir(e.target.value) }}>
                                    <option value='highest'>High to low</option>
                                    <option value='lowest'>Low to high</option>
                                </select>
                            </div>
                            {param !== 'millis' &&
                                <div className='key'>
                                    Key: {param}
                                    <div className='subkey'>
                                        <div className='color' style={{ color: `rgb(${colors[0].rgb})` }}>
                                            <Icon icon={'mdi:map-marker'} />
                                        </div>
                                        <div>{photoURLs[0].data[paramKeys[param]]}</div>
                                    </div>
                                    <div className='subkey'>
                                        <div className='color' style={{ color: `rgb(${colors[colors.length - 1].rgb})` }}>
                                            <Icon icon={'mdi:map-marker'} />
                                        </div>
                                        <div>{photoURLs[photoURLs.length - 1].data[paramKeys[param]]}</div>
                                    </div>
                                </div>}
                        </div>
                    </div>
                    <div className='content'>
                        <Map center={{ lat: 38.74, lng: -106.41 }} zoom={8} photoURLs={photoURLs} photoInfo={photoInfo} setPhotoInfo={setPhotoInfo} colors={colors} hoverPhoto={hoverPhoto} param={param} paramKeys={paramKeys} />
                        <PhotosContainer photoURLs={photoURLs} photoInfo={photoInfo} setPhotoInfo={setPhotoInfo} setHoverPhoto={setHoverPhoto} />
                    </div>
                </div> :
                <div className='home-before'>
                    <img src='default.jpg' alt='a stormy landscape' style={{ width: '60%' }} />
                    <div className='home-link-div'>{'to get started... '}
                        <Link className='home-link' to='/upload-photos'>upload some photos</Link>
                    </div>
                </div>
            }
        </div>
    )
}
