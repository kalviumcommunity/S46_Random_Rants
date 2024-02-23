import { Formik, useFormik } from "formik";
import banner from "../assets/banner.jpg";
import Navbar from "./Navbar";
import { useParams,useNavigate } from "react-router";
import { useEffect, useState } from "react";


export default function Form() {
    const [isVisible, setVisible] = useState(true);
    const navigate = useNavigate()
    const { form } = useParams();

    const initialValues = {
      fullName: "",
      email: "",
      password: ""
    }; 

  useEffect(() => {
    setVisible(true)
  },[form])

  const setCookie = (cookieName,value,daysToLive) => {
    const date = new Date()
    date.setTime(date.getTime() + (daysToLive * 24 * 60 * 60 * 1000))
    let expires = "expires=" + date.toUTCString()
    document.cookie = `${cookieName}=${value}; ${expires}; path=/`
  }

  const deleteCookie = (cookieName) => {
    setCookie(cookieName,null,null)
  }

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
        const {fullName,email,password} = values
        setCookie("username",fullName,7)
        navigate("/feed")
    },
  });

  return (
    <div className="flex lg:h-[100dvh]">
      <div className="w-[100dvw] lg:w-[50dvw]">
        <Navbar />
        <div className="flex flex-col gap-10 justify-center items-center ml-[20%] font-poppins bg-cover bg-[35%] lg:bg-none h-[90dvh]">
          {isVisible && 
            <>
                <div className="w-3/4 self-start bg-blue-600 text-white py-2 text-center rounded-lg">
                    {form} with google
                </div>
                <span className="self-start w-3/4 text-center text-gray-400"> Or </span>
            </>
          }
          {isVisible ? (
            <form className="flex flex-col w-full gap-5">
              <input
                id="email"
                name="email"
                type="email"
                className="border-2 py-2 px-2 w-3/4 rounded-md"
                placeholder="Enter Your Email"
                onClick={() => setVisible(false)}
              />
            <button
            type="submit"
            className="border-2 py-3 my-3 lg:my-10 w-3/4 bg-orange-300 hover:bg-orange-400 rounded-md text-white">
            Submit
          </button>
            </form>
          ) : form === "signup" ? (
            <>
            <h1 className="self-start font-bold text-sky-500 text-4xl">{form.charAt(0).toUpperCase()+form.substring(1)}</h1>
            <form onSubmit={formik.handleSubmit} className="flex flex-col w-full gap-5">
                <div className="flex flex-col">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        className="border-2 py-2 px-2 w-3/4 rounded-md"
                        placeholder="Enter Your Full Name"
                        onChange={formik.handleChange}
                        value={formik.values.fullName}
                        />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="border-2 py-2 px-2 w-3/4 rounded-md"
                        placeholder="Enter Your Email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className="border-2 py-2 px-2 w-3/4 rounded-md"
                        placeholder="Enter Your Password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        />
                </div>
                <button
                    type="submit"
                    className="border-2 py-3 my-3 lg:my-10 w-3/4 bg-orange-300 hover:bg-orange-400 rounded-md text-white">
                    Submit
                </button>
            </form>
            </>
          ) : (
            <>
            <h1 className="self-start font-bold text-sky-500 text-4xl">{form.charAt(0).toUpperCase()+form.substring(1)}</h1>
            <form onSubmit={formik.handleSubmit} className="flex flex-col w-full gap-5">
                <div className="flex flex-col">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        name="fullName"
                        type="text"
                        className="border-2 py-2 px-2 w-3/4 rounded-md"
                        placeholder="Enter Your Username"
                        onChange={formik.handleChange}
                        value={formik.values.fullName}
                        />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className="border-2 py-2 px-2 w-3/4 rounded-md"
                        placeholder="Enter Your Password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        />
                </div>
              <button
            type="submit"
            className="border-2 py-3 my-3 lg:my-10 w-3/4 bg-orange-400 lg:bg-orange-300 hover:bg-orange-400 rounded-md text-white"
            >
            Submit
          </button>
            </form>
          </>
          )}
          
        </div>
      </div>
      <div>
        <img
          className="h-screen w-[60dvw] hidden lg:block"
          src={banner}
          alt="image of thoughts being untangled"
        />
      </div>
    </div>
  );
}
