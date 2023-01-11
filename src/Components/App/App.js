import './App.css'
import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import exifr from 'exifr'
import heic2any from 'heic2any'
import tzlookup from 'tz-lookup'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
			const url = `https://skyscan-backend.herokuapp.com/photocast/${time}/${lat}/${long}`
			const res = await axios.get(url)
			return res.data
		}

		const blobToBase64 = async (blob) => {
			return new Promise((resolve, _) => {
				const reader = new FileReader()
				reader.onloadend = () => resolve(reader.result)
				reader.readAsDataURL(blob)
			})
		}

		const convertPhoto = async (url) => {
			const res = await fetch(url)
			const blob = await res.blob()
			const convertedBlob = await heic2any({ blob })
			return await blobToBase64(convertedBlob)
		}

		if (!photoFiles.length) return

		if (photoFiles[0].type === 'image/heic') toast.warning('You have uploaded an HEIC image, these may take longer to process.')

		const getDataURLs = async () => {

			const getDecimalDegrees = (arr) => {
				return arr ? arr[0] + arr[1] / 60 + arr[2] / 3600 : setNoData(noData + 1)
			}

			for (const photo of photoFiles) {
				const exif = await exifr.parse(photo)
				const lat = getDecimalDegrees(exif['GPSLatitude'])
				const long = getDecimalDegrees(exif['GPSLongitude']) * -1
				const date = new Date(exif['DateTimeOriginal'])
				const unixTime = date.getTime() / 1000
				// const formattedDate = getFormattedDate(date).replaceAll(' ', '-').replaceAll(/\:.*$/g, '')
				if (lat && long) {
					const weather = await getWeather(unixTime, lat, long)
					const data = {
						unixTime: unixTime,
						date: date.toLocaleDateString('en-US', { timezone: tzlookup(lat, long) }),
						time: date.toLocaleTimeString('en-US', { timezone: tzlookup(lat, long) }),
						lat: lat,
						long: long,
						alt: Math.floor(exif['GPSAltitude'] * 3.28084),
						temp: weather['t'],
						precip: weather['prate'],
						gust: weather['gust'],
						sde: weather['sde'],
						ltng: weather['ltng']
					}
					let url = URL.createObjectURL(photo)
					if (photo.type === 'image/heic') {
						url = await convertPhoto(url)
					}
					setPhotoURLS(photoURLs => [...photoURLs, {
						url: url,
						data: data
					}])
				}
			}
		}
		getDataURLs()
	}, [photoFiles])

	return (
		<div className='App'>
			<ToastContainer
				autoClose={5000}
			/>
			<Header />
			<Routes>
				<Route path='/' element={<Home photoURLs={photoURLs} setPhotoURLS={setPhotoURLS} noData={noData} photoInfo={photoInfo} setPhotoInfo={setPhotoInfo} photoFiles={photoFiles} />} />
				<Route path='/about' element={<About />} />
				<Route path='/upload-photos' element={<UploadPhotos setPhotoFiles={setPhotoFiles} />} />
			</Routes>
		</div>
	)
}