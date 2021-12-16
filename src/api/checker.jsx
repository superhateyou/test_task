import { Navigate } from "react-router-dom";

export const IsLogged = (user, locationId) => {
  if (user === null) {
    if (locationId !== '/registration' && locationId !== '/login') {
      return <Navigate to="/registration" />
    }
  } else {
    if (locationId === '/registration' || locationId === '/login') {
      return <Navigate to="/" />
    }
  }
}