import React from 'react'
import {Link} from 'react-router-dom'

export default function Header() {
    return (
        <div className='header'>
            <h1>Weather Photo App</h1>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/upload-photos'>Upload Photos</Link>
            </nav>
        </div>
    )
}
