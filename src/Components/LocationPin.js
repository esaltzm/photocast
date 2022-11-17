import React, { useState } from 'react'
import { Icon } from '@iconify/react'

export default function LocationPin({ photo, setPhotoInfo, color, z, size }) {
    const [isHovering, setIsHovering] = useState(false)
    return (
        <div>
            {isHovering ?
                <div
                    className='pin-hover'
                    onClick={() => { setPhotoInfo(photo) }}
                >
                    <img
                        onMouseLeave={() => { setIsHovering(!isHovering) }}
                        src={photo.url}
                        style={{ position: 'relative', height: '90px', border: `solid rgb(${color}) 4px`, borderRadius: '3px', zIndex: '10000' }}
                        alt={'photo on' + photo.data.date}
                    />
                </div> :
                <div className='pin'>
                    <Icon
                        icon={'mdi:map-marker'}
                        className='pin-icon'
                        onClick={() => { setPhotoInfo(photo) }}
                        onMouseOver={() => { setIsHovering(!isHovering) }}
                        style={{ position: 'relative', color: `rgb(${color})`, zIndex: `${z}`, fontSize:`${size}` }}
                    />
                </div>
            }
        </div>
    )
}