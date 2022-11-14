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

export default function App() {

	const [photoFiles, setPhotoFiles] = useState([])
	const [photoURLs, setPhotoURLS] = useState([])
	const [noData, setNoData] = useState(0) // number of photos without sufficient exif data

	useEffect(() => {
		if (!photoFiles || !photoFiles.length) return
		const newPhotoURLs = []
		const getDataURLs = async () => {
			for (const photo of photoFiles) {
				const url = URL.createObjectURL(photo)
				const exif = await getEXIF(url)
				const lat = exif['tags']['GPSLatitude']
				const long = exif['tags']['GPSLongitude']
				const millis = exif['tags']['DateTimeOriginal'] * 1000
				const formattedDate = getFormattedDate(new Date(millis))
				const weather = await getWeather(lat, long, formattedDate)
				let data
				if(weather) {
					const weatherHour = weather.filter((hour, i) => {
						if (i !== weather.length - 1) {
							return hour['time_epoch'] < millis && weather[i + 1]['time_epoch'] > millis
						} else return true
					})[0]
					// ^ check if this is working ^
					data = {
						date: formattedDate,
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
				} else {
					data = undefined
				}
				if (photo.type === 'image/heic') {
					const photoData = await convertPhoto(url)
					const exif = await getEXIF(url)
					newPhotoURLs.push({
						url: photoData,
						data: data
					})
				} else {
					if(data) newPhotoURLs.push({ // only render photos with sufficient exif data
						url: url,
						data: data
					})
				}
			}
			setPhotoURLS(newPhotoURLs)
		}
		getDataURLs()
	}, [photoFiles])

	const getWeather = async (lat, long, date) => {
		let weather
		const url = `http://api.weatherapi.com/v1/history.json?key=e4ce4b302ac14356b0f162359221011&q=${lat},${long}&dt=${date}`
		try {
			const res = await axios.get(url)
			// if(res.headers.status === '')
			weather = res.data['forecast']['forecastday'][0]['hour']
			return weather
		} catch (err) {
			setNoData(noData + 1)
			console.error('nodata: ', noData)
		}
	}

	const getFormattedDate = (date) => {
		const year = date.getFullYear()
		let month = (1 + date.getMonth()).toString()
		month = month.length > 1 ? month : '0' + month
		let day = date.getDate().toString()
		day = day.length > 1 ? day : '0' + day
		return year + ' ' + month + ' ' + day
	}

	const getArrayBuffer = async (url) => {
		const res = await fetch(url)
		const blob = await res.blob()
		return await blob.arrayBuffer()
	}

	const getEXIF = async (url) => {
		const res = await fetch(url)
		const blob = await res.blob()
		const ab = await blob.arrayBuffer()
		const parser = exifParser.create(ab)
		return parser.parse()
	}

	const convertPhoto = async (url) => {
		const res = await fetch(url)
		const blob = await res.blob()
		const convertedBlob = await heic2any({ blob })
		return await blobToBase64(convertedBlob)
	}

	const blobToBase64 = async (blob) => {
		return new Promise((resolve, _) => {
			const reader = new FileReader()
			reader.onloadend = () => resolve(reader.result)
			reader.readAsDataURL(blob)
		})
	}

	return (
		<div className='App'>
			<Header />
			<Routes>
				<Route path='/' element={<Home photoURLs={photoURLs} setPhotoURLS={setPhotoURLS} noData={noData}/>} />
				<Route path='/about' element={<About />} />
				<Route path='/upload-photos' element={<UploadPhotos setPhotoFiles={setPhotoFiles}/>} />
			</Routes>
		</div>
	)
}

// Source https://medium.com/geekculture/how-to-upload-and-preview-images-in-react-js-4e22a903f3db