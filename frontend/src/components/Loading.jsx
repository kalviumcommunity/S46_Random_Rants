import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


export default function Loading() {

    const navigate = useNavigate()

    useEffect(() => {
      setTimeout(() => {
        navigate("/")
      },2000)  
    })

  return (
    <div className="flex flex-col justify-center items-center h-[100dvh]">
        <div className="size-20 border-[12px] border-t-orange-500 rounded-full animate-spin"></div>
    </div>
  )
}
