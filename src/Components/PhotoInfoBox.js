import React from 'react'
import { Icon } from '@iconify/react'
import closeIcon from '@iconify/icons-mdi/close'

export default function PhotoInfoBox({ photo, setPhotoInfo }) {
    console.log(photo.data)
    return (
        <div className='modal-background'>
            <div className='photo-info'>
                <Icon icon={closeIcon} className="close-icon" onClick={() => {setPhotoInfo(false)}} />
                <img src={photo.url} style={{ position:'relative', width: '50%', float: 'right', marginTop: '6%'}} alt={photo.url} />
                <div className='metadata'>
                    date: {photo.data.date}<br />
                    time: {photo.data.time}<br />
                    lat: {photo.data.lat}<br />
                    long: {photo.data.long}<br /><br />
                    altitude: {photo.data.alt}<br />
                    temp: {photo.data.temp}<br />
                    windchill: {photo.data.windchill}<br />
                    precipitation: {photo.data.precip}<br />
                    humidity: {photo.data.humidity}<br />
                    wind gust speed: {photo.data.gust}<br />
                    visibility: {photo.data.vis}<br />
                </div>
            </div>
        </div>
    )
}
//            {photoInfo && <PhotoInfoBox photo={photoInfo}/>}