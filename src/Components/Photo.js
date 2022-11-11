import React from 'react'

export default function Photo({ url }) {
    return (
        <div className='photo'>
            <img src={url} style={{ width: '400px' }} />
            <div className='metadata'>
                
            </div>
        </div>
    )
}
