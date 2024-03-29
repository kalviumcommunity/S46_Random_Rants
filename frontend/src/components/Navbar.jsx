import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <div className="flex p-4 lg:p-8 justify-between items-center font-poppins">
        <h1 className="font-grand text-4xl text-orange-500">RandomRants</h1>
        <ul className="flex gap-5 lg:gap-10">
            <Link to="/">
              <li className="font-bold cursor-pointer">Home</li>
            </Link>
            <Link to="/auth/login">
              <li className="font-bold cursor-pointer">Login</li>
            </Link>
        </ul>
    </div>
  )
}

