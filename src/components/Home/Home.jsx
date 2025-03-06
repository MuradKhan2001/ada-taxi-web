import "./style.scss";
import Navbar from "../Navbar/Navbar";
import {useState} from "react";
import Slider from "react-slick";
import Footer from "../footer/Footer";

const Home = () => {

    const [activeTabItem, setActiveTabItem] = useState(1)
    const tabList = [
        {
            id: 1, name: "Эконом"
        },
        {
            id: 2, name: "Старт"
        }
        , {
            id: 3, name: "Комфорт"
        },
        {
            id: 4, name: "Бизнес"
        },
        {
            id: 5, name: "Быстрый"
        }

    ]
    const persons = [
        {
            img:"./images/person1.png",
            name:"Роман Тимошенко",
            commit:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, maiores!"
        },
        {
            img:"./images/person2.png",
            name:"Сергѐй Тара̀сик",
            commit:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, maiores! consectetur adipisicing elit. Deleniti, maiores"
        },
        {
            img:"./images/person3.png",
            name:"Ю̀рий Станисла̀в ",
            commit:"Lorem ipsum dolor sit amet,  Deleniti, maiores!"
        },
        {
            img:"./images/person4.png",
            name:"На̀стя Андрейева",
            commit:"Lorem ipsum dolor sit amet, consectetur adipisicing elit consectetur adipisicing elit. Deleniti, maiores!"
        },
        {
            img:"./images/person5.png",
            name:" Анна Ярикова",
            commit:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, maiores! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, maiores!"
        },
        {
            img:"./images/person6.jpg",
            name:"Ро̀ма Ростисла̀в",
            commit:"Lorem ipsum dolor sit amet."
        }
    ]
    const [imageIndex, setImageIndex] = useState(0);

    const settings = {
        lazyLoad: true,
        slidesToShow: 5,
        dots: false,
        infinite: true,
        speed: 1000,
        autoplay: true,
        slidesToScroll: 1,
        initialSlide: 1,
        centerMode: true,
        centerPadding: 0,
        beforeChange: (current, next) => setImageIndex(next),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const settingsTwo = {
        lazyLoad: true,
        slidesToShow: 1,
        dots: false,
        infinite: true,
        speed: 1000,
        autoplay: true,
        slidesToScroll: 1,
        initialSlide: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return <div className="home-wrapper">

        <div className="home_page">
            <div className="navbar_box">
                <Navbar/>
            </div>

            <div className="home_contents">
                <div className="left_side">
                    <div className="home_text">
                        Стань водителем на
                        <span>своих условиях</span>
                    </div>
                </div>
                <div className="right_side">
                    <div className="home_form_box">
                        <div className="title_form">
                            Подтвердите ваш номер
                            телефона и заполните заявку
                        </div>
                        <div className="input_box">
                            <label htmlFor="region">Выберите свой город</label>
                            <select name="region" id="region">
                                <option  value="0">Ваш город</option>
                                <option value="1">Toshkent</option>
                                <option value="2">Samarqand</option>
                            </select>
                        </div>
                        <div className="input_box">
                            <label htmlFor="phone_number">Введите номер телефона</label>
                            <input placeholder="+998 (__)" id="phone_number" type="text"/>
                        </div>

                        <div className="description_form">
                            Отправляя заявку, вы принимаете Политику конфиденциальности
                            и соглашаетесь получать маркетинговые звонки и SMS от perfect taxi,
                            а также соглашаетесь на переписку с нами в телеграмм.
                        </div>

                        <button type="button" className="send_btn">
                            <img src="./images/checkmark.png" alt=""/>
                            Получить код
                        </button>
                    </div>
                </div>

                <div className="left_side_mobile">
                    <div className="home_text">
                        Стань водителем на
                        <span>своих условиях</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="home_sections">
            <div className="title_home_one">
                <div className="text_title">
                    Наше приложение <span>perfect</span> taxi
                </div>
                <div className="line_title"></div>
            </div>

            <div className="saction_one">
                <div className="left_side">
                    <div className="top_text">
                        Скачайте наше
                        бесплатное приложение <span>perfect</span> taxi
                    </div>

                    <div className="bottom_btns">
                        <div className="app-btn">
                            <div className="left">
                                <img src="./images/google-play2.png" alt=""/>
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
                        <div className="app-btn">
                            <div className="left">
                                <img src="./images/apple-logo2.png" alt=""/>
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
                    </div>
                </div>
                <div className="right_side">
                    <img src="./images/Приложение.png" alt=""/>
                </div>
            </div>

            <div className="title_home_two">
                <div className="text_title">
                    Тарифы
                </div>
                <div className="line_title"></div>
            </div>
        </div>

        <div className="section_two">
            <div className="main_card">
                <div className="header">
                    {
                        tabList.map((item, index) => {
                            return <div key={index} onClick={() => setActiveTabItem(item.id)}
                                        className={`item-tab ${activeTabItem === item.id ? "tab-active" : ""}`}>
                                {item.name}
                            </div>
                        })
                    }
                </div>
                <div className="body">
                    <div className="left-side">
                        <div className="top-text">
                            Минимальная стоимость (включено 3
                            мин и 1 км) — 3600сум
                        </div>
                        <div className="bottom-text">
                            Минимальная стоимость
                            —
                            не более 3600сум
                            Бесплатное ожидание
                            —
                            3 мин
                            Платное ожидание
                            —
                            не более 500сум/мин
                            Далее по городу
                            —
                            не более 850сум/км
                            ,
                            не более 365сум/мин
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="item-lists">
                            <div className="title-info">
                                Далее за пределами города
                            </div>
                            <div className="title-info">
                                не более 2000сум/км
                            </div>
                        </div>
                        <div className="item-lists">
                            <div className="title-info">
                                Далее за пределами города
                            </div>
                            <div className="title-info">
                                не более 2000сум/км
                            </div>
                        </div>
                        <div className="item-lists">
                            <div className="title-info">
                                Перевозка домашнего животного
                            </div>
                            <div className="title-info">
                                не более 2000сум/км
                            </div>
                        </div>
                        <div className="item-lists">
                            <div className="title-info">
                                Общаюсь только текстом
                            </div>
                            <div className="title-info">
                                не более 2000сум/км
                            </div>
                        </div>
                        <div className="item-lists">
                            <div className="title-info">
                                Буду с инвалидным креслом
                            </div>
                            <div className="title-info">
                                не более 2000сум/км
                            </div>
                        </div>
                        <div className="item-lists">
                            <div className="title-info">
                                Не говорю, но слышу
                            </div>
                            <div className="title-info">
                                не более 2000сум/км
                            </div>
                        </div>
                        <div className="item-lists">
                            <div className="title-info">
                                Помогите найти машину
                            </div>
                            <div className="title-info">
                                не более 2000сум/км
                            </div>
                        </div>
                        <div className="item-lists">
                            <div className="title-info">
                                Ожидание в пути
                            </div>
                            <div className="title-info">
                                не более 2000сум/км
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mobile-main-card">
                <Slider {...settingsTwo}>
                    <div className="slide-box">
                        <div className="slide">
                            <div className="header">
                                <div className="tab-active item-tab">
                                    Эконом
                                </div>
                            </div>
                            <div className="body">
                                <div className="left-side">
                                    <div className="top-text">
                                        Минимальная стоимость (включено 3
                                        мин и 1 км) — 3600сум
                                    </div>
                                    <div className="bottom-text">
                                        Минимальная стоимость
                                        —
                                        не более 3600сум
                                        Бесплатное ожидание
                                        —
                                        3 мин
                                        Платное ожидание
                                        —
                                        не более 500сум/мин
                                        Далее по городу
                                        —
                                        не более 850сум/км
                                        ,
                                        не более 365сум/мин
                                    </div>
                                </div>
                                <div className="right-side">
                                    <div className="item-lists">
                                        <div className="title-info">
                                            Далее за пределами города
                                        </div>
                                        <div className="title-info">
                                            не более 2000сум/км
                                        </div>
                                    </div>
                                    <div className="item-lists">
                                        <div className="title-info">
                                            Далее за пределами города
                                        </div>
                                        <div className="title-info">
                                            не более 2000сум/км
                                        </div>
                                    </div>
                                    <div className="item-lists">
                                        <div className="title-info">
                                            Перевозка домашнего животного
                                        </div>
                                        <div className="title-info">
                                            не более 2000сум/км
                                        </div>
                                    </div>
                                    <div className="item-lists">
                                        <div className="title-info">
                                            Общаюсь только текстом
                                        </div>
                                        <div className="title-info">
                                            не более 2000сум/км
                                        </div>
                                    </div>
                                    <div className="item-lists">
                                        <div className="title-info">
                                            Буду с инвалидным креслом
                                        </div>
                                        <div className="title-info">
                                            не более 2000сум/км
                                        </div>
                                    </div>
                                    <div className="item-lists">
                                        <div className="title-info">
                                            Не говорю, но слышу
                                        </div>
                                        <div className="title-info">
                                            не более 2000сум/км
                                        </div>
                                    </div>
                                    <div className="item-lists">
                                        <div className="title-info">
                                            Помогите найти машину
                                        </div>
                                        <div className="title-info">
                                            не более 2000сум/км
                                        </div>
                                    </div>
                                    <div className="item-lists">
                                        <div className="title-info">
                                            Ожидание в пути
                                        </div>
                                        <div className="title-info">
                                            не более 2000сум/км
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="slide-box">
                        <div className="slide">
                            <div className="header">
                                <div className="tab-active item-tab">
                                    Перевозка
                                </div>
                            </div>
                            <div className="body">
                                <div className="left-side">
                                    <div className="top-text">
                                        Минимальная стоимость (включено 3
                                        мин и 1 км) — 3600сум
                                    </div>
                                    <div className="bottom-text">
                                        Минимальная стоимость
                                        —
                                        не более 3600сум
                                        Бесплатное ожидание
                                        —
                                        3 мин
                                        Платное ожидание
                                        —
                                        не более 500сум/мин
                                        Далее по городу
                                        —
                                        не более 850сум/км
                                        ,
                                        не более 365сум/мин
                                    </div>
                                </div>
                                <div className="right-side">
                                    <div className="item-lists">
                                        <div className="title-info">
                                            Далее за пределами города
                                        </div>
                                        <div className="title-info">
                                            не более 2000сум/км
                                        </div>
                                    </div>
                                    <div className="item-lists">
                                        <div className="title-info">
                                            Далее за пределами города
                                        </div>
                                        <div className="title-info">
                                            не более 2000сум/км
                                        </div>
                                    </div>
                                    <div className="item-lists">
                                        <div className="title-info">
                                            Перевозка домашнего животного
                                        </div>
                                        <div className="title-info">
                                            не более 2000сум/км
                                        </div>
                                    </div>
                                    <div className="item-lists">
                                        <div className="title-info">
                                            Общаюсь только текстом
                                        </div>
                                        <div className="title-info">
                                            не более 2000сум/км
                                        </div>
                                    </div>
                                    <div className="item-lists">
                                        <div className="title-info">
                                            Буду с инвалидным креслом
                                        </div>
                                        <div className="title-info">
                                            не более 2000сум/км
                                        </div>
                                    </div>
                                    <div className="item-lists">
                                        <div className="title-info">
                                            Не говорю, но слышу
                                        </div>
                                        <div className="title-info">
                                            не более 2000сум/км
                                        </div>
                                    </div>
                                    <div className="item-lists">
                                        <div className="title-info">
                                            Помогите найти машину
                                        </div>
                                        <div className="title-info">
                                            не более 2000сум/км
                                        </div>
                                    </div>
                                    <div className="item-lists">
                                        <div className="title-info">
                                            Ожидание в пути
                                        </div>
                                        <div className="title-info">
                                            не более 2000сум/км
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        </div>

        <div className="home_sections">
            <div className="title_home_two">
                <div className="text_title">
                    Услуги
                </div>
                <div className="line_title"></div>
            </div>

            <div className="service-container">
                <div className="service-box">
                    <div className="circe">
                        <img src="./images/service1.png" alt=""/>
                    </div>
                    <div className="count">500</div>
                    <div className="name">+ Avaible taxi</div>
                </div>

                <div className="service-box">
                    <div className="circe">
                        <img src="./images/service2.png" alt=""/>
                    </div>
                    <div className="count">900</div>
                    <div className="name">+ Happy Clients</div>
                </div>

                <div className="service-box">
                    <div className="circe">
                        <img src="./images/service3.png" alt=""/>
                    </div>
                    <div className="count">700</div>
                    <div className="name">+ Our Drivers</div>
                </div>

                <div className="service-box">
                    <div className="circe">
                        <img src="./images/service4.png" alt=""/>
                    </div>
                    <div className="count">1800</div>
                    <div className="name">+ Road trip done</div>
                </div>
            </div>

            <div className="description_service">
                <span className="title">
                    Услуги
                </span>
                - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus atque consequatur corporis
                deleniti dignissimos doloremque eos iste labore minima, officia perferendis provident quidem quisquam
                rem sit tempora vel voluptatem. Asperiores consectetur cupiditate distinctio dolorum eaque eligendi
                facere impedit inventore iusto, libero neque nisi officia, optio perferendis quam quia quos ratione rem
                sit suscipit tempora temporibus vel vitae. Alias eum harum odit quos ratione, repellat? A accusamus
                aliquam at atque aut beatae blanditiis consequatur cumque dignissimos enim error et eum, facere facilis
                fugit harum impedit incidunt ipsa ipsam iste iusto maiores minima minus, nobis omnis quae similique
                soluta totam vel voluptatum!
            </div>

            <div className="title_home_two">
                <div className="text_title">
                    Отзовы
                </div>
                <div className="line_title"></div>
            </div>

            <div className="carousel-comment">

                <Slider {...settings}>
                    {persons.map((img, idx) => (
                        <div key={idx} className={idx === imageIndex ? "slide activeSlide" : "slide"}>
                            <img src={img.img} alt={img.img} />
                        </div>
                    ))}
                </Slider>

                {
                    persons.map((item,index)=>{
                        if (index === imageIndex){
                            return <div key={index}>
                                <div className="des-person">
                                    {item.commit}
                                </div>
                                <div className="name-person">
                                    {item.name}
                                </div>
                            </div>
                        }
                    })
                }
            </div>
        </div>

        <Footer/>
    </div>
}
export default Home