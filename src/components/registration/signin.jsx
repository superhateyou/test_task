import { useEffect, useState } from 'react'
import styles from './registration.module.css'
import { Link, useLocation } from 'react-router-dom'
import { SignIn } from '../../api/api'
import Cookie from 'js-cookie'
import { IsLogged } from '../../api/checker'

const SignInPage = ({setUser, user}) => {
    const locationId = useLocation().pathname;

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)


    const [emailError, setEmailError] = useState('Incorrect e-mail')
    const [passwordError, setPasswordError] = useState('Incorrect password')


    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if (emailError || passwordError ) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError]
    )


    const emailHandler = (e) => { //обработчик валидности для мэйла
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Incorrect E-mail')
        } else {
            setEmailError('')
        }
    }

    const passwordHandler = (e) => { //обработчик валидности для пароля
        setPassword(e.target.value)
        if (!e.target.value.match(/^[a-zA-Z0-9]+$/)) {
            setPasswordError('Password must consist only of letters of the Latin alphabet and numbers')
        } else if (e.target.value.length < 6 || e.target.value.length > 12) {
            setPasswordError('Password must be 6 to 12 characters long')
        } else {
            setPasswordError('')
        }
    }

    const blurHandler = (e) => { //обработчик блюра
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
            default:
                break
        }
    }


    const SubmitSignIn = async (e) =>{
        e.preventDefault()
        SignIn(email, password)
        .then(res => res.json())
        .then(data => {if(data.user) setUser(data)
        Cookie.set('token', data.user.token, {expires: 1/96})})
    }

    return (
        <div className={styles.background}>
            <div className={styles.content}>
                <form className={styles.regForm}>
                {IsLogged(user, locationId)}
                    <h1>Sign in</h1>
                    {(emailDirty && emailError) && <div className={styles.warnings} style={{ color: 'red' }}>{emailError}</div>}
                    <input onBlur={e => blurHandler(e)} onChange={e => emailHandler(e)} name="email" value={email} type="email" placeholder="Enter your E-mail..." />
                    {(passwordDirty && passwordError) && <div className={styles.warnings} style={{ color: 'red' }}>{passwordError}</div>}
                    <input onBlur={e => blurHandler(e)} onChange={e => passwordHandler(e)} name="password" value={password} type="password" placeholder="Enter your password..." />
                    <button disabled={!formValid} onClick={SubmitSignIn} type="submit">Sign in</button>
                    <Link to="/registration">Not registered yet? Sign up</Link>
                </form>
            </div>
        </div>
    )
}

export default SignInPage