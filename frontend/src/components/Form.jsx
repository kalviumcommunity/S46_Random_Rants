import { useFormik } from "formik";
import banner from "../assets/banner.jpg";
import Navbar from "./Navbar";
import axios from "axios"
import { useParams,useNavigate } from "react-router";
import { useEffect, useState } from "react";
import * as Yup from "yup"
import { Toaster,toast } from "sonner";


export default function Form() {
    const [isVisible, setVisible] = useState(true);
    const navigate = useNavigate()
    const { form } = useParams();

    const API_URI = import.meta.env.VITE_API_URI

    const initialValues = {
      username: "",
      email: "",
      password: ""
    }; 

    const validationSchema = Yup.object().shape({
        username: form === "signup"
      ? Yup.string().required("Username is required")
      : Yup.string().optional(),
        email: Yup.string().email("Please enter a valid email").required("Email is required"),
        password: Yup.string()
          .required("Password is required")
          .min(6,"Password should be atleast 6 characters")
          .matches(
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.\-_*])([a-zA-Z0-9@#$%^&+=*.\-_]){6,}$/,
            "Password must contain at least one lowercase letter, uppercase letter, number, and special character"
          ),
      });

    useEffect(() => {
        setVisible(true)
    },[form])

    const setCookie = (cookieName,value,daysToLive) => {
        const date = new Date()
        date.setTime(date.getTime() + (daysToLive * 24 * 60 * 60 * 1000))
        let expires = "expires=" + date.toUTCString()
        document.cookie = `${cookieName}=${value}; ${expires}; path=/`
    }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values,) => {
        const url = form === "signup" ? `${API_URI}/auth/signup` : `${API_URI}/auth/login`;
        axios.post(url, values)
        .then((res) => {
          if (form === "signup") {
            navigate("/auth/login");
          } else {
            setCookie("token", res.data.accessToken, 1);
            setCookie("email", res.data.email, 1);
            navigate("/feed");
          }
        })
        .catch((err) => {
            if (err.response && err.response.data && err.response.data.error) {
                console.error(err.response.data.error);
                toast.error(err.response.data.error);
            }else {
                toast.error("An error occurred. Please try again.");
            }
        });
    },
  });

  console.log(formik.errors)

  return (
    <div className="flex lg:h-[100dvh]">
      <Toaster richColors/>  
      <div className="w-[100dvw] lg:w-[50dvw]">
        <Navbar />
        <div className="flex flex-col gap-10 justify-center items-center ml-[20%] font-poppins bg-cover bg-[35%] lg:bg-none h-[90dvh]">
          {isVisible ? (
            <>
            <div className="w-3/4 self-start bg-blue-600 text-white py-2 text-center rounded-lg">
                {form} with google
            </div>
            <span className="self-start w-3/4 text-center text-gray-400"> Or </span>
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
            </>
          ) : form === "signup" ? (
            <>
            <h1 className="self-start font-bold text-sky-500 text-4xl">{form.charAt(0).toUpperCase()+form.substring(1)}</h1>
            <form onSubmit={formik.handleSubmit} className="flex flex-col w-full gap-5">
                <div className="flex flex-col">
                    <label htmlFor="username">Full Name</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        className={`py-2 px-2 w-3/4 rounded-md ${formik.touched.username && formik.errors.username ? "border-red-500 border-2" : ""} border-2`}                        placeholder="Enter Your Full Name"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        onBlur={formik.handleBlur}
                        />
                    {formik.touched.username && formik.errors ? <p className="text-red-500">{formik.errors.username}</p> : null }
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className={`py-2 px-2 w-3/4 rounded-md ${formik.touched.email && formik.errors.email ? "border-red-500 border-2" : ""} border-2`}                        placeholder="Enter Your Email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        />
                    {formik.touched.email && formik.errors ? <p className="text-red-500">{formik.errors.email}</p> : null }
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className={`py-2 px-2 w-3/4 rounded-md ${formik.touched.password && formik.errors.password ? "border-red-500 border-2" : ""} border-2`}                        placeholder="Enter Your Password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        />
                    {formik.touched.password && formik.errors ? <p className="text-red-500">{formik.errors.password}</p> : null }
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
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className={`py-2 px-2 w-3/4 rounded-md ${formik.touched.email && formik.errors.email ? "border-red-500 border-2" : ""} border-2`}
                        placeholder="Enter Your Email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        />
                    {formik.touched.email && formik.errors ? <p className="text-red-500 pt-2">{formik.errors.email}</p> : null }
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className={`py-2 px-2 w-3/4 rounded-md ${formik.touched.password && formik.errors.password ? "border-red-500 border-2" : ""} border-2`}
                        placeholder="Enter Your Password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        />
                    {formik.touched.password && formik.errors ? <p className="text-red-500 w-3/4 pt-2">{formik.errors.password}</p> : null }
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
