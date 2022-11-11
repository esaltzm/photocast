import React, {useEffect, useState} from 'react'
import Photo from './Photo'

export default function Home({photoURLs}) {
    return (
        <div>
            {photoURLs.map(url => <Photo url={url}/>)}
        </div>
    )
}
