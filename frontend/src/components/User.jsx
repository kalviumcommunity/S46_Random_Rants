import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Toaster,toast } from "sonner"


export default function User() {

    const [userData,setUserData] = useState()
    const [thoughtData,setThoughtData] = useState()
    const [deleted,setDeleted] = useState(false)

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
        
        const fetchData = async () => {
            try {
              const userResponse = await axios.get(`${API_URI}/auth/user/${getCookie("email")}`, {
                headers: {
                  Authorization: `Bearer ${getCookie("token")}`,
                },
              });
              setUserData(userResponse.data);
        
              const thoughtResponse = await axios.get(`${API_URI}/auth/posts/${userResponse.data._id}`, {
                headers: {
                  Authorization: `Bearer ${getCookie("token")}`,
                },
              });
              setThoughtData(thoughtResponse.data);
            } catch (err) {
                if (err.response.data.error) {
                    console.error(err.response.data.error);
                    toast.error(err.response.data.error);
                }else {
                    toast.error("An error occurred. Please try again.");
                }
            }
          };
        
          fetchData();

    },[deleted])

    const handleDelete = (id) => {
        console.log(id)
        axios.delete(`${API_URI}/auth/delete/${id}`,{
            headers: {
                Authorization: `Bearer ${getCookie("token")}`
            }
        })
            .then(res => {
                console.log(res)
                setDeleted(true)
            })
            .catch(err => {
                if (err.response && err.response.data && err.response.data.error) {
                    console.error(err.response.data.error);
                    toast.error(err.response.data.error);
                }else {
                    toast.error("An error occurred. Please try again.");
                }
            })
    }


  return (
    <div>
        <Toaster richColors/>
        <div className="flex flex-col items-center p-5">
            <img id="profile-pic" className="bg-slate-300 rounded-full size-36" src="" alt="pfp"/>
                {userData && <h1 className="text-3xl text-center w-full font-medium p-5">{userData.username}</h1>}
            </div>
            <div className="flex flex-col items-center gap-5">
                {thoughtData && thoughtData.map((thought) => (
                    
                    <div key={thought._id} className="border-2 w-[18rem] lg:w-[23rem] min-h-[15rem] my-2 rounded-md p-10 bg-white">
                            
                            <p className="py-2"><span className="text-2xl absolute translate-x-[-0.7rem]">"</span>{thought.thought}<span className="text-2xl absolute">"</span></p>
                            <p className="py-3">#{thought.tag}</p>
                            <hr />
                            <div className="flex gap-5 items-center justify-between">
                                <div className="flex gap-5">
                                    <Link to={`/update/${thought.userId}`}>
                                        <button className="bg-blue-100 border-2 border-blue-500 px-2 py-1 text-blue-500 mt-2">Edit</button>
                                    </Link>
                                    <button onClick={() => handleDelete(thought._id)} className="bg-red-500 px-2 py-1 text-white mt-2">Delete</button>
                                </div>
                            </div>
                    </div>
                ) )
            }
            {userData && <Link to={`/create/${userData._id}`}>
                <button className="bg-blue-500 text-white p-2 font-medium"> + Add thought</button>
            </Link>}
            </div>
    </div>
  )
}
