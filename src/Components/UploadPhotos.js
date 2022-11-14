import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function UploadPhotos({setPhotoFiles}) {
    const navigate = useNavigate()
    const selectNewPhotos = (e) => {
		setPhotoFiles([...e.target.files])
	}
    return (
        <div className='upload-photos'>
            <input type='file' multiple accept='image/*, .heic' onChange={(e) => {
                selectNewPhotos(e)
                navigate('/')
                }}></input>
        </div>
    )
}

// https://stackoverflow.com/questions/57127365/make-html5-filereader-working-with-heic-files
