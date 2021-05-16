import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux' // redux Connect mapStateToProps

import { auth } from '../../firebase/firebase.utils'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component'
import {ReactComponent as Logo} from '../../asset/crown.svg'

import './header.style.scss'
const Header = ({ currentUser, hidden }) =>(
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
            <CartIcon/> 
        </div>
        { hidden ? null : <CartDropDown />}
    </div>
)
const mapStateToProps = ({ user: {currentUser }, cart: {hidden}}) =>({
    currentUser,
    hidden
})
export default connect(mapStateToProps)(Header)
