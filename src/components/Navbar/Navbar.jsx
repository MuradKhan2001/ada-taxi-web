import {useContext, useState, useRef} from "react";
import "./style.scss";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import {CSSTransition} from "react-transition-group";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from 'react-bootstrap/Dropdown';
import {MyContext} from "../App/App";
import {useMediaQuery} from "@mui/material";

const Navbar = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    let value = useContext(MyContext);
    const nodeRef = useRef(null);
    const [nav, setNav] = useState(false);
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [languageMenu, setLanguageMenu] = useState(false)

    const menu = [{
        id: 1, name: t('home'), link: "/"
    }, {
        id: 2, name: t('services'), link: "/"
    }, {
        id: 3, name: t('tariff'), link: "/"
    }, {
        id: 4, name: t('aboutus'), link: "/about-us"
    }];

    const language = [
        {
            code: "uz",
            name: "O'zbek tili",
            country_code: "uz",
        },
        {
            code: "en",
            name: "English language",
            country_code: "en",
        },
        {
            code: "ru",
            name: "Pусский язык",
            country_code: "ru",
        },
    ];
    const changeLanguage = (code) => {
        localStorage.setItem("lng", code);
        i18next.changeLanguage(code);
    };

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
            } else if (id === 4) {
                setTimeout(() => {
                    window.scrollTo(0, 3400)
                }, 500);
                navigate("/")
            }
        }
        setNav(false)
    }

    return <nav className="navbar-wrapper">
        <div className="logo">
            <img onClick={() => {
                navigate('/')
            }} src="./images/logo.png" alt=""/>
        </div>
        <CSSTransition
            in={window.innerWidth > 1080 ? true : nav}
            nodeRef={nodeRef}
            timeout={100}
            classNames="alert"
            unmountOnExit
        >
            <div className="nav-list">
                <div ref={nodeRef} className="sloy-mobile">

                    <div onClick={() => {
                    }} className="nav-item-hide">
                        <img onClick={() => setNav(false)} src="./images/close.png" alt=""/>
                    </div>

                    {menu.map((item, index) => {
                        return <div key={index} onClick={() => menuClick(item.id)}
                                    className={`nav-item`}>{item.name}</div>
                    })}

                    <div onClick={() => {
                        setNav(false)
                        window.scrollTo(0, 6300)
                    }} className="driver_btn">
                        {t("send")}
                    </div>
                </div>
            </div>

        </CSSTransition>

        <div className="mobile-left-side">
            <div className="language-btn">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <img className="globe" src="./images/globe-alt.webp" alt="language" loading="lazy"/>
                        <div className="name">
                            {language.map((item, index) => {
                                return (
                                    <div key={index}>
                                        {i18next.language === item.code ? item.name : ""}
                                    </div>
                                );
                            })}
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>

                        {language.map(({code, name, country_code}) => (
                            <Dropdown.Item key={country_code}
                                           onClick={() => changeLanguage(code)}>{name}</Dropdown.Item>
                        ))}

                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div onClick={() => {
                window.scrollTo(0, 5500)
            }} className="driver_btn">
                {t("send")}
            </div>

            <div className="nav-show">
                <img onClick={() => {
                    setNav(true)
                }} src="./images/menu.png" alt=""/>
            </div>
        </div>

    </nav>
}
export default Navbar