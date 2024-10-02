import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/logo/logo.png";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsBox2, BsCart3, BsList, BsPower } from "react-icons/bs";
import MobileDashNav from "../components/MobileDashNav/MobileDashNav";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const AdminLayout = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const sideBarRef = useRef();
  const navigate = useNavigate();

  const { logOut } = useAuth();

  // Check currently logged in user email is admin email or not
  const { isAdmin, adminLoading } = useAdmin();

  // Toggle mobile dashboard side navbar visibility
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target === sideBarRef.current) {
        setShowNavbar(!showNavbar);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [showNavbar]);

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      navigate("/");
    }
  }, [adminLoading, isAdmin, navigate]);

  // Handle user logout
  const handleUserLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logged out!");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="mx-auto w-full font-Poppins md:flex">
      {/* Small device navbar toggle button */}
      <div
        onClick={() => setShowNavbar(true)}
        className="px-[4%] pb-3 pt-2 text-[26px] md:hidden"
      >
        <BsList />
      </div>
      {showNavbar && (
        <MobileDashNav sideBarRef={sideBarRef} setShowNavbar={setShowNavbar} />
      )}

      {/* medium to upper device side navbar */}
      <nav className="hidden min-h-screen min-w-fit flex-col justify-between overflow-y-auto bg-[#111827] pb-10 pt-7 text-white md:flex p-5">
        <div>
          {/* Logo & Title */}
          <NavLink to="/" className="flex items-center flex items-center justify-center">

            <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-full">
              <img src={logo} alt="Logo" className="w-30 h-16" />
            </div>

            {/* <h1 className="ml-1 font-Montserrat text-2xl font-bold lg:text-[28px]">
              ADMIN PANEL
            </h1> */}
          </NavLink>
          <div className="mt-10  ">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `group flex items-center gap-2 px-5 py-4 ${isActive && "bg-gray-700 bg-opacity-25"}`
              }
            >
              {({ isActive }) => (
                <>
                  <span>
                    <LuLayoutDashboard
                      size={21}
                      className={`transition-all duration-200 ${isActive ? "text-primary" : "group-hover:text-primary"}`}
                    />
                  </span>
                  Dashboard
                </>
              )}
            </NavLink>
            <NavLink
              to="/dashboard/orders"
              className={({ isActive }) =>
                `group flex items-center gap-2 px-5 py-4 ${isActive && "bg-gray-700 bg-opacity-25"}`
              }
            >
              {({ isActive }) => (
                <>
                  <span>
                    <BsCart3
                      size={21}
                      className={`transition-all duration-200 ${isActive ? "text-primary" : "group-hover:text-primary"}`}
                    />
                  </span>
                  Orders
                </>
              )}
            </NavLink>
            <NavLink
              to="/dashboard/products"
              className={({ isActive }) =>
                `group flex items-center gap-2 px-5 py-4 ${isActive && "bg-gray-700 bg-opacity-25"}`
              }
            >
              {({ isActive }) => (
                <>
                  <span>
                    <BsBox2
                      size={18}
                      className={`transition-all duration-200 ${isActive ? "text-primary" : "group-hover:text-primary"}`}
                    />
                  </span>
                  Products
                </>
              )}
            </NavLink>
          </div>
        </div>
        <button
          onClick={handleUserLogOut}
          className="mt-10 flex items-center gap-2 px-5 transition-all duration-200"
        >
          <span>
            <BsPower size={20} className="w-6 text-[#ffb300]" />
          </span>
          Log Out
        </button>
      </nav>

      {/* Routes Page will be here */}
      <div className="flex-1 bg-[#f3f4fa]">
        <Outlet />
      </div>
    </section>
  );
};

export default AdminLayout;
