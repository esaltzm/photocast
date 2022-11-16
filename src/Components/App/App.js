// TO DO
// - Fix date/time
// - Check that hour filter selects correct hour
// - Fix noData counter
// - add landing page directing user to upload photos (conditional rendering in home element)
// - style
// - about page
// - add drag and drop for files
// - prevent map pins from getting stuck on hover

import './App.css'
import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import heic2any from 'heic2any'
import exifParser from 'exif-parser'
import axios from 'axios'
import Header from '../Header'
import Home from '../Home'
import About from '../About'
import UploadPhotos from '../UploadPhotos'
import tzlookup from 'tz-lookup'

export default function App() {

	const [photoFiles, setPhotoFiles] = useState([])
	const [photoURLs, setPhotoURLS] = useState([])
	const [noData, setNoData] = useState(0) // number of photos without sufficient exif data
	const [photoInfo, setPhotoInfo] = useState(false)

	useEffect(() => {
		const getWeather = async (lat, long, date) => {
			let weather
			const url = `http://api.weatherapi.com/v1/history.json?key=e4ce4b302ac14356b0f162359221011&q=${lat},${long}&dt=${date}`
			try {
				const res = await axios.get(url)
				weather = res.data['forecast']['forecastday'][0]['hour']
				return weather
			} catch (err) {
				setNoData(noData + 1)
				console.error('nodata: ', noData)
			}
		}
		if (!photoFiles || !photoFiles.length) return
		const newPhotoURLs = []
		const getDataURLs = async () => {
			for (const photo of photoFiles) {
				const url = URL.createObjectURL(photo)
				const exif = await getEXIF(url)
				const lat = exif['tags']['GPSLatitude']
				const long = exif['tags']['GPSLongitude']
				const millis = exif['tags']['DateTimeOriginal'] * 1000
				const date = new Date(millis)
				const formattedDate = getFormattedDate(date)
				const weather = await getWeather(lat, long, formattedDate)
				let data = undefined
				if (weather) {
					const weatherHour = weather.filter((hour, i) => {
						if (i !== weather.length - 1) {
							return hour['time_epoch'] < millis && weather[i + 1]['time_epoch'] > millis
						} else return true
					})[0]
					// ^ check if this is working ^
					data = {
						date: date.toLocaleDateString('en-US', { timezone: tzlookup(lat, long) }),
						time: date.toLocaleTimeString('en-US', { timezone: tzlookup(lat, long) }),
						lat: lat,
						long: long,
						alt: Math.floor(exif['tags']['GPSAltitude'] * 3.28084),
						temp: weatherHour['temp_f'],
						windchill: weatherHour['windchill_f'],
						precip: weatherHour['precip_in'],
						humidity: weatherHour['humidity'],
						gust: weatherHour['gust_mph'],
						vis: weatherHour['vis_miles']
					}
				}
				if (data) newPhotoURLs.push({ // only render photos with sufficient exif data
					url: url,
					data: data
				})
			}
			setPhotoURLS(newPhotoURLs)
		}
		getDataURLs()
	}, [photoFiles])

	const getFormattedDate = (date) => {
		const year = date.getFullYear()
		let month = (1 + date.getMonth()).toString()
		month = month.length > 1 ? month : '0' + month
		let day = date.getDate().toString()
		day = day.length > 1 ? day : '0' + day
		return year + ' ' + month + ' ' + day
	}

	const getEXIF = async (url) => {
		const res = await fetch(url)
		const blob = await res.blob()
		const ab = await blob.arrayBuffer()
		const parser = exifParser.create(ab)
		return parser.parse()
	}

	return (
		<div className='App'>
			<Header />
			<Routes>
				<Route path='/' element={<Home photoURLs={photoURLs} setPhotoURLS={setPhotoURLS} noData={noData} photoInfo={photoInfo} setPhotoInfo={setPhotoInfo} />} />
				<Route path='/about' element={<About />} />
				<Route path='/upload-photos' element={<UploadPhotos setPhotoFiles={setPhotoFiles} />} />
			</Routes>
		</div>
	)
}

// Source https://medium.com/geekculture/how-to-upload-and-preview-images-in-react-js-4e22a903f3db