import React from "react";
import PropTypes from "prop-types";
import Header from "../components/AppHeader";
import { Outlet } from "react-router-dom";

export default function DrawerLayout(props) {
    return (
        <div>
            <Header />
            <div>
                {props.children}

            </div>
            <Outlet />
        </div>
    );
}
