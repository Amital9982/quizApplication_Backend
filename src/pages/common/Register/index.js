import { Form, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../apicalls/users";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await registerUser(values);

      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    // <div className="flex justify-center items-center h-screen w-screen bg-primary">
    //   <div className="card w-400 p-3 bg-white">
    //     <div className="flex flex-col">
    //       <h1 className="text-2xl">
    //         QUIZ - REGISTER<i className="ri-user-add-line"></i>
    //       </h1>
    //       <div className="divider"></div>
    //       <Form layout="vertical" className="mt-2" onFinish={onFinish}>
    //         <Form.Item name="name" label="Name">
    //           <input type="text" />
    //         </Form.Item>
    //         <Form.Item name="email" label="Email">
    //           <input type="text" />
    //         </Form.Item>
    //         <Form.Item name="password" label="Password">
    //           <input type="password" />
    //         </Form.Item>

    //         <div className="flex flex-col gap-2">
    //           <button
    //             type="submit"
    //             className="primary-contained-btn mt-2 w-100"
    //           >
    //             Register
    //           </button>
    //           <Link to="/login">Already a member? Login</Link>
    //         </div>
    //       </Form>
    //     </div>
    //   </div>
    // </div>

    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">


          <div className="mt-[100px] flex flex-col items-center">
            <h1 className="text-4xl xl:text-5xl font-bold text-violet-500">
              Sign Up
            </h1>
            <div className="divider"></div>
            <div className="w-full flex-1 mt-8 ">

              <div className="mx-auto max-w-xs ">


                <Form layout="vertical" className="mt-2" onFinish={onFinish}>
                  <Form.Item name="name">
                    <input
                      className="w-full px-8 py-8 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Name"
                    />
                  </Form.Item>
                  <Form.Item name="email" >
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="email"
                      placeholder="Email"
                    />
                  </Form.Item>
                  <Form.Item name="password" >
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Item>

                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <span className="ml-3">Register</span>
                  </button>
                  <div className="my-12 border-b text-center">
                    <div
                      className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                      <Link to="/login">Already a member? Login</Link>
                    </div>
                  </div>


                </Form>
              </div>

            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
          ></div>
        </div>
      </div>
    </div >
  );
}

export default Register;
