import {useEffect, useRef, useState, useMemo, useContext} from "react";
import ReactPaginate from "react-paginate";
import "./style.scss"
import {CSSTransition} from "react-transition-group";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";

const Orders = () => {
    const [modalShow, setModalShow] = useState({show: false, status: false});
    const nodeRef = useRef(null);
    const ref = useRef(null);
    const [driversList, setDriversList] = useState([{}]);
    const worksPage = 100;
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * worksPage;

    const productList = driversList.slice(pagesVisited, pagesVisited + worksPage).map((item, index) => {
        return <tr key={index}>
            <td>1</td>

            <td>
                <div className="text-driver">
                    <div className="name"> MMM AAAA DDD</div>
                    <div className="phone">
                        99 999 99 99
                    </div>
                </div>
            </td>

            <td>
                <div className="text-driver">
                    <div className="name"> MMM AAAA DDD</div>
                    <div className="phone">
                        99 999 99 99
                    </div>
                </div>
            </td>

            <td>
                Comford
            </td>

            <td>
                Lorem ipsum dolor sit amet.
            </td>

            <td>
               Service1, Service2
            </td>

            <td>
                <div className="icon">
                    <img onClick={() => {
                        setModalShow({show: true, status: "car-information"});
                    }} src="./images/admin/document.png" alt=""/>
                </div>
            </td>
        </tr>
    });

    const pageCount = Math.ceil(driversList.length / worksPage);

    const changePage = ({selected}) => {
        setPageNumber(selected)

        setTimeout(() => {
            ref.current?.scrollIntoView({behavior: "smooth"});
        }, 500);
    };

    return <div className="orders-container">

        <CSSTransition
            in={modalShow.show}
            nodeRef={nodeRef}
            timeout={300}
            classNames="alert"
            unmountOnExit
        >
            <div className="modal-sloy">
                <div ref={nodeRef} className="modal-card">
                    {modalShow.status === "car-information" && (
                        <div className="car-information">
                            <div className="cancel-btn">
                                <img
                                    onClick={() => setModalShow({status: "", show: false})}
                                    src="./images/admin/x.png"
                                    alt=""
                                />
                            </div>
                            <div className="title">
                                Avtomobil ma'lumotlari
                            </div>


                            <div className="information">
                                <div className="info">
                                    <div className="title">Moshina modeli:</div>
                                    <div className="text">Chevrolet</div>
                                </div>

                                <div className="info">
                                    <div className="title">Moshina nomi:</div>
                                    <div className="text">Malibu 2</div>
                                </div>

                                <div className="info">
                                    <div className="title">Moshina raqami:</div>
                                    <div className="text">AB288B</div>
                                </div>

                                <div className="info">
                                    <div className="title">Moshina rangi:</div>
                                    <div className="text">Qora</div>
                                </div>

                                <div className="info">
                                    <div className="title">Ro'yxatdan o'tgan sana:</div>
                                    <div className="text">20.10.2024</div>
                                </div>

                                <div className="info">
                                    <div className="title">Tex passport berilgan sana:</div>
                                    <div className="text">02.05.2024</div>
                                </div>

                                <div className="info">
                                    <div className="title">Ruxsotnoma berilgan sana:</div>
                                    <div className="text">21.05.2024</div>
                                </div>

                                <div className="info">
                                    <div className="title">Yuk orta olishi:</div>
                                    <div className="text">Yo'q</div>
                                </div>

                                <div className="info">
                                    <div className="title">Kondisaner:</div>
                                    <div className="text">Bor</div>
                                </div>

                                <div className="info">
                                    <div className="title">Tasdiqlanganmi:</div>
                                    <div className="text">Ha</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </CSSTransition>

        <div className="header">
            <div className="search-box">
                <img src="./images/admin/search.png" alt=""/>
                <input placeholder="Telefon raqam kiriting" type="text"/>
            </div>

            <div className="statisitcs">
                <div className="statistic-box">
                    <div className="name">Faol buyurtmalar</div>
                    <div className="num">232</div>
                </div>

                <div className="statistic-box">
                    <div className="name">Tugallangan</div>
                    <div className="num">2322</div>
                </div>

                <div className="statistic-box">
                    <div className="name">Jarayonda</div>
                    <div className="num">222</div>
                </div>
            </div>
        </div>

        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Haydovchi</th>
                <th>Mijoz</th>
                <th>Tarif</th>
                <th>Bekor bolish sababi</th>
                <th>Xizmatlat</th>
                <th>Qo'shimcha ma'lumotlar</th>
            </tr>

            </thead>

            <tbody>
            {productList}
            </tbody>
        </table>

        <div className="pagination">
            {driversList.length > 100 ? <ReactPaginate
                breakLabel="..."
                previousLabel={<img src="./images/admin/prev.png" alt=""/>}
                nextLabel={<img src="./images/admin/next.png" alt=""/>}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledCalassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            /> : ""}
        </div>

    </div>
}

export default Orders