import { message } from "antd";
import React, { useEffect, useState } from "react";
import { getUserInfo } from "../apicalls/users";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice.js";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/loaderSlice";
import { CgProfile } from "react-icons/cg";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.users);
  const [menu, setMenu] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userMenu = [
    {
      title: "Home",
      paths: ["/", "/user/write-exam"],
      icon: <i className="ri-home-line"></i>,
      onClick: () => navigate("/"),
    },
    {
      title: "Reports",
      paths: ["/user/reports"],
      icon: <i className="ri-bar-chart-line"></i>,
      onClick: () => navigate("/user/reports"),
    },

    {
      title: "Logout",
      paths: ["/logout"],
      icon: <i className="ri-logout-box-line"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
    },
  ];

  const adminMenu = [
    {
      title: "Home",
      paths: ["/", "/user/write-exam"],
      icon: <i className="ri-home-line"></i>,
      onClick: () => navigate("/"),
    },
    {
      title: "Exams",
      paths: ["/admin/exams", "/admin/exams/add"],
      icon: <i className="ri-file-list-line"></i>,
      onClick: () => navigate("/admin/exams"),
    },
    {
      title: "Reports",
      paths: ["/admin/reports"],
      icon: <i className="ri-bar-chart-line"></i>,
      onClick: () => navigate("/admin/reports"),
    },

    {
      title: "Logout",
      paths: ["/logout"],
      icon: <i className="ri-logout-box-line"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
    },
  ];

  const getUserData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getUserInfo();
      dispatch(HideLoading());
      if (response.success) {
        dispatch(SetUser(response.data));
        if (response.data.isAdmin) {
          setMenu(adminMenu);
        } else {
          setMenu(userMenu);
        }
      } else {
        message.error(response.message);
      }
    } catch (error) {
      navigate("/login");
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData();
    } else {
      navigate("/login");
    }
  }, []);

  const activeRoute = window.location.pathname;

  const getIsActiveOrNot = (paths) => {
    if (paths.includes(activeRoute)) {
      return true;
    } else {
      if (
        activeRoute.includes("/admin/exams/edit") &&
        paths.includes("/admin/exams")
      ) {
        return true;
      }
      if (
        activeRoute.includes("/user/write-exam") &&
        paths.includes("/user/write-exam")
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-grow">
        <nav
          className={`flex flex-col gap-3 p-2 font-sans text-base font-normal text-slate-800 ${collapsed ? "min-w-[80px]" : "min-w-[240px]"
            }`}
        >
          <div className="flex justify-between items-center">
            <h1 className={`text-2xl text-center ${collapsed ? "hidden" : ""}`}>
              {user?.isAdmin ? "Admin Panel" : ""}
            </h1>
            <button
              className="p-2 text-gray-700"
              onClick={() => setCollapsed(!collapsed)}
            >
              <i
                className={`ri-arrow-${collapsed ? "right" : "left"}-s-line`}
              ></i>
            </button>
          </div>
          {menu.map((item, index) => (
            <div
              key={index}
              role="button"
              tabIndex={0}
              className={`flex p-1 rounded-lg leading-tight transition-all outline-none ${getIsActiveOrNot(item.paths)
                ? "bg-blue-950 text-white"
                : "text-gray-700"
                }`}
              onClick={item.onClick}
            >
              {item.icon}
              {!collapsed && <span className="ml-2">{item.title}</span>}
            </div>
          ))}
        </nav>
        <div className="flex-grow">
          <div className="flex justify-between items-center bg-blue-950 p-4">
            <h1 className="text-3xl text-white font-bold">
              QUIZ Application
            </h1>

            <div className="flex items-center gap-2">
              <CgProfile size={25} className="text-white mb-5" />
              <div className="flex flex-col items-start">
                <h1 className="text-md text-white">{user?.name}</h1>
                <p className="text-white">
                  {user?.isAdmin ? "Admin" : "User"}
                </p>
              </div>
            </div>
          </div>

          <div className="content p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default ProtectedRoute;
