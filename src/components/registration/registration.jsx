import { useEffect, useState } from 'react'
import styles from './registration.module.css'
import { Link, useLocation } from 'react-router-dom'
import { SignUp } from '../../api/api'
import Cookie from 'js-cookie'
import { IsLogged } from '../../api/checker'

const Registration = ({setUser, user}) => {
    const locationId = useLocation().pathname;

    const [login, setLogin] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirm, setPassword_confirm] = useState('')

    const [loginDirty, setLoginDirty] = useState(false) //стейты для добавления текста ошибки для блюра
    const [nameDirty, setNameDirty] = useState(false)
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [password_confirmDirty, setPassword_confirmDirty] = useState(false)

    const [loginError, setLoginError] = useState('Incorrect login') //текста ошибок
    const [nameError, setNameError] = useState('Incorrect name')
    const [emailError, setEmailError] = useState('Incorrect e-mail')
    const [passwordError, setPasswordError] = useState('Incorrect password')
    const [password_confirmError, setPassword_confirmError] = useState('Incorrect password')

    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if (emailError || passwordError || nameError || password_confirmError || loginError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError, password_confirmError, nameError, loginError]
    )

    const loginHandler = (e) => { //обработчик валидности для логина
        setLogin(e.target.value)
        if (!e.target.value.match(/^[a-zA-Z0-9]+$/)) {
            setLoginError('Login must consist only of letters of the Latin alphabet and numbers')
        } else if (e.target.value.length < 6) {
            setLoginError('Login is too short')
        } else if (e.target.value.length > 12) {
            setLoginError('Login is too long')
        } else {
            setLoginError('')
        }
    }

    const nameHandler = (e) => { //обработчик валидности для имени
        setName(e.target.value)
        if (!e.target.value.match(/^[a-zA-Z_ ]*$/) && !e.target.value.match(/^[А-Я]$/)) {
            setNameError('Name entered incorrectly')
        } else if ((e.target.value.length !== 2)) {
            setNameError('Name must be 2 characters long')
        } else {
            setNameError('')
        }
    }

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
        } else if (e.target.value !== password_confirm) {
            setPasswordError('Password mismatch')
        } else {
            setPasswordError('')
        }
    }

    const passwordConfirmHandler = (e) => { //обработчик валидности для подтверждения пароля
        setPassword_confirm(e.target.value)
        if (!e.target.value.match(/^[a-zA-Z0-9]+$/)) {
            setPasswordError('Password must consist only of letters of the Latin alphabet and numbers')
        } else if (e.target.value.length < 6 || e.target.value.length > 12) {
            setPassword_confirmError('Password must be 6 to 12 characters long')
        } else if (e.target.value !== password) {
                setPasswordError('Password mismatch')
        } else {
            setPasswordError('')
            setPassword_confirmError('')
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
            case 'password_confirm':
                setPassword_confirmDirty(true)
                break
            case 'nameField':
                setNameDirty(true)
                break
            case 'login':
                setLoginDirty(true)
                break
            default:
                break
        }
    }

    const SubmitSignUp = async (e) =>{
        e.preventDefault()
        SignUp(login, name, email, password)
        .then(res => res.json())
        .then(data => {if(data.user) setUser(data)
        Cookie.set('token', data.user.token, {expires: 1/96})})
    }

    return (
        <div className={styles.background}>
            <div className={styles.content}>
                <form className={styles.regForm}>
                    <h1>Sign up</h1>
                    {IsLogged(user, locationId)}
                    {(loginDirty && loginError) && <div className={styles.warnings} style={{ color: 'red' }}>{loginError}</div>}
                    <input onBlur={e => blurHandler(e)} onChange={e => loginHandler(e)} name="login" value={login} type="text" placeholder="Enter your login..." />
                    {(nameDirty && nameError) && <div className={styles.warnings} style={{ color: 'red' }}>{nameError}</div>}
                    <input onBlur={e => blurHandler(e)} onChange={e => nameHandler(e)} name="nameField" value={name} type="text" placeholder="Enter your name..." />
                    {(emailDirty && emailError) && <div className={styles.warnings} style={{ color: 'red' }}>{emailError}</div>}
                    <input onBlur={e => blurHandler(e)} onChange={e => emailHandler(e)} name="email" value={email} type="text" placeholder="Enter your E-mail..." />
                    {(passwordDirty && passwordError) && <div className={styles.warnings} style={{ color: 'red' }}>{passwordError}</div>}
                    <input onBlur={e => blurHandler(e)} onChange={e => passwordHandler(e)} name="password" value={password} type="password" placeholder="Enter your password..." />
                    {(password_confirmDirty && password_confirmError) && <div className={styles.warnings} style={{ color: 'red' }}>{password_confirmError}</div>}
                    <input onBlur={e => blurHandler(e)} onChange={e => passwordConfirmHandler(e)} name="password_confirm" value={password_confirm} type="password" placeholder="Confirm password..." />
                    <button disabled={!formValid} onClick={SubmitSignUp} type="submit">Registation</button>
                    <Link to="/login">Already registered? Sign in</Link>
                </form>
            </div>
        </div>
    )
}

export default Registration