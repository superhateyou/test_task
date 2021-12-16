import { IsLogged } from '../../api/checker'
import { useLocation } from 'react-router-dom'

const Info = ({user}) => {
    const locationId = useLocation().pathname;

    return (
        <div>
            <div>{IsLogged(user, locationId)}</div>
            Info content
        </div> 
    )
}

export default Info