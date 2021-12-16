import Nav from '../nav/Nav';
import styles from './Header.module.css'
import Cookie from 'js-cookie'

const Header = ({setUser}) => {
    const ClickLogOut = () => {
        Cookie.remove('token') 
        setUser(null)
    }

    return (
        <div className={styles.header}>
            <h1 className={styles.logo}>LOGO</h1>
            <Nav />
            <button className={styles.logOutButton} onClick={ClickLogOut} type="button">Log out</button>
        </div>
    )
}

export default Header;