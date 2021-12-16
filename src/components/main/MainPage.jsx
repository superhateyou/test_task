import styles from './MainPage.module.css'
import main_image from '../../picture/main_picture.png'
import { IsLogged } from '../../api/checker'
import { useLocation } from 'react-router-dom'

const MainPage = ({user}) => {
    const locationId = useLocation().pathname;

    return (
        <div className={styles.content}>
            {IsLogged(user, locationId)}
            <div className={styles.background}>
                <img src={main_image} alt="alt" className={styles.main_image} />
                <div className={styles.front_text}>WELCOME</div>
            </div>
        </div>

    )
}

export default MainPage