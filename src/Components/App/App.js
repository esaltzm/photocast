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
		const getWeather = async (time, lat, long) => {
			let weather
			const url = `https://skyscan-backend.herokuapp.com/photocast/${time}/${lat}/${long}`
			const res = await axios.get(url)
			console.log(res)
			return res.data
		}

		if (!photoFiles || !photoFiles.length) return
		const newPhotoURLs = []
		const getDataURLs = async () => {
			for (const photo of photoFiles) {
				const url = URL.createObjectURL(photo)
				const exif = await getEXIF(url)
				const lat = exif['tags']['GPSLatitude']
				const long = exif['tags']['GPSLongitude']
				const unixTime = exif['tags']['DateTimeOriginal']
				const date = new Date(unixTime * 1000)
				const formattedDate = getFormattedDate(date).replaceAll(' ', '-').replaceAll(/\:.*$/g, '')
				let weather, data
				lat && long && formattedDate ?
					weather = await getWeather(unixTime, lat, long) :
					setNoData(noData => noData + 1)
				if (weather) {
					weather = weather[0]
					data = {
						unixTime: unixTime,
						date: date.toLocaleDateString('en-US', { timezone: tzlookup(lat, long) }),
						time: date.toLocaleTimeString('en-US', { timezone: tzlookup(lat, long) }),
						lat: lat,
						long: long,
						alt: Math.floor(exif['tags']['GPSAltitude'] * 3.28084),
						temp: weather['t'],
						precip: weather['prate'],
						gust: weather['gust'],
						sde: weather['sde'],
						ltng: weather['ltng']
					}
					console.log('photo data: ', data)
				}
				if (data) setPhotoURLS(photoURLs => [...photoURLs, {
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