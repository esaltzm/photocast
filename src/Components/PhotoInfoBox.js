import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import closeIcon from '@iconify/icons-mdi/close'

export default function PhotoInfoBox({ photo, setPhotoInfo }) {
    const [displayStyle, setDisplayStyle] = useState({})
    useEffect(() => {
        console.log(photo.data)
        var img = new Image()
        img.onload = function () {
            const height = img.height
            const width = img.width
            height < width ?
                setDisplayStyle({ width: '50%' }) :
                setDisplayStyle({ width: '38%' })
        }
        img.src = photo.url
    }, [photo])
    return (
        <div className='modal-background'>
            <div className='photo-info'>
                <Icon icon={closeIcon} className="close-icon" onClick={() => { setPhotoInfo(false) }} />
                <img className='infobox-photo' src={photo.url} style={displayStyle} alt={photo.url} />
                <div className='metadata'>
                    date: {photo.data.date}<br />
                    time: {photo.data.time}<br />
                    lat: {photo.data.lat}<br />
                    long: {photo.data.long}<br /><br />
                    altitude: {photo.data.alt}<br />
                    temp: {photo.data.temp}<br />
                    precipitation: {photo.data.precip}<br />
                    wind gust speed: {photo.data.gust}<br />
                    snow depth: {photo.data.sde}<br />
                    lightning: {photo.data.ltng ? 'yes' : 'no'}
                </div>
            </div>
        </div>
    )
}
