
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function FixedNav(){

  const navigate = useNavigate()
  const API_URI = import.meta.env.VITE_API_URI

  const setCookie = (cookieName,value,daysToLive) => {
    const date = new Date()
    date.setTime(date.getTime() + (daysToLive * 24 * 60 * 60 * 1000))
    let expires = "expires=" + date.toUTCString()
    document.cookie = `${cookieName}=${value}; ${expires}; path=/`
  }

  const deleteCookie = (cookieName) => {
    setCookie(cookieName,null,0)
  }

  const logOut = () => {

    axios.get(`${API_URI}/auth/logout`)
        .then(res =>  {
            deleteCookie("token")
            deleteCookie("email")
            navigate("/")
        })
        .catch(err => {
          console.error(err)
    })

  }


  return (
    <div className="fixed z-10 w-screen backdrop-blur-lg bg-white">
        <div className="flex p-5 lg:p-8 justify-between items-center font-poppins">
        <h1 className="font-grand text-4xl text-orange-500">RandomRants</h1>
        <ul className="flex gap-5 lg:gap-10">
          <li onClick={logOut} className="font-bold cursor-pointer p-2 bg-orange-400 text-white rounded-md">Logout</li>
        </ul>
    </div>
    </div>
  )
}
