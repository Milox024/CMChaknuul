import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaseContainer from "./React/Modules/Base/BaseContainer";
import HomeContainer from "./React/Modules/Home/HomeContainer";

export default function routerApp() {
    return (
        <BrowserRouter>
            <Routes>
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