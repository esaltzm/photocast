import './App.css'
import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from '../Header'
import Home from '../Home'
import About from '../About'
import UploadPhotos from '../UploadPhotos'

export default function App() {

	return (
		<div className='App'>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route path='/upload-photos' element={<UploadPhotos />} />
			</Routes>
		</div>
	)
}

// 	const menuItems = ['Home', 'About', 'Upload Photos']
// {{menuItems.map(item => <Route path={'/' + item.toLowerCase().replace(' ','-')} element={item } key={item} element={<Item/>}/>)}}
// Is this possible? dynamic components within react router?