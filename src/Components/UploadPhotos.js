import React from 'react'

export default function UploadPhotos({selectNewPhotos}) {
    return (
        <div className='upload-photos'>
            <input type='file' multiple accept='image/*, .heic' onChange={selectNewPhotos}></input>
        </div>
    )
}

// https://stackoverflow.com/questions/57127365/make-html5-filereader-working-with-heic-files
