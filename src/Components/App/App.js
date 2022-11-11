import './App.css'
import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import heic2any from 'heic2any'
import exifParser from 'exif-parser'
import Header from '../Header'
import Home from '../Home'
import About from '../About'
import UploadPhotos from '../UploadPhotos'

export default function App() {

	// const [photos, setPhotos] = useState(JSON.parse(localStorage.getItem('photos-list')))
	// const [photoURLs, setPhotoURLS] = useState(JSON.parse(localStorage.getItem('urls-list')))
	const [photos, setPhotos] = useState([])
	const [photoURLs, setPhotoURLS] = useState([])

	useEffect(() => {
		if (!photos || !photos.length) return
		const newPhotoURLs = []
		const convertURLs = async () => {
			for (const photo of photos) {
				const url = URL.createObjectURL(photo)
				if (photo.type === 'image/heic') {
					const photoData = await convertPhoto(url)
					console.log('photo data', photoData)
					newPhotoURLs.push(photoData)
				} else {
					const ab = await getArrayBuffer(url)
					const parser = exifParser.create(ab)
					const result = parser.parse()
					console.log('result:', result)
					newPhotoURLs.push(url)
				}
			}
			setPhotoURLS(newPhotoURLs)
		}
		convertURLs()
		// localStorage.setItem('urls-list', JSON.stringify(photoURLs))
		// localStorage.setItem('photos-list', JSON.stringify(photos))
	}, [photos])



	const selectNewPhotos = (e) => {
		setPhotos([...e.target.files])
	}

	const getArrayBuffer = async (url) => {
		const res = await fetch(url)
		const blob = await res.blob()
		return await blob.arrayBuffer()
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
				<Route path='/' element={<Home photoURLs={photoURLs} />} />
				<Route path='/about' element={<About />} />
				<Route path='/upload-photos' element={<UploadPhotos selectNewPhotos={selectNewPhotos} />} />
			</Routes>
		</div>
	)
}

// 	const menuItems = ['Home', 'About', 'Upload Photos']
// {{menuItems.map(item => <Route path={'/' + item.toLowerCase().replace(' ','-')} element={item } key={item} element={<Item/>}/>)}}
// Is this possible? dynamic components within react router?

// Source https://medium.com/geekculture/how-to-upload-and-preview-images-in-react-js-4e22a903f3db