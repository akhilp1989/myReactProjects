import React from './node_modules/react'
import {Link} from './node_modules/react-router-dom'
import UserPosts from '../../Components/UserPosts'
import './header.styles.scss'

export const Header = () => {
 const loggedInUser=localStorage.getItem('email')
  return (
    <div>
      <div className='header'>
        <Link className='logo-container' to='/'>
          Home
              </Link>
              <div className='options'>
                <Link className='option' to='/friend'>
            Friends
        </Link>
        {loggedInUser ? <button onClick={()=>localStorage.removeItem('email')}>LogOut </button> : (
          <Link to='/login'>  Login /Sign Up</Link>)}
      </div>  
      </div>
      <UserPosts />
      </div>
    
     
   )
}