

export default function Navbar() {
  return (
    <div className="flex p-4 lg:p-8 justify-between items-center font-poppins">
        <h1 className="font-grand text-4xl text-orange-500 lg:fixed">RandomRants</h1>
        <ul className="flex gap-5 lg:gap-10 lg:ml-[28rem]">
            <li className="font-bold">Home</li>
            <li className="font-bold">Login</li>
        </ul>
    </div>
  )
}

