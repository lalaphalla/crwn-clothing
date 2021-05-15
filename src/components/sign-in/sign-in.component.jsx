import React from 'react'

import FormInput from '../../components/form-input/form-input.component'
import CustomButton from '../../components/custom-button/custom-button.component'
import {auth, signInWithGoogle} from '../../firebase/firebase.utils'

import './sign-in.style.scss'

class SignIn extends React.Component {
    constructor(props){
        super()

        this.state = { 
            email: '',
            password: ''
        }
    }
    handleSubmit  = async event =>{
        event.preventDefault();

        const { email, password} = this.state

        try{
            await auth.signInWithEmailAndPassword(email, password)
            this.setState({ email : '', password : ''})
        } catch (error){
            console.log(error);
        }

    }
    
    handleChange = async event =>{
        const  { value, name } = event.target;

        this.setState({ [name] : value})
    }

    render(){
        return(
            <div className='sign-in'>
                <h2> I already have account </h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name='email' label='Email' type='email' value={this.state.email} handleChange={this.handleChange} required/>
                    <FormInput name='password' label='Password' type='password' value={this.state.password} handleChange={this.handleChange} required/>
                    <div className='buttons'>
                    <CustomButton type='submit'>Sign In</CustomButton>
                    <CustomButton  isGoogleSignIn onClick={signInWithGoogle} >SIGN IN with Google</CustomButton>  
                    </div>
                    
                </form>
            </div>
        )
    }
}

export default SignIn;