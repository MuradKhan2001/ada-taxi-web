import {useCallback, useEffect, useRef, useState, useMemo, useContext} from "react";
import {CSSTransition} from "react-transition-group";
import {useFormik} from "formik";
import ReactPaginate from "react-paginate";
import {
    TextField,
    MenuItem,
    InputLabel,
    FormControl,
    Select
} from "@mui/material";
import "./style.scss"

const Service = () => {
    const [modalShow, setModalShow] = useState({show: false, status: false});
    const nodeRef = useRef(null);
    const ref = useRef(null);
    const [driversList, setDriversList] = useState([{}]);
    const [includedCars, setIncludedCars] = useState("");


    const worksPage = 100;
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * worksPage;

    const productList = driversList.slice(pagesVisited, pagesVisited + worksPage).map((item, index) => {
        return <tr key={index}>
            <td>1</td>
            <td>
                Standart
            </td>

            <td>
                Spark,
                Nexia 3,
                Lacceti
            </td>

            <td>4100</td>
            <td>3500.0</td>
            <td>600.0</td>
            <td>400.0</td>
            <td> 3</td>
            <td>
                <div className="icon">
                    <img src="./images/admin/delete.png" alt=""/>
                </div>
            </td>
            <td>
            </td>
            <div className="edit-icon">
                <img onClick={() => {
                    setModalShow({show: true, status: "edit-driver"});
                }} src="./images/admin/edit-tools.png" alt=""/>
            </div>
        </tr>
    });

    const pageCount = Math.ceil(driversList.length / worksPage);

    const changePage = ({selected}) => {
        setPageNumber(selected)

        setTimeout(() => {
            ref.current?.scrollIntoView({behavior: "smooth"});
        }, 500);
    };

    const validate = (values) => {
        const errors = {};

        if (!values.first_name) {
            errors.first_name = "Required";
        }

        if (!values.last_name) {
            errors.last_name = "Required";
        }

        if (!values.phone) {
            errors.phone = "Required";
        }

        if (!values.car_model) {
            errors.car_model = "Required";
        }

        if (!values.car_name) {
            errors.car_name = "Required";
        }

        if (!values.car_number) {
            errors.car_number = "Required";
        }

        if (!values.car_manufactured_date) {
            errors.car_manufactured_date = "Required";
        }

        if (!values.car_tex_passport_date) {
            errors.car_tex_passport_date = "Required";
        }

        if (!values.license_date) {
            errors.license_date = "Required";
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            service:"",
            start_price:"",
            price_per_km:"",
            price_per_min:"",
            wait_price_per_min:"",
            free_wait_time:""
        },
        validate,
        onSubmit: (values) => {
            if (includedCars) {
                sendAllInfo()
            }
        },
    });


    const sendAllInfo = () => {
        let allInfo = {
            service: formik.values.service,
            includedCars: includedCars,
            start_price: formik.values.start_price,
            price_per_km: formik.values.price_per_km,
            price_per_min: formik.values.price_per_min,
            wait_price_per_min: formik.values.wait_price_per_min,
            free_wait_time: formik.values.free_wait_time
        }
        console.log(allInfo);
    }


    return <div className="service-container">
        <CSSTransition
            in={modalShow.show}
            nodeRef={nodeRef}
            timeout={300}
            classNames="alert"
            unmountOnExit
        >
            <div className="modal-sloy">
                <div ref={nodeRef} className="modal-card">

                    {modalShow.status === "add-driver" && (
                        <div className="add-driver">
                            <div className="cancel-btn">
                                <img
                                    onClick={() => setModalShow({status: "", show: false})}
                                    src="./images/admin/x.png"
                                    alt=""
                                />
                            </div>

                            <div className="title">Tarif qo'shish</div>

                            <div className="title-form">Tarif ma'lumotlari:</div>

                            <div className="form-container">

                                <div className="select-box">
                                    <div className="select-sides">
                                        <TextField
                                            error={formik.errors.service === "Required"}
                                            value={formik.values.service}
                                            onChange={formik.handleChange}
                                            name="service"
                                            type="text"
                                            sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                                            label="Tarif nomi" variant="outlined" className="textField"/>
                                    </div>

                                    <div className="select-sides">
                                        <FormControl sx={{m: 1, minWidth: "100%"}} size="small" className="selectMui">
                                            <InputLabel id="demo-select-large-label">Tarifga kiruvchi
                                                mashinalar:</InputLabel>
                                            <Select
                                                error={includedCars ? false : true}
                                                labelid="demo-select-small-label"
                                                id="demo-select-small"
                                                value={includedCars}
                                                label="Tarifga kiruvchi mashinalar:"
                                                onChange={(e) => setIncludedCars(e.target.value)}
                                            >
                                                <MenuItem value="oq">Nexia</MenuItem>
                                                <MenuItem value="qora">Lacetti</MenuItem>
                                                <MenuItem value="qizil">Malibu</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>

                                <div className="select-box">
                                    <div className="select-sides">
                                        <TextField
                                            error={formik.errors.start_price === "Required"}
                                            value={formik.values.start_price}
                                            onChange={formik.handleChange}
                                            name="start_price"
                                            type="text"
                                            sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                                            label="Boshlash narxi" variant="outlined" className="textField"/>
                                    </div>
                                    <div className="select-sides">
                                        <TextField
                                            error={formik.errors.price_per_km === "Required"}
                                            value={formik.values.price_per_km}
                                            onChange={formik.handleChange}
                                            name="price_per_km"
                                            type="text"
                                            sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                                            label="Narx (km)" variant="outlined" className="textField"/>
                                    </div>
                                </div>

                                <div className="select-box">
                                    <div className="select-sides">
                                        <TextField
                                            error={formik.errors.price_per_min === "Required"}
                                            value={formik.values.price_per_min}
                                            onChange={formik.handleChange}
                                            name="price_per_min"
                                            type="text"
                                            sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                                            label="Narx (min)" variant="outlined" className="textField"/>
                                    </div>
                                    <div className="select-sides">
                                        <TextField
                                            error={formik.errors.wait_price_per_min === "Required"}
                                            value={formik.values.wait_price_per_min}
                                            onChange={formik.handleChange}
                                            name="wait_price_per_min"
                                            type="text"
                                            sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                                            label="Kutish uchun narx (min)" variant="outlined" className="textField"/>
                                    </div>
                                </div>

                                <div className="select-box">
                                    <div className="select-sides">
                                        <TextField
                                            error={formik.errors.free_wait_time === "Required"}
                                            value={formik.values.free_wait_time}
                                            onChange={formik.handleChange}
                                            name="free_wait_time"
                                            type="text"
                                            sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                                            label="Tekin kutish vaqti" variant="outlined" className="textField"/>
                                    </div>
                                </div>

                                <div className="add-btn">
                                    Tarif qo'shish
                                </div>

                            </div>
                        </div>
                    )}

                    {modalShow.status === "edit-driver" && (
                        <div className="edit-driver">
                            <div className="cancel-btn">
                                <img
                                    onClick={() => setModalShow({status: "", show: false})}
                                    src="./images/admin/x.png"
                                    alt=""
                                />
                            </div>

                            <div className="title">Tarifni tahrirlash</div>

                            <div className="title-form">Tarif ma'lumotlari:</div>

                            <div className="form-container">

                                <div className="select-box">
                                    <div className="select-sides">
                                        <TextField
                                            error={formik.errors.service === "Required"}
                                            value={formik.values.service}
                                            onChange={formik.handleChange}
                                            name="service"
                                            type="text"
                                            sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                                            label="Tarif nomi" variant="outlined" className="textField"/>
                                    </div>

                                    <div className="select-sides">
                                        <FormControl sx={{m: 1, minWidth: "100%"}} size="small" className="selectMui">
                                            <InputLabel id="demo-select-large-label">Tarifga kiruvchi
                                                mashinalar:</InputLabel>
                                            <Select
                                                error={includedCars ? false : true}
                                                labelid="demo-select-small-label"
                                                id="demo-select-small"
                                                value={includedCars}
                                                label="Tarifga kiruvchi mashinalar:"
                                                onChange={(e) => setIncludedCars(e.target.value)}
                                            >
                                                <MenuItem value="oq">Nexia</MenuItem>
                                                <MenuItem value="qora">Lacetti</MenuItem>
                                                <MenuItem value="qizil">Malibu</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>

                                <div className="select-box">
                                    <div className="select-sides">
                                        <TextField
                                            error={formik.errors.start_price === "Required"}
                                            value={formik.values.start_price}
                                            onChange={formik.handleChange}
                                            name="start_price"
                                            type="text"
                                            sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                                            label="Boshlash narxi" variant="outlined" className="textField"/>
                                    </div>
                                    <div className="select-sides">
                                        <TextField
                                            error={formik.errors.price_per_km === "Required"}
                                            value={formik.values.price_per_km}
                                            onChange={formik.handleChange}
                                            name="price_per_km"
                                            type="text"
                                            sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                                            label="Narx (km)" variant="outlined" className="textField"/>
                                    </div>
                                </div>

                                <div className="select-box">
                                    <div className="select-sides">
                                        <TextField
                                            error={formik.errors.price_per_min === "Required"}
                                            value={formik.values.price_per_min}
                                            onChange={formik.handleChange}
                                            name="price_per_min"
                                            type="text"
                                            sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                                            label="Narx (min)" variant="outlined" className="textField"/>
                                    </div>
                                    <div className="select-sides">
                                        <TextField
                                            error={formik.errors.wait_price_per_min === "Required"}
                                            value={formik.values.wait_price_per_min}
                                            onChange={formik.handleChange}
                                            name="wait_price_per_min"
                                            type="text"
                                            sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                                            label="Kutish uchun narx (min)" variant="outlined" className="textField"/>
                                    </div>
                                </div>

                                <div className="select-box">
                                    <div className="select-sides">
                                        <TextField
                                            error={formik.errors.free_wait_time === "Required"}
                                            value={formik.values.free_wait_time}
                                            onChange={formik.handleChange}
                                            name="free_wait_time"
                                            type="text"
                                            sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                                            label="Tekin kutish vaqti" variant="outlined" className="textField"/>
                                    </div>
                                </div>

                                <div className="add-btn">
                                   Tasdiqlash
                                </div>

                            </div>
                        </div>
                    )}

                </div>

            </div>
        </CSSTransition>

        <div className="header">


            <div onClick={() => {
                setModalShow({show: true, status: "add-driver"});
            }} className="add-driver-btn">
                Tarif qo'shish
            </div>

        </div>

        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Nomi</th>
                <th>Moshinalar</th>
                <th>Boshlash narxi</th>
                <th>Narx km</th>
                <th>Narx min</th>
                <th>Kutish narxi min</th>
                <th>Tekin kutish vaqti</th>
                <th>O'chirish</th>
                <th></th>
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

export default Service