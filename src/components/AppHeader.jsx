import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Dialog, Transition } from "@headlessui/react";
import { ReactComponent as Menu } from "../assets/icons/Menu.svg";
import { ReactComponent as Close } from "../assets/icons/Close.svg";
import { ReactComponent as DashboardIcon } from "../assets/icons/Dashboard.svg";
import { ReactComponent as MyAccountIcon } from "../assets/icons/MyAccount.svg";
import { ReactComponent as LogoutIcon } from "../assets/icons/Logout.svg";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../utils/firebase';
import { GetUserService } from '../services/userService';
import { useDispatch, useSelector } from 'react-redux';
function AppHeader() {
    const [ user ] = useAuthState(auth)
    const {user: userData} = useSelector((state) => state.users)
    const { pathname } = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const greetingsText = useMemo(() => {
        const hourNow = new Date().getHours();
        return hourNow < 12
          ? "Good Morning"
          : hourNow < 17
            ? "Good Afternoon"
            : "Good Evening";
      }, []);

      useEffect(() => {
        dispatch(GetUserService())
      },[])
    return (

        <main className=" max-w-lg mx-auto relative bg-white">
            <Transition show={isOpen} as={Fragment}>
                <Dialog as={Fragment} onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        className="fixed top-0 bottom-0 left-0 right-0 bg-black/70"
                        enter="duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="duration-300 delay-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="delay-150 duration-200 transition-transform transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="duration-200 transition-transform transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel
                                as="aside"
                                className="min-h-full w-64 bg-white flex flex-col items-stretch"
                            >
                                <div className="flex items-start justify-between p-6">
                                    <div className="w-40 text-black">
                                        <Dialog.Title as="h3" className="text-sm">
                                            {greetingsText}
                                        </Dialog.Title>
                                        <Dialog.Title
                                            as="h2"
                                            className="text-lg font-medium truncate"
                                        >
                                        {user?.displayName ? user?.displayName : userData?.name}
                                        </Dialog.Title>
                                    </div>
                                    <button
                                        className="flex-shrink-0 bg-primary p-1.5 rounded-full"
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <Close className="h-5 w-5 text-white" />
                                    </button>
                                </div>
                                <nav className="mt-4">
                                    <ul className="space-y-4">
                                        {[
                                            {
                                                to: "/dashboard",
                                                label: "Dashboard",
                                                icon: (
                                                    <DashboardIcon className="h-5 w-5 text-primary" />
                                                ),
                                            },
                                            {
                                                to: "/my-account",
                                                label: "My Account",
                                                icon: (
                                                    <MyAccountIcon className="h-5 w-5 text-primary" />
                                                ),
                                            },
                                        ].map((linkObj) => (
                                            <li key={linkObj.to} className="pr-6">
                                                <Link
                                                    to={linkObj.to}
                                                    className={`flex items-center space-x-4 py-2 px-6 rounded-r-full ${pathname === linkObj.to
                                                        ? "bg-secondary/10"
                                                        : "bg-transparent"
                                                        } hover:bg-secondary/5`}
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {linkObj.icon}
                                                    <span className="text-primary text-xs">
                                                        {linkObj.label}
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                        <li className="pr-6">
                                            <button
                                                type="button"
                                                className="w-full flex items-center space-x-4 py-2 px-6 rounded-r-full hover:bg-error/5 active:bg-error/10"
                                                onClick={async() => {
                                                    setIsOpen(false);
                                                    // logout();
                                                   await auth.signOut().then(() => {
                                                    navigate('/')
                                                   })
                                                }}
                                            >
                                                <LogoutIcon className="h-5 w-5 text-error" />
                                                <span className="text-error text-xs">Logout</span>
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </Dialog.Panel>
                        </Transition.Child>
                    </Transition.Child>
                </Dialog>
            </Transition>
            <header className="flex items-center justify-between p-6">
                <div className="flex text-black">
                    <div className="w-1/2 rounded-3xl">
                        <img
                            src={user?.photoURL ? user?.photoURL : userData?.photoURL}
                            alt="profile"
                            referrerPolicy="no-referrer" 
                            width={50}
                            className="rounded-3xl"
                        />
                    </div>
                    <div>
                        <h3 className="text-sm text-[#00000054]">{greetingsText}</h3>
                        <h2 className="text-lg text-[#000000] font-medium truncate">
                            {/* {fname?.length > 0
                                ? fname
                                "SAI"} */} {user?.displayName ? user?.displayName : userData?.name}
                        </h2>
                    </div>
                </div>
                <button
                    className="flex-shrink-0"
                    type="button"
                    onClick={() => setIsOpen(true)}
                >
                    <Menu className="h-6 w-6 text-black" />
                </button>
            </header>
        </main>
    )
}

export default AppHeader