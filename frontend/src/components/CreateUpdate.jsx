import { useFormik } from "formik";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate,useParams } from "react-router";
import {Toaster,toast} from "sonner"

const initialValues = {
    thought: "",
    tag: "",
  };

export default function Create() {

    const navigate = useNavigate()
    const {operation,id} = useParams()

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

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
        if(operation === "create"){
            axios.post(`${API_URI}/auth/post/${id}`,values,{
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`
                }
            })
              .then(res => {
                console.log(res)
                navigate("/feed")
              })
              .catch(err => {
                if (err.response.data.error) {
                    console.error(err.response.data.error);
                    toast.error(err.response.data.error);
                }else {
                    toast.error("An error occurred. Please try again.");
                }
              })
          }else{
            axios.put(`${API_URI}/auth/update/${id}`,values,{
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`
                }
            })
                .then(res => {
                    console.log(res)
                    navigate("/feed")
                })
                .catch(err => {
                    if (err.response.data.error) {
                        console.error(err.response.data.error);
                        toast.error(err.response.data.error);
                    }else {
                        toast.error("An error occurred. Please try again.");
                    }
                })
            }
        }
      });


    return (
        <>
        <Toaster richColors/>
        <Navbar/>
        <div className="flex flex-col lg:justify-center lg:items-center w-[100dvw] ">
            <form onSubmit={formik.handleSubmit} className="flex flex-col ml-24 w-1/2 gap-5 lg:translate-x-[12%] mt-20">
            <label htmlFor="thought">Thought</label>
                <input
                    id="thought"
                    name="thought"
                    type="text"
                    className="border-2 py-2 px-2 w-full lg:w-1/2 rounded-md"
                    placeholder="What's on your mind?"
                    onChange={formik.handleChange}
                    value={formik.values.thought}
                />
            <label htmlFor="tag">Hashtag</label>
                <input
                    id="tag"
                    name="tag"
                    type="text"
                    className="border-2 py-2 px-2 w-full lg:w-1/2 rounded-md"
                    placeholder="#thought"
                    onChange={formik.handleChange}
                    value={formik.values.tag}
                />
            <button
                type="submit"
                className="border-2 py-3 my-3 lg:w-1/2 lg:my-10 w-full bg-orange-300 hover:bg-orange-400 rounded-md text-white">
                {operation === "create" ? "Untangle" : "Update"}
            </button>
            </form>
    </div>
    </>
  )
}
