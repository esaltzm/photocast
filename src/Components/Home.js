import React, {useEffect, useState} from 'react'
import Photo from './Photo'

export default function Home({photoURLs}) {
    return (
        photoURLs &&
        <div>
            {photoURLs.map(img => <Photo url={img.url} data={img.data['tags']}/>)}
        </div>
    )
}
