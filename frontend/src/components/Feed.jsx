import { useEffect, useState } from "react";
import axios from "axios"
 
 export default function Feed() {

    const [isVisible, setIsVisible] = useState(false);
    const [thought,setThought] = useState()

    useEffect(() => {

        axios.get("http://localhost:3000/thought")
            .then(res=>setThought(res.data))
            .catch(err=>console.log(err))

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsVisible(scrollPosition >= window.innerHeight);
        };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

   return (
    <>
    
    <div id="feed" className="flex flex-col justify-center items-center h-full bg-slate-100 p-10">
     <h1 className="self-center p-10 text-5xl font-bold">Feed</h1>
            {thought && thought.map(thought => {
                    return(
                    <>
                    <div key={thought.userId} className="border-2 w-[20rem] lg:w-[25rem] min-h-[15rem] my-2 rounded-md p-10 bg-white">
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
                        <div className="flex gap-5">
                            <p>Likes</p>
                            <p>comments</p>
                        </div>
                    </div>
                    </> 
                    )
            })}
    </div>
    {isVisible ? <div className="hidden lg:flex flex-col items-center border-2 bg-white fixed top-20 right-10 p-10 gap-5 text-white">
        <p className="text-black text-2xl">New to random Rants?</p>
        <div className="flex gap-5">
                <button className="border-2 w-32 py-3 rounded-3xl bg-red-400">Sign Up</button>
                <button className="border-2 w-32 py-3 rounded-3xl bg-red-400">Log In</button>
        </div>
    </div>: null}
    </>
   )
 }
 