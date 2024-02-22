import { useFormik } from "formik";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router";

const initialValues = {
    tag: "",
    thought: "",
  };

export default function Create() {

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
          axios.post("http://localhost:3000/thought/create",values)
            .then(res => {
                console.log(res)
                navigate("/")
            })
            .catch(err => console.error(err))
        },
      });


    return (
        <>
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
                Untangle
            </button>
            </form>
    </div>
    </>
  )
}
