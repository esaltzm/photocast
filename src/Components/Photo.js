import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { DateTime } from 'luxon'


export default function Photo({ url, data }) {

    // const [tz, setTZ] = useState('')
    // useEffect(() => {
    //     fetch(`https://api.wheretheiss.at/v1/coordinates/${data['GPSLatitude']},${data['GPSLongitude']}`)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         setTZ(data['timezone_id'])
    //         console.log(data['timezone_id'])
    //     })
    // },[])
    
    // const dateTime = DateTime.fromMillis(data['DateTimeOriginal'] * 1000).setZone('America/Denver').toISO()

    const [weather, setWeather] = useState([])
    const lat = data['GPSLatitude']
    const long = data['GPSLongitude']
    const millis = data['DateTimeOriginal'] * 1000
    const getFormattedDate = (date) => {
        const year = date.getFullYear()
        let month = (1 + date.getMonth()).toString()
        month = month.length > 1 ? month : '0' + month
        let day = date.getDate().toString()
        day = day.length > 1 ? day : '0' + day
        return year + ' ' + month + ' ' + day
    }
    const date = getFormattedDate(new Date(millis))

    useEffect(() => {
        const getWeather = async (lat, long, date) => {
            let weather
            const url = `http://api.weatherapi.com/v1/history.json?key=e4ce4b302ac14356b0f162359221011&q=${lat},${long}&dt=${date}`
            try {
                const res = await axios.get(url)
                weather = res.data['forecast']['forecastday'][0]['hour']
                setWeather(weather)
            } catch (err) {
                console.error(err)
            }
        }
        getWeather(lat,long,date)
    }, [])

    const weatherHour = weather.filter((hour, i) => {
        if(i !== weather.length - 1) {
            return hour['time_epoch'] < millis && weather[i+1]['time_epoch'] > millis
        } else {
            return true
        }
    })[0]

    return (
        weather.length && <div className='photo'>
            <img src={url} style={{ width: '400px' }} />
            <div className='metadata'>
            time: {date}<br/>
            lat: {data['GPSLatitude']}<br/>
            long: {data['GPSLongitude']}<br/>
            altitude: {data['GPSAltitude']}<br/>
            temp: {weatherHour['temp_f']}<br/>
            windchill: {weatherHour['windchill_f']}<br/>
            precipitation: {weatherHour['precip_in']}<br/>
            humidity: {weatherHour['humidity']}<br/>
            wind gust speed: {weatherHour['gust_mph']}<br/>
            visibility: {weatherHour['vis_miles']}<br/>
            </div>
        </div>
    )
}
