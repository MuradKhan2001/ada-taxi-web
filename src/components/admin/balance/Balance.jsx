import {useCallback, useEffect, useRef, useState, useMemo, useContext} from "react";
import ReactPaginate from "react-paginate";
import "./style.scss"

const Balance = () => {
    const ref = useRef(null);
    const [driversList, setDriversList] = useState([{}]);
    const worksPage = 100;
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * worksPage;

    const productList = driversList.slice(pagesVisited, pagesVisited + worksPage).map((item, index) => {
        return <tr key={index}>
            <td>1</td>
            <td className="driver-wrapper">
                <div className="icon-driver">
                    <img src="./images/admin/person.jpg" alt=""/>
                </div>
                <div className="text-driver">
                    <div className="name"> MMM AAAA DDD</div>
                    <div className="phone">
                        99 999 99 99
                    </div>
                </div>
            </td>
            <td>
                01 Z777ZZ
            </td>
            <td>
                593036
            </td>
            <td>
                44750.0
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


    return <div className="balance-container">

        <div className="header">
            <div className="search-box">
                <img src="./images/admin/search.png" alt=""/>
                <input placeholder="Telefon raqam kiriting" type="text"/>
            </div>

        </div>

        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Haydovchi</th>
                <th>Avtomobil raqami</th>
                <th>Id raqam</th>
                <th>Narx</th>

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

export default Balance