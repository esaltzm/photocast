import React from 'react'

export default function Photo({ photo, setPhotoInfo, setHoverPhoto }) {
    return (
        <div className='photo' onClick={() => { setPhotoInfo(photo) }} onMouseEnter={() => {setHoverPhoto(photo)}} onMouseLeave={() => setHoverPhoto(false)}>
            <img src={photo.url} style={{ width: '90%' }} alt={photo.url} />
        </div>
    )
}
