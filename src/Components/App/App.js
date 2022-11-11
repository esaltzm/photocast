import './App.css'
import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import heic2any from 'heic2any'
import Header from '../Header'
import Home from '../Home'
import About from '../About'
import UploadPhotos from '../UploadPhotos'

export default function App() {
	const [photos, setPhotos] = useState([])
	const [photoURLs, setPhotoURLS] = useState([])
	const [newPhotos, setNewPhotos] = useState(false)

	useEffect(() => {
		if (!photos.length) return
		// const newPhotoURLs = photos.map(async photo => {
		// 	const url = URL.createObjectURL(photo)
		// 	if (photo.type === 'image/heic') {
		// 		const photoData = await convertPhoto(url)
		// 		console.log('photo data', photoData)
		// 		return photoData
		// 	}
		// 	return url
		// })
		const newPhotoURLs = []
		const doit = async () => {
			for (const photo of photos) {
				const url = URL.createObjectURL(photo)
				if (photo.type === 'image/heic') {
					const photoData = await convertPhoto(url)
					console.log('photo data', photoData)
					newPhotoURLs.push(photoData)
				} else {
					newPhotoURLs.push(url)
				}
			}
			setPhotoURLS(newPhotoURLs)
		}
		doit()
	}, [photos])

	const selectNewPhotos = (e) => {
		setPhotos([...e.target.files])
	}

	const convertPhoto = async (url) => {
		const res = await fetch(url)
		const blob = await res.blob()
		const convertedBlob = await heic2any({ blob })
		return await blobToBase64(convertedBlob)
	}

	async function blobToBase64(blob) {
		return new Promise((resolve, _) => {
			const reader = new FileReader()
			reader.onloadend = () => resolve(reader.result)
			reader.readAsDataURL(blob)
		});
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