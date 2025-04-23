import "./style.scss";
import Navbar from "../Navbar/Navbar";
import {useState, useEffect} from "react";
import Slider from "react-slick";
import Footer from "../footer/Footer";
import ScrollTrigger from "react-scroll-trigger";
import CountUp from "react-countup";
import {useTranslation} from "react-i18next";
import {useMediaQuery} from "@mui/material";
import axios from "axios";
import i18next from "i18next";

const Home = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const {t} = useTranslation();
    const [activeTabItem, setActiveTabItem] = useState("regional")
    const [activeTabItem2, setActiveTabItem2] = useState(0)
    const [fromLocation, setFromLocation] = useState("")
    const [toLocation, setToLocation] = useState("")
    const [counterOn, setCounterOn] = useState(false);
    const directionList = [
        {id: "regional", name: t("service1")},
        {id: "postal", name: t("service2")},
        {id: "minivan", name: t("service3")},
        {id: "travel", name: t("service4")},
    ]
    const [priceList, setPriceList] = useState([])
    const regions = [
        {name: t("Andijan"), latitude: 40.813616, longitude: 72.283463},
        {name: t("Bukhara"), latitude: 39.767070, longitude: 64.455393},
        {name: t("Ferghana"), latitude: 40.372379, longitude: 71.797770},
        {name: t("Jizzakh"), latitude: 40.119300, longitude: 67.880140},
        {name: t("Namangan"), latitude: 41.004297, longitude: 71.642956},
        {name: t("Navoi"), latitude: 40.096634, longitude: 65.352255},
        {name: t("Kashkadarya"), latitude: 38.852124, longitude: 65.784203},
        {name: t("Samarkand"), latitude: 39.649307, longitude: 66.965182},
        {name: t("SyrDarya"), latitude: 40.376986, longitude: 68.713159},
        {name: t("Surkhandarya"), latitude: 37.931559, longitude: 67.564765},
        {name: t("Tashkent"), latitude: 41.295695, longitude: 69.239730},
        {name: t("Khorezm"), latitude: 41.522326, longitude: 60.623731},
        {name: t("Karakalpakstan"), latitude: 43.730521, longitude: 59.064533}
    ];
    const [imageIndex, setImageIndex] = useState(0);
    const [ActiveQuestion, setActiveQuestion] = useState("");
    const [full_name, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [counter, setCounter] = useState({});
    const [reviews, setReviews] = useState([]);
    const [questions, setQuestions] = useState([]);

    const settings = {
        lazyLoad: true,
        slidesToShow: reviews.length < 5 ? reviews.length - 1 : 5,
        dots: false,
        infinite: true,
        speed: 1000,
        autoplay: true,
        slidesToScroll: 1,
        initialSlide: 1,
        centerMode: true,
        centerPadding: 0,
        navs: false,
        beforeChange: (current, next) => setImageIndex(next),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: reviews.length < 3 ? reviews.length - 1 : 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: reviews.length < 3 ? reviews.length - 1 : 3,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: reviews.length < 3 ? reviews.length - 1 : 3,
                    slidesToScroll: 1
                }
            }
        ]
    };

    useEffect(() => {
        getData()

        axios.get(`https://api.adataxi.uz/api/v1/site/statistics/`).then((response) => {
            setCounter(response.data[0])
        })

        axios.get(`https://api.adataxi.uz/api/v1/site/review/`).then((response) => {
            setReviews(response.data)
        })

        axios.get(`https://api.adataxi.uz/api/v1/site/faq/`).then((response) => {
            setQuestions(response.data)
        })
    }, []);

    const menuClick = (status) => {
        if (!isMobile) {
            if (status === "driver") {
                window.scrollTo(0, 1800)
            }
            if (status === "client") {
                window.scrollTo(0, 2900)
            }
        }

        if (isMobile) {
            if (status === "driver") {
                window.scrollTo(0, 2300)
            }
            if (status === "client") {
                window.scrollTo(0, 3600)
            }
        }
    }

    const sendApp = () => {
        let data = {
            name: full_name,
            phone
        }

        if (full_name.trim().length > 0 && phone.trim().length > 0) {
            axios.post(`https://api.adataxi.uz/api/v1/site/driver-request/`, data).then((response) => {
                alert(t("alert1"))
                setFullName("")
                setPhone("")
            })
        } else {
            alert(t("alert2"))
        }
    }

    const getData = (tab_item, from_index, to_index) => {
        let findex = from_index ? from_index : fromLocation
        let zindex = to_index ? to_index : toLocation

        let from = findex ? {
            latitude: findex && regions[findex].latitude,
            longitude: findex && regions[findex].longitude
        } : {};
        let to = zindex ? {
            latitude: zindex && regions[zindex].latitude,
            longitude: zindex && regions[zindex].longitude
        } : {};

        let data = {
            service: tab_item ? tab_item : activeTabItem,
            from_region: from,
            to_region: to,
        }

        if ((Object.keys(from).length !== 0 && Object.keys(to).length !== 0) || (Object.keys(from).length === 0 && Object.keys(to).length === 0)) {
            axios.post(`https://api.adataxi.uz/api/v1/get-prices/`, data).then((response) => {
                setPriceList(response.data)
            })
        }

    }

    return <div className="home-wrapper">
        <div className="home_page">
            <div className="navbar_box">
                <Navbar/>
            </div>
            <div className="home_contents">
                <div className="left_side">
                    <div className="home_text">
                        <div className="main-title">
                            YO'LGA CHIQ YO'LDAN CHIQMA
                        </div>
                        <div className="main-text">
                            {t("homeTitle")}
                        </div>
                        <div className="des">
                            {t("homeDes")}
                        </div>
                        <div className="buttons">
                            <div onClick={() => {
                                menuClick("client")
                            }} className="button-client">
                                {t("client")}
                            </div>
                            <div onClick={() => {
                                menuClick("driver")
                            }} className="button-driver">
                                {t("driver")}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right_side">

                </div>
            </div>
        </div>
        <div className="usually-wrapper">
            <div className="title">
                {t("whyAda")}
            </div>
            <div className="bottom-contents">
                <div className="use-card">
                    <div className="icon-circle">
                        <img src="./images/hourglass-2-fill.png" alt="hourglass-2-fill"/>
                    </div>
                    <div className="name">
                        {t("usuallyTitle1")}
                    </div>
                    <div className="des">
                        {t("usuallyDes1")}
                    </div>
                </div>

                <div className="use-card">
                    <div className="icon-circle">
                        <img src="./images/cash-line.png" alt="cash-line"/>
                    </div>
                    <div className="name">
                        {t("usuallyTitle2")}
                    </div>
                    <div className="des">
                        {t("usuallyDes2")}
                    </div>
                </div>

                <div className="use-card">
                    <div className="icon-circle">
                        <img src="./images/task-fill.png" alt="task-fill"/>
                    </div>
                    <div className="name">
                        {t("usuallyTitle3")}
                    </div>
                    <div className="des">
                        {t("usuallyDes3")}
                    </div>
                </div>

                <div className="use-card">
                    <div className="icon-circle">
                        <img src="./images/shield.png" alt="timer-fill"/>
                    </div>
                    <div className="name">
                        {t("usuallyTitle4")}
                    </div>
                    <div className="des">
                        {t("usuallyDes4")}
                    </div>
                </div>
            </div>
        </div>
        <div className="section_two">
            <div className="main_card">
                <div className="title">
                    {t("servicesTitle")}
                </div>
                <div className="header">
                    {
                        directionList.map((item, index) => {
                            return <div key={index} onClick={() => {
                                setActiveTabItem(item.id)
                                getData(item.id)
                            }}
                                        className={`item-tab ${activeTabItem === item.id ? "tab-active" : ""}`}>
                                {item.name}
                            </div>
                        })
                    }
                </div>
                <div className="header-tarifs">
                    {
                        priceList.map((item, index) => {
                            return <div key={index} onClick={() => {
                                setActiveTabItem2(index)
                            }}
                                        className={`item-tab ${activeTabItem2 === index ? "tab-active" : ""}`}>
                                {item.category && item.category.translations[i18next.language].name}
                            </div>
                        })
                    }
                </div>
                <div className="body">
                    <div className="left-side">
                        <div className="form-box">
                            <label htmlFor="from">{t("from")}</label>
                            <select onChange={(e) => {
                                setFromLocation(e.target.value)
                                getData(activeTabItem, e.target.value, toLocation)
                            }} name="to" id="to">
                                <option value=""></option>
                                {regions.map((item, index) => {
                                    return <option key={index} value={index}>
                                        {item.name}
                                    </option>
                                })}
                            </select>
                        </div>
                        <div className="form-box">
                            <label htmlFor="to">{t("to")}</label>
                            <select onChange={(e) => {
                                setToLocation(e.target.value)
                                getData(activeTabItem, fromLocation, e.target.value)
                            }} name="to" id="to">
                                <option value=""></option>
                                {regions.map((item, index) => {
                                    return <option key={index} value={index}>
                                        {item.name}
                                    </option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="right-side">
                        {priceList[activeTabItem2] && <div className="item-lists">
                            <div className="title-info">
                                <img src={priceList[activeTabItem2].category.icon} alt=""/>
                                <div
                                    className="name">{priceList[activeTabItem2].category.translations[i18next.language].name}</div>
                            </div>
                            <div className="title-info">
                                <div className="price">
                                    {t("price")}
                                    &ensp;
                                    <b>
                                        {priceList[activeTabItem2].cost} {t("sum")}
                                    </b>
                                </div>
                            </div>
                        </div>}

                    </div>
                </div>
            </div>
        </div>
        <div className="home_sections">
            <div className="saction_one">
                <div className="left_side">
                    <div className="top_text">
                        {t("appDriver")}
                    </div>
                    <div className="des">
                        {t("appDriverDes")}
                    </div>
                    <div className="bottom_btns">
                        <a target="_blank" href="https://play.google.com/store/apps/details?id=uz.adataxi.driver">
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
                        <a target="_blank" href="https://apps.apple.com/us/app/adataxi-haydovchi/id6744706101">
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
                    <img src="./images/driver.png" alt=""/>
                </div>
            </div>
        </div>
        <div className="count-wrapper">
            <div className="title">
                {t("countTitle")}
            </div>
            <div className="des">
                {t("countDes")}
            </div>
            <div className="counts">
                <div className="count">
                    <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
                        <div className="num">
                            {counterOn &&
                                <CountUp start={0} end={counter.avilable_drivers && counter.avilable_drivers}
                                         duration={2}
                                         delay={0}/>}
                            +
                        </div>
                    </ScrollTrigger>
                    <div className="text">
                        {t("count1")}
                    </div>
                </div>
                <div className="count">
                    <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
                        <div className="num">
                            {counterOn &&
                                <CountUp start={0} end={counter.clients && counter.clients} duration={2}
                                         delay={0}/>}
                            +
                        </div>
                    </ScrollTrigger>
                    <div className="text">
                        {t("count2")}
                    </div>
                </div>
                <div className="count">
                    <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
                        <div className="num">
                            {counterOn &&
                                <CountUp start={0} end={counter.drivers && counter.drivers}
                                         duration={2}
                                         delay={0}/>}
                            +
                        </div>
                    </ScrollTrigger>
                    <div className="text">
                        {t("count3")}
                    </div>
                </div>
                <div className="count">
                    <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
                        <div className="num">
                            {counterOn &&
                                <CountUp start={0} end={counter.rides && counter.rides} duration={2}
                                         delay={0}/>}
                            +
                        </div>
                    </ScrollTrigger>
                    <div className="text">
                        {t("count4")}
                    </div>
                </div>
            </div>
        </div>
        <div className="home_sections">
            <div className="saction_one-client">
                <div className="right_side">
                    <img src="./images/client.png" alt=""/>
                </div>
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
            </div>
        </div>
        <div className="home_sections">
            <div className="title-comment">
                {t("clientsTitle")}
            </div>

            <div className="carousel-comment">
                <Slider {...settings}>
                    {reviews.map((img, idx) => (
                        <div key={idx} className={idx === imageIndex ? "slide activeSlide" : "slide"}>
                            <img src={img.image} alt={img.image}/>
                        </div>
                    ))}
                </Slider>

                {
                    reviews.map((item, index) => {
                        if (index === imageIndex) {
                            return <div key={index}>

                                <div className="name-person">
                                    {item.name}
                                </div>
                                <div className="des-person">
                                    {item.text}
                                </div>
                            </div>
                        }
                    })
                }
            </div>
        </div>
        <section className="quations-container">
            <div className="title">{t("quationsTitle")}</div>
            {questions.map((item, index) => {
                return <div key={index} className={`quation ${ActiveQuestion === index ? "active" : ""}`}>
                    <div className="top-side">
                        <h1 className="number">
                            0{index + 1}
                        </h1>
                        <h3 className="title">
                            {item.translations[i18next.language].question}
                        </h3>
                        <div onClick={() => {
                            if (ActiveQuestion === index) {
                                setActiveQuestion("")
                            } else setActiveQuestion(index)
                        }} className={`button ${ActiveQuestion === index ? "rotate-icon" : ""}`}>
                            <img src="./images/union.png" alt="quation" loading="lazy"/>
                        </div>
                    </div>
                    {ActiveQuestion === index && <article className="des-quation">
                        {item.translations[i18next.language].text}
                    </article>}
                </div>
            })}
        </section>
        <div className="form-wrapper">
            <div className="title">
                {t("formTitle")}
            </div>
            <div className="des">
                {t("formDes1")}
                &ensp;
                <a href="tel:+998915444499"> +998 91 544 44 99 </a>
                &ensp;
                {t("formDes2")}
            </div>
            <div className="form-box">
                <div className="input-box">
                    <label htmlFor="name">
                        {t("name")}
                    </label>
                    <input value={full_name} onChange={(e) => setFullName(e.target.value)} id="name"
                           placeholder="M-n: Dilshodbek Hakimov" type="text"/>
                </div>
                <div className="input-box">
                    <label htmlFor="name">
                        {t("phone")}
                    </label>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} id="name" placeholder={t("phone")}
                           type="number"/>
                </div>
                <div onClick={sendApp} className="send-btn">
                    {t("send")}
                </div>
            </div>
        </div>
        <Footer/>
    </div>
}
export default Home