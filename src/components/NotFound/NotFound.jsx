import styles from './NotFound.module.css'
import { IsLogged } from '../../api/checker'
import { Link, useLocation } from 'react-router-dom'

const NotFound = ({user}) => {
    const locationId = useLocation().pathname;

    return (
        <div className={styles.content}>
             {IsLogged(user, locationId)}
            <h2>404 page not found</h2>
            <p>Page does not exist</p>
            <Link to="/">Return to Main page</Link>
        </div>
    )
}

export default NotFound