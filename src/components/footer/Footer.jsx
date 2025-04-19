import "./style.scss";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useMediaQuery} from "@mui/material";
import React from "react";

const Footer = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");
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

    const navigate = useNavigate();

    const menuClick = (id) => {
        if (isMobile) {
            if (id === 1) {
                window.scrollTo(0, 0)
            } else if (id === 2) {
                window.scrollTo(0, 1600)
            } else if (id === 3) {
                window.scrollTo(0, 3500)
            } else if (id === 4) {
                window.scrollTo(0, 4300)
            }
        }

        if (!isMobile) {
            if (id === 1) {
                window.scrollTo(0, 0)
            } else if (id === 2) {
                window.scrollTo(0, 1200)
            } else if (id === 3) {
                window.scrollTo(0, 1800)
            } else if (id === 4) {
                window.scrollTo(0, 3400)
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
                    <a href="mailto:info@adataxi.uz"> info@adataxi.uz</a>
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
                    <a href="">
                        <img src="./images/instagram1.png" alt=""/>
                    </a>
                    <a href="">
                        <img src="./images/telegram1.png" alt=""/>
                    </a>
                    <a href="">
                        <img src="./images/facebook1.png" alt=""/>
                    </a>
                </div>
            </div>
        </div>
    </>
};

export default Footer;