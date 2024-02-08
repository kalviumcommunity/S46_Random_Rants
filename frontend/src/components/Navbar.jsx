

export default function Navbar() {
  return (
    <div className="flex p-8 justify-between items-center font-poppins">
        <h1 className="font-grand text-5xl text-orange-500">RandomRants</h1>
        <ul className="flex gap-10">
            <li className="font-bold">Home</li>
            <li className="font-bold">Login</li>
        </ul>
    </div>
  )
}

