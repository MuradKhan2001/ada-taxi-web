import "./style.scss";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

const Footer = () => {
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

    return <>
        <div className="footer-container">

            <div className="section-logo">
                <img src="./images/logo2.png" alt=""/>
            </div>

            <div className="section-contact">
                <div className="title-footer">
                    Есть вопросы звоните ?
                </div>
                <div className="item-footer">
                    +998 94 009 09 06
                </div>
                <div className="item-footer">
                    test02@gmail.com
                </div>
                <div className="title-footer">
                    Помощь
                </div>
                <div className="item-footer">
                    Обучательные страницы
                </div>
            </div>

            <div className="section-menu">
                <div className="title-footer">
                    О компании
                </div>
                {
                    menu.map((item, index)=>{
                        return  <div key={index} onClick={() => {
                            navigate(item.link)
                            setTimeout(()=>{
                                if (item.id === 2) {
                                    window.scrollTo(0, 2200)
                                }
                                if (item.id === 3) {
                                    window.scrollTo(0, 1300)
                                }
                                if (item.id === 4) {
                                    window.scrollTo(0, 0)
                                }
                                if (item.id === 1) {
                                    window.scrollTo(0, 0)
                                }
                            },200)
                        }} className="item-footer">
                            {item.name}
                        </div>
                    })
                }
            </div>

            <div className="section-social-medias">
                <div className="title-footer">
                    Соц. Сети
                </div>

                <div className="icons-box">
                    <img src="./images/instagram1.png" alt=""/>
                    <img src="./images/telegram1.png" alt=""/>
                    <img src="./images/facebook1.png" alt=""/>
                </div>

               <div className="btns">
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
        </div>
    </>
};

export default Footer;