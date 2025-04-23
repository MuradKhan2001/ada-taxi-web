import React, {useState} from 'react';
import "./about-app.scss"
import Footer from "../footer/Footer";
import Navbar from "../Navbar/Navbar";
import {useTranslation} from "react-i18next";
import OfferApp from "../offer-app/OfferApp";

const AboutApp = () => {
    const {t} = useTranslation();
    const [tab_items, setTabItems] = useState(0);

    return (
        <div className="about-app">
            <Navbar/>
            <div className="content-wrapper">
                <div className="tab">
                    <div onClick={() => setTabItems(0)} className={`tab-item ${tab_items === 0 ? "active" : ""}`}>
                        {t("app-driver")}
                    </div>
                    <div onClick={() => setTabItems(1)} className={`tab-item ${tab_items === 1 ? "active" : ""}`}>
                        {t("app-client")}
                    </div>
                    <div onClick={() => setTabItems(2)} className={`tab-item ${tab_items === 2 ? "active" : ""}`}>
                        {t("offer")}
                    </div>
                </div>

                {tab_items === 0 &&
                    <div className="content">
                        <iframe
                                src="https://www.youtube.com/embed/_pJkjIqJgqM?si=iotJDLx-dd5oU_9y"
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </div>}

                {tab_items === 1 &&
                    <div className="content">
                        <iframe
                                src="https://www.youtube.com/embed/_pJkjIqJgqM?si=iotJDLx-dd5oU_9y"
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </div>}

                {tab_items === 2 &&
                    <div className="content-offer">
                        <OfferApp/>
                    </div>}
            </div>
            <Footer/>
        </div>
    );
};

export default AboutApp;