import "./style.scss";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useMediaQuery} from "@mui/material";
import React from "react";

const Footer = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const navigate = useNavigate();
    const {t} = useTranslation();

    const menu = [{
        id: 1, name: t('home'), link: "/"
    }, {
        id: 2, name: t('services'), link: "/"
    }, {
        id: 3, name: t('tariff'), link: "/"
    }, {
        id: 4, name: t('aboutus'), link: "/about-us"
    }];

    const menuClick = (id) => {
        if (isMobile) {

            if (id === 1) {
                setTimeout(() => {
                    window.scrollTo(0, 0)
                }, 500);
                navigate("/")
            } else if (id === 2) {
                setTimeout(() => {
                    window.scrollTo(0, 1600)
                }, 500);
                navigate("/")
            } else if (id === 3) {
                navigate("/about-app")
            } else if (id === 4) {
                setTimeout(() => {
                    window.scrollTo(0, 4300)
                }, 500);
                navigate("/")
            }
        }

        if (!isMobile) {
            if (id === 1) {
                setTimeout(() => {
                    window.scrollTo(0, 0)
                }, 500);
                navigate("/")
            } else if (id === 2) {
                setTimeout(() => {
                    window.scrollTo(0, 1200)
                }, 500);
                navigate("/")
            } else if (id === 3) {
                navigate("/about-app")
                setTimeout(() => {
                    window.scrollTo(0, 0)
                }, 500);
            } else if (id === 4) {
                setTimeout(() => {
                    window.scrollTo(0, 3400)
                }, 500);
                navigate("/")
            }
        }
    }

    return <>
        <div className="footer-container">

            <div className="section-logo">
                <img src="./images/logo2.png" alt=""/>
            </div>

            <div className="section-contact">
                <div className="title-footer">
                    {t("contact")}
                </div>
                <div className="item-footer">
                    <a href="tel:+998915444499"> +998 91 544 44 99 </a>
                </div>
                <div className="item-footer">
                    <a href="mailto:adataxi2025@gmail.com"> adataxi2025@gmail.com</a>
                </div>
            </div>

            <div className="section-menu">
                <div className="title-footer">
                    {t("menu")}
                </div>
                {
                    menu.map((item, index) => {
                        return <div key={index} onClick={() => menuClick(item.id)} className="item-footer">
                            {item.name}
                        </div>
                    })
                }
            </div>

            <div className="section-social-medias">
                <div className="title-footer">
                    {t("smm")}
                </div>

                <div className="icons-box">
                    <a target="_blank" href="https://www.instagram.com/adataxi_uz/">
                        <img src="./images/instagram.png" alt=""/>
                    </a>
                    <a target="_blank" href="https://t.me/+Ruz2cjoeIC4xNTU6">
                        <img src="./images/telegram.png" alt=""/>
                    </a>
                    <a target="_blank" href="https://www.youtube.com/@AdaTaxi">
                        <img src="./images/youtube.png" alt=""/>
                    </a>
                </div>
            </div>
        </div>
    </>
};

export default Footer;