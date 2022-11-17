import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <div className='header'>
            <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'-20px'}}>
                <h1>Photo<span id='cast'>Cast</span></h1>
                <img src='/logo.png' style={{height: '100px' }} />
            </div>
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
