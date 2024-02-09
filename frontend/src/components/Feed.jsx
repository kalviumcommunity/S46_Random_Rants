import { useEffect, useState } from "react";
 
 export default function Feed() {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
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
     <div className="border-2 max-w-[20rem] min-h-[15rem] my-2 rounded-md p-10 bg-white">
        <div className="flex py-4">
            <img className="rounded-3xl border-2 size-10" src="" alt="user profile photo" />
            <div>
                <p>User name</p>
                <p>Feb 9, 2024 at 10:30 pm</p>
            </div>
        </div>
        <p>What is for dinner today?</p>
        <p>#rockstar</p>
        <hr />
        <div className="flex gap-5">
            <p>Likes</p>
            <p>comments</p>
        </div>
     </div>
     <div className="border-2 max-w-[20rem] min-h-[15rem] my-2 rounded-md p-10 bg-white">
        <div className="flex py-4">
            <img className="rounded-3xl border-2 size-10" src="" alt="user profile photo" />
            <div>
                <p>User name</p>
                <p>Feb 9, 2024 at 10:30 pm</p>
            </div>
        </div>
        <p>What is for dinner today?</p>
        <p>#rockstar</p>
        <hr />
        <div className="flex gap-5">
            <p>Likes</p>
            <p>comments</p>
        </div>
     </div>
     <div className="border-2 max-w-[20rem] min-h-[15rem] my-2 rounded-md p-10 bg-white">
        <div className="flex py-4">
            <img className="rounded-3xl border-2 size-10" src="" alt="user profile photo" />
            <div>
                <p>User name</p>
                <p>Feb 9, 2024 at 10:30 pm</p>
            </div>
        </div>
        <p>What is for dinner today?</p>
        <p>#rockstar</p>
        <hr />
        <div className="flex gap-5">
            <p>Likes</p>
            <p>comments</p>
        </div>
     </div>
    </div>
    {isVisible ? <div className="hidden lg:flex flex-col items-center border-2 border-black fixed top-20 right-10 p-10 gap-5 text-white">
        <p className="text-black text-2xl">New to random Rants?</p>
      <button className="border-2 w-32 py-3 rounded-3xl bg-red-400">Sign Up</button>
      <button className="border-2 w-32 py-3 rounded-3xl bg-red-400">Log In</button>
    </div>: null}
    </>
   )
 }
 