import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


export default function Loading() {

    const navigate = useNavigate()

    const setCookie = (cookieName,value,daysToLive) => {
      const date = new Date()
      date.setTime(date.getTime() + (daysToLive * 24 * 60 * 60 * 1000))
      let expires = "expires=" + date.toUTCString()
      document.cookie = `${cookieName}=${value}; ${expires}; path=/`
    }
  
    const deleteCookie = (cookieName) => {
      setCookie(cookieName,null,0)
    }

    useEffect(() => {
      axios.get("http://localhost:3000/auth/logout")
        .then(res =>  {
            deleteCookie("token")
            deleteCookie("email")
            navigate("/")
        })
        .catch(err => console.error(err))
    },[])

  return (
    <div className="flex flex-col justify-center items-center h-[100dvh]">
        <div className="size-20 border-[12px] border-t-orange-500 rounded-full animate-spin"></div>
    </div>
  )
}
