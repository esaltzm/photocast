import React, { useState } from 'react'
import { Icon } from '@iconify/react'

export default function LocationPin({ photo, setPhotoInfo }) {
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
                        style={{ height: '90px', border: 'solid rgb(18, 72, 18) 4px', borderRadius: '3px', zIndex: '2' }}
                        alt={'photo on' + photo.data.date}
                    />
                </div> :
                <div className='pin'>
                    <Icon
                        icon={'mdi:map-marker'}
                        className='pin-icon'
                        onClick={() => { setPhotoInfo(photo) }}
                        onMouseOver={() => { setIsHovering(!isHovering) }}
                    />
                </div>
            }
        </div>
    )
}