import styles from './MainPage.module.css'
import main_image from '../../picture/main_picture.png'

const MainPage = () => {
    return (
        <div className={styles.content}>
            <div className={styles.background}>
                <img src={main_image} alt="alt" className={styles.main_image} />
                <div className={styles.front_text}>WELCOME</div>
            </div>
        </div>
    )
}

export default MainPage