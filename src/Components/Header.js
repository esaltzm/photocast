import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <div className='header'>
            <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'-20px'}}>
                <h1>Photo<span id='cast'>Cast</span></h1>
                <img src='/logo.png' style={{height: '100px' }} />
            </div>
            <h4 style={{fontStyle:'italic', fontWeight:'normal'}}>Remember the moments behind your photos, rain or shine</h4>
            <nav>
                <Link to='/'>Home</Link>
                <div>⚡</div>
                <Link to='/about'>About</Link>
                <div>❄️</div>
                <Link to='/upload-photos'>Upload Photos</Link>
            </nav>
        </div>
    )
}
