import React from 'react';
import "./Client-app.scss"
import Footer from "../footer/Footer";
import Navbar from "../Navbar/Navbar";
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet";

const ClientApp = () => {
    const {t} = useTranslation();

    return (
        <div className="about-app">
            <Helmet>
                <title>{t("home-title")}</title>
                <meta name="description"
                      content={t("home-des")}/>
            </Helmet>

            <Navbar/>
            <div className="content-wrapper">
                <div className="saction_one">
                    <div className="left_side">
                        <div className="top_text">
                            {t("appClient")}
                        </div>
                        <div className="des">
                            {t("appClientDes")}
                        </div>

                        <div className="bottom_btns">
                            <a target="_blank" href="https://play.google.com/store/apps/details?id=uz.adataxi.client">
                                <div className="app-btn">
                                    <div className="left">
                                        <img src="./images/google.png" alt=""/>
                                    </div>
                                    <div className="right">
                                        <div className="top-text">
                                            Доступно в
                                        </div>
                                        <div className="bottom-text">
                                            Google Play
                                        </div>
                                    </div>
                                </div>
                            </a>

                            <a target="_blank" href="https://apps.apple.com/us/app/adataxi/id6744370881">
                                <div className="app-btn">
                                    <div className="left">
                                        <img src="./images/app.png" alt=""/>
                                    </div>
                                    <div className="right">
                                        <div className="top-text">
                                            Доступно в
                                        </div>
                                        <div className="bottom-text">
                                            App store
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="right_side">
                        <img src="./images/client.png" alt=""/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default ClientApp;