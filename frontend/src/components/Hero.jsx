import banner from "../assets/banner.jpg"
import Navbar from "./Navbar"

export default function Hero() {
  return (
    <>
    <div className="flex">
        <div >
            <Navbar/>
            <div className="flex flex-col gap-10 justify-center px-8 py-40 font-poppins">
                <h1 className="w-[30rem] text-6xl font-bold"> <span className="text-transparent bg-clip-text font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-orange-500">Untangle</span> your Random Thoughts.</h1>
                <p className="text-xl">It can be anything literally from silly or funny to pondering about meaning of life.</p>
                <button className="p-2 border-2 border-black w-24 font-bold">Sign Up</button>
            </div>
        </div>
        <div>
            <img className="h-[100dvh]" src={banner} alt="" />
        </div>
    </div>
    </>
  )
}
