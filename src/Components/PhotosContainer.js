import React from 'react'
import Photo from './Photo'

export default function PhotosContainer({photoURLs, setPhotoInfo}) {
    return (
        <div className='photos-container'>
            {photoURLs.map(photo => <Photo photo={photo} setPhotoInfo={setPhotoInfo} key={photo.url} />)}
        </div>
    )
}
