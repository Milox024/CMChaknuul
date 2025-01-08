import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaseContainer from "./React/Modules/Base/BaseContainer";
import HomeContainer from "./React/Modules/Home/HomeContainer";
import LoginContainer from "./React/Modules/Login/LoginContainter";

export default function routerApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={
                        <LoginContainer /> 
                    } 
                />
                <Route path="/" element={
                    <BaseContainer>
                        <HomeContainer /> 
                    </BaseContainer>
                    } 
                />
            </Routes>
        </BrowserRouter>
    )
}