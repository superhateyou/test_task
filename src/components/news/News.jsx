import { IsLogged } from '../../api/checker'
import { useLocation } from 'react-router-dom'

const News = ({user}) => {
    const locationId = useLocation().pathname;
    
    return (
        <div>
            News content
            <div>{IsLogged(user, locationId)}</div>
        </div>
        
    )
}

export default News