import React from 'react'

export default function Photo({ url, data }) {

    return (
        <div className='photo'>
            <img src={url} style={{ width: '400px' }} />
            <div className='metadata'>
                date: {data.date}<br />
                lat: {data.lat}<br />
                long: {data.long}<br /><br />
                altitude: {data.alt}<br />
                temp: {data.temp}<br/>
                windchill: {data.windchill}<br/>
                precipitation: {data.precip}<br/>
                humidity: {data.humidity}<br/>
                wind gust speed: {data.gust}<br/>
                visibility: {data.vis}<br/>
            </div>
        </div>
    )
}
