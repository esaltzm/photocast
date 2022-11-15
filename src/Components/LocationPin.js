import React from 'react'
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'

export default function LocationPin({ photo, setPhotoInfo }) {
    return (
        <div>
            <div className="pin">
                <Icon icon={locationIcon} className="pin-icon" onClick={() => {setPhotoInfo(photo)}} />
            </div>
        </div>
    )
}