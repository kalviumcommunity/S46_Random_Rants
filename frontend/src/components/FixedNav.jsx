
import { Link } from "react-router-dom"

export default function FixedNav(){

  return (
    <div className="fixed z-10 w-screen backdrop-blur-lg bg-white">
        <div className="flex p-5 lg:p-8 justify-between items-center font-poppins">
        <h1 className="font-grand text-4xl text-orange-500">RandomRants</h1>
        <ul className="flex gap-5 lg:gap-10">
          <Link to="/auth/logout">
            <li className="font-bold cursor-pointer p-2 bg-orange-400 text-white rounded-md">Logout</li>
          </Link>
        </ul>
    </div>
    </div>
  )
}
