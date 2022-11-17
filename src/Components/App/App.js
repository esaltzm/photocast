// TO DO
// - Gradient key
// - style
// - about page
// - explain no exif data in about page, add link in noData counter => what does this mean?
// - add drag and drop for files
// - prevent map pins from getting stuck on hover
// - conditional styling of photos in photoinfobox based on dimensions
// - update readme
// - make information flow diagram

import './App.css'
import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import exifParser from 'exif-parser'
import tzlookup from 'tz-lookup'
import axios from 'axios'
import Header from '../Header'
import Home from '../Home'
import About from '../About'
import UploadPhotos from '../UploadPhotos'

export default function App() {

	const [photoFiles, setPhotoFiles] = useState([])
	const [photoURLs, setPhotoURLS] = useState([])
	const [noData, setNoData] = useState(0)
	const [photoInfo, setPhotoInfo] = useState(false)

	useEffect(() => {
		const getWeather = async (lat, long, date) => {
			let weather
			const url = `api.weatherapi.com/v1/history.json?key=e4ce4b302ac14356b0f162359221011&q=${lat},${long}&dt=${date}`
			console.log(url)
			const res = await axios.get(url)
			weather = res.data['forecast']['forecastday'][0]['hour']
			return weather
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
				const formattedDate = getFormattedDate(date).replaceAll(' ','-')
				let weather, data
				lat && long && formattedDate ?
					weather = await getWeather(lat, long, formattedDate) :
					setNoData(noData => noData + 1)
				if (weather) {
					const index = parseInt(date.toLocaleTimeString('en-US', { timezone: tzlookup(lat, long) }).slice(0, 2))
					const weatherHour = weather[index]
					data = {
						millis: millis,
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
				if (data) setPhotoURLS(photoURLs => [...photoURLs,{
					url: url,
					data: data
				}])
			}
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
				<Route path='/' element={<Home photoURLs={photoURLs} setPhotoURLS={setPhotoURLS} noData={noData} photoInfo={photoInfo} setPhotoInfo={setPhotoInfo} photoFiles={photoFiles} />} />
				<Route path='/about' element={<About />} />
				<Route path='/upload-photos' element={<UploadPhotos setPhotoFiles={setPhotoFiles} />} />
			</Routes>
		</div>
	)
}