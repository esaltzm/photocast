import React, { useState } from 'react'
import { Icon } from '@iconify/react'

export default function LocationPin({ photo, setPhotoInfo }) {
    const [isHovering, setIsHovering] = useState(false)
    return (
        <div>
            {isHovering ?
                <div className='pin-hover' onMouseOut={() => { setIsHovering(false) }} onClick={() => { setPhotoInfo(photo) }}>
                    <img src={photo.url} style={{height:'90px', border:'solid red 4px', borderRadius:'3px'}}/>
                </div> :
                <div className='pin'>
                    <Icon
                        icon={'material-symbols:image'}
                        className='pin-icon'
                        onClick={() => { setPhotoInfo(photo) }}
                        onMouseOver={() => { setIsHovering(true) }}
                    />
                </div>
            }
        </div>
    )
}