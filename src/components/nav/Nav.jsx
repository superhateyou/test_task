import { Link, useLocation } from 'react-router-dom';
import styles from './Nav.module.css';

const Nav = () => {
    const locationId = useLocation().pathname;
    return  (
    <nav className={styles.nav}>
        <div className={styles.link_container}>
            <Link to="/" className={locationId === "/" ? styles.activeLink : styles.item}>Main</Link>
        </div >
        <div className={styles.link_container}>
            <Link to="/news" className={locationId === "/news" ? styles.activeLink : styles.item}>News</Link>
        </div>
        <div className={styles.link_container}>
            <Link to="/info" className={locationId === "/info" ? styles.activeLink : styles.item}>Info</Link>
        </div >
    </nav>
    )
}

export default Nav