import { Link } from 'react-router-dom'
import React from 'react'

const header = () => {
    return (
        <div>
            <Link to='/'>Streamers</Link>
            <Link to ='/'>All Streams</Link>
        </div>
    )
}
export default header
