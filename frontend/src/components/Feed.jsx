import { useEffect, useState } from "react";
import FixedNav from "./FixedNav";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
 
 export default function Feed() {

    const [isVisible, setIsVisible] = useState(false);
    const [thought,setThought] = useState()
    const [deleted,setDeleted] = useState(false)

    useEffect(() => {

        axios.get("http://localhost:3000/thought")
            .then(res=>{
                setThought(res.data)
                setDeleted(false)
            })
            .catch(err=>console.log(err))

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsVisible(scrollPosition >= window.innerHeight);
        };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
    }, [deleted]);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/thought/remove/${id}`)
            .then(res => {
                console.log(res)
                setDeleted(true)
            })
            .catch(err => console.error(err))
    }


   return (
    <>
    <FixedNav/>
    <div id="feed" className="flex flex-col justify-center items-center h-full bg-slate-100 p-10">
     <h1 className="self-center p-10 text-5xl font-bold">Feed</h1>
            {thought && thought.map(thought => {
                    return(
                    <>
                    <div key={thought._id} className="border-2 w-[20rem] lg:w-[25rem] min-h-[15rem] my-2 rounded-md p-10 bg-white">
                        <div className="flex py-4">
                            <img className="rounded-3xl border-2 size-10" src="" alt="user profile photo" />
                            <div className="px-2">
                                <p>Username</p>
                                <p>{new Date().toDateString()}</p>
                            </div>
                        </div>
                        <p className="py-2"><span className="text-2xl absolute translate-x-[-0.7rem]">"</span>{thought.thought}<span className="text-2xl absolute">"</span></p>
                        <p className="py-3">#{thought.tag}</p>
                        <hr />
                        <div className="flex gap-5 items-center justify-between">
                            <div className="flex gap-5 ">
                                <p>Likes</p>
                                <p>comments</p>
                            </div>
                            <Link to={`/update/${thought._id}`}>
                                <button className="border-2 p-2 m-2 rounded-md bg-blue-400 hover:bg-blue-500 text-white">
                                    Update
                                </button>
                            </Link>
                            <button onClick={() => handleDelete(thought._id)} className="border-2 border-blue-500 bg-blue-50 hover:bg-white p-2 rounded-md">Delete</button>
                        </div>
                    </div>
                    </> 
                    )
            })}
    </div>
    {isVisible ? <div className="hidden lg:flex flex-col items-center border-2 bg-white fixed top-20 right-10 p-10 gap-5 text-white">
        <p className="text-black text-2xl">New to random Rants?</p>
        <div className="flex flex-col items-center gap-5">
            <div className="flex gap-5">
                <button className="border-2 w-32 py-3 rounded-3xl bg-red-400">Sign Up</button>
                <button className="border-2 w-32 py-3 rounded-3xl bg-red-400">Log In</button>
            </div>
            <div>
                <Link to="/create">
                    <button className="border-2 w-32 py-3 rounded-3xl bg-red-400">Add thought</button>
                </Link>
            </div>
        </div>
    </div>: null}
    </>
   )
 }
 