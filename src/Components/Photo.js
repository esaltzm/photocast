import React, { useEffect, useState } from 'react'

export default function Photo({ photo, setPhotoInfo }) {
    return (
        <div className='photo' onClick={() => { setPhotoInfo(photo) }}>
            <img src={photo.url} style={{ height: '90%' }} alt={photo.url} />
        </div>
    )
}
