import React, { useEffect } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import { useAppMenuContext } from "../shared/contexts";
import { ConstructionPage, Dashboard, Expenses, Payments } from "../pages";
import { Login } from "../pages/Login/Login";

export const AppRoutes = () => {
    const { setAppMenuOptions } = useAppMenuContext();

    useEffect(() => {
        setAppMenuOptions([
            {
                label: "Login",
                icon: "login",
                path: "/login",
            },
            {
                label: "Dashboard",
                icon: "home",
                path: "/dashboard",
            },
            {
                label: "Receitas",
                icon: "payments",
                path: "/payments",
            },
            {
                label: "Despesas",
                icon: "money_off",
                path: "/expenses",
            },
            {
                label: "Configurações",
                icon: "settings",
                path: "/settings",
            }
        ]);
    }, []);

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/settings" element={<ConstructionPage />} />

            <Route path="*" element={<Navigate to="/login" /> } />
        </Routes>
    );   
};