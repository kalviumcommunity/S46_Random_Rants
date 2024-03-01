import banner from "../assets/banner.jpg"
import arrow from "../assets/arrow-down.png"
import Navbar from "./Navbar"
import Feed from "./Feed"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function Hero() {

  const navigate = useNavigate()

  const getCookie = (cookieName) => {

    const cDecoded = decodeURIComponent(document.cookie)
    const cArray = cDecoded.split("; ")
    let result;

    console.log(import.meta.env.VITE_API_URI)

    cArray.forEach(cookie => {
        if(cookie.indexOf(cookieName) == 0){
            result = cookie.substring(cookieName.length + 1)
        }
    })

    return result
}

  const handleScroll = () => {
    document.getElementById("feed").scrollIntoView({behavior:"smooth"})
  }

  useEffect(() => {
    if(getCookie("token")){
      navigate("/feed")
    }
  })

  return (
    <>
    <div className="flex lg:h-[100dvh]">
        <div >
            <Navbar/>
            <div className="flex flex-col gap-10 justify-center items-center text-center lg:text-left lg:items-start px-8 py-32 font-poppins bg-banner bg-cover bg-[35%] lg:bg-none h-[100dvh]">
                <h1 className="lg:w-[30rem] text-4xl lg:text-6xl font-bold"> <span className="text-transparent bg-clip-text font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-orange-500">Untangle</span> your Random Thoughts.</h1>
                <p className="text-xl">It can be anything literally from silly or funny to pondering about meaning of life.</p>
                <Link to="/auth/signup">
                  <button className="p-2 border-2 border-black w-24 font-bold">Sign Up</button>
                </Link>
            </div>
        </div>
        <div>
            <img className="h-screen w-[80dvw] hidden lg:block" src={banner} alt="image of thoughts being untangled" />
        </div>
        <img src={arrow} onClick={handleScroll} className="hidden lg:block absolute bottom-2 size-20 left-[47%] cursor-pointer animate-bounce" alt="arrow-down" />
    </div>
    <Feed/>
    </>
  )
}
