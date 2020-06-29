import React from 'react'
import {Link} from 'react-router-dom'

import { auth } from '../../firebase/firebase.utils'

import {ReactComponent as Logo} from '../../asset/crown.svg'

import './header.style.scss'
const Header = ({ currentUser }) =>(
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/contact'>
                Contact
            </Link>
            {
                currentUser ?
                
                <div className='option' onClick={()=>auth.signOut()}>
                    Sign Out
                </div>
                :
                <Link className='option' to='/signin'>Sign In</Link>

            }
        </div>
    </div>
)

export default Header;
