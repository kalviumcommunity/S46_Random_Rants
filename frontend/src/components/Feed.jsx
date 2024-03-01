import { useEffect, useState } from "react";
import FixedNav from "./FixedNav";
import home from "../assets/home.png"
import profile from "../assets/user.png"
import axios from "axios"
import User from "./User";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { Toaster,toast } from "sonner";
 
 export default function Feed() {

    const [thought,setThought] = useState()
    const [filteredThoughts,setFilteredThoughts] = useState()
    const [data,setData] = useState()
    const [loggedIn,setLoggedIn] = useState(false)
    const [isProfile,setProfile] = useState(false)
    const [isLoading,setLoading] = useState(true)
    const navigate = useNavigate()

    const API_URI = import.meta.env.VITE_API_URI

    const getCookie = (cookieName) => {

        const cDecoded = decodeURIComponent(document.cookie)
        const cArray = cDecoded.split("; ")
        let result;
    
        cArray.forEach(cookie => {
            if(cookie.indexOf(cookieName) == 0){
                result = cookie.substring(cookieName.length + 1)
            }
        })
    
        return result
    }

    useEffect(() => {

        axios.get(`${API_URI}/thought/get`)
            .then(res=>{
                setThought(res.data)
                setFilteredThoughts(res.data)
                setLoading(false)
            })
            .catch(err=>{
                if (err.response.data.error) {
                    console.error(err.response.data.error);
                    toast.error(err.response.data.error);
                }else {
                    toast.error("An error occurred. Please try again.");
                }
            })

        if(getCookie("token")){
            setLoggedIn(true)
        }else{
            navigate("/")
        }

        axios.get(`${API_URI}/user/get`)
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.error(err)
                if (err.response.data.error) {
                    console.error(err.response.data.error);
                    toast.error(err.response.data.error);
                }else {
                    toast.error("An error occurred. Please try again.");
                }
            })

    }, []);

    const filterThoughts = (e) => {
        const filteredThoughts = thought.filter(thought => {
            if(e.target.value === "All"){
                return thought
            }else{
                return thought.userId === e.target.value
            }
        })
        setFilteredThoughts(filteredThoughts)
    }

   return (
    <>  
        <Toaster richColors/>
        <FixedNav/>
        {!isLoading ? <div id="feed" className="flex flex-col justify-center items-center w-full min-h-[100dvh] bg-slate-100 lg:p-12 p-20">
            {isProfile ? null:<h1 className="self-center text-4xl lg:text-5xl font-bold lg:pt-28 pt-5 pb-5">Feed</h1>}
            {loggedIn && <select id="users" className="p-2 border-2 self-end my-5" onChange={filterThoughts}>
                <option value="All">All</option>
                {data && data.map(user => (
                    <option className="py-5" key={user._id} value={user._id}>{user.username}</option>
                ))}
            </select>}
            {isProfile ? <User/> :
            filteredThoughts && filteredThoughts.length > 0 ? filteredThoughts.map(thought => {
                return(
                    <>
                    <div key={thought._id} className="border-2 w-[18rem] lg:w-[23rem] min-h-[15rem] my-2 rounded-md p-10 bg-white">
                        <div className="flex py-2">
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
                        </div>
                    </div>
                    </> 
                )
            }): <p className="text-2xl h-[100dvh] font-medium mt-[10%]">No thoughts found :( </p> }
        </div> : <Loading/> }
        {loggedIn && getCookie("token") && <div className="flex fixed lg:gap-5 lg:top-40 lg:left-20 bottom-0 p-3 bg-white w-full justify-evenly lg:w-12 lg:flex-col lg:justify-normal lg:bg-slate-100 lg:h-10">
            <div onClick={() => setProfile(false)} className="flex gap-2 items-center cursor-pointer">
                <img src={home} className="h-8 lg:h-6" alt="" />
                <p className="hidden lg:block text-xl font-medium">Home</p>
            </div>
            <div onClick={() => setProfile(true)} className="flex flex-col lg:flex-row gap-2 items-center cursor-pointer">
                <img src={profile} className="h-8 lg:h-6" alt="" />
                <p className="hidden lg:block text-xl font-medium">Profile</p>
            </div>
        </div>}
    </>
   )
 }
 
 