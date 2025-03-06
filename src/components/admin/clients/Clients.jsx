import {useCallback, useEffect, useRef, useState, useMemo, useContext} from "react";
import {CSSTransition} from "react-transition-group";
import {useFormik} from "formik";
import ImageViewer from 'react-simple-image-viewer';
import ReactPaginate from "react-paginate";
import {
    TextField,
    MenuItem,
    InputLabel,
    FormControl,
    Select
} from "@mui/material";
import "./style.scss"

const Clients = () => {
    const [modalShow, setModalShow] = useState({show: false, status: false});
    const nodeRef = useRef(null);
    const ref = useRef(null);
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [photoBox, setPhotoBox] = useState([]);
    const [driversList, setDriversList] = useState([{}]);

    const [profileImage, setProfileImage] = useState(null);
    const [car_color, setCar_color] = useState("");
    const [luggage, setLuggage] = useState(false);
    const [airconditioner, setAirconditioner] = useState(false);
    const [inmark, setInMark] = useState(false)
    const [car_images, setCar_images] = useState(null);
    const [car_tex_passport_images, setCar_tex_passport_images] = useState(null);
    const [license_images, setLicenseImages] = useState(null);


    const worksPage = 100;
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * worksPage;

    const productList = driversList.slice(pagesVisited, pagesVisited + worksPage).map((item, index) => {
        return <tr key={index}>
            <td>1</td>
            <td className="driver-wrapper">
                <div className="icon-driver">
                    <img onClick={() => {
                        setModalShow({show: true, status: "driver-photo"});
                    }} src="./images/admin/person.jpg" alt=""/>
                </div>
                <div className="text-driver">
                    <div className="name"> MMM AAAA DDD</div>
                </div>
            </td>
            <td>
               99 999 99 99
            </td>
            <td>
                <div className="icon-check">
                    <img src="./images/admin/check.png" alt=""/>
                </div>
            </td>
            <td>
                <div className="icon-check">
                    <img onClick={() => {
                        setModalShow({show: true, status: "blocked"});
                    }} src="./images/admin/block.png" alt=""/>
                    <div className="reason-block">
                        <img src="./images/admin/warning.png" alt=""/>
                        <div className="text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, possimus.
                        </div>
                    </div>
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
            first_name: "",
            last_name: "",
            phone: "",
            car_model: "",
            car_name: "",
            car_number: "",
            car_manufactured_date: null,
            car_tex_passport_date: null,
            license_date: null
        },
        validate,
        onSubmit: (values) => {
            if (profileImage && car_color && car_images && car_tex_passport_images && license_images) {
                sendAllInfo()
            }
        },
    });

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    const getInputPhoto = (event) => {

        const {target: {files}} = event;
        const file = files[0];

        function getBase64(file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                setProfileImage(reader.result);
            };
            reader.onerror = function () {
                setProfileImage(null);
            };

        }

        getBase64(file);
    };

    const getInputDocs = (event) => {

        if (event.target.name == "car_images") {

        }

        if (event.target.name == "car_tex_passport_images") {

        }

        if (event.target.name == "license_images") {

        }


        //
        // const {target: {files}} = event;
        // const file = files[0];
        //
        // function getBase64(file) {
        //     const reader = new FileReader();
        //     reader.readAsDataURL(file);
        //     reader.onload = function () {
        //         setProfileImage(reader.result);
        //     };
        //     reader.onerror = function () {
        //         setProfileImage(null);
        //     };
        //
        // }
        //
        // getBase64(file);
    };

    const sendAllInfo = () => {
        let allInfo = {
            first_name: formik.values.first_name,
            last_name: formik.values.last_name,
            phone: formik.values.phone,
            profile_image: profileImage,
            car_model: formik.values.car_model,
            car_name: formik.values.car_name,
            car_number: formik.values.car_number,
            car_color: car_color,
            car_manufactured_date: formik.values.car_manufactured_date,
            car_tex_passport_date: formik.values.car_tex_passport_date,
            license_date: formik.values.license_date,
            luggage: luggage,
            aircoditioner: airconditioner,
            inmark: inmark,
            car_images: car_images,
            car_tex_passport_images: car_tex_passport_images,
            license_images: license_images,
        }
        console.log(allInfo);
    }


    return <div className="clients-container">
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

                            <div className="title">Mijoz qo'shish</div>

                            <div className="title-form">Mijoz ma'lumotlari:</div>

                            <div className="form-container">
                                <div className="select-box">
                                    <div className="select-sides-file">
                                        <input onChange={getInputPhoto} type="file"/>
                                        <div className={`sloy-image ${profileImage ? "active" : ""}`}>
                                            Profil rasmi
                                            <img src="./images/admin/image.png" alt=""/>
                                        </div>
                                    </div>

                                    <div className="select-sides">
                                        <TextField
                                            error={formik.errors.first_name === "Required"}
                                            value={formik.values.first_name}
                                            onChange={formik.handleChange}
                                            name="first_name"
                                            type="text"
                                            sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                                            label="Ism" variant="outlined" className="textField"/>
                                    </div>
                                </div>
                                <div className="select-box">
                                    <div className="select-sides">
                                        <TextField
                                            error={formik.errors.last_name === "Required"}
                                            value={formik.values.last_name}
                                            onChange={formik.handleChange}
                                            name="last_name"
                                            type="text"
                                            sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                                            label="Familiya" variant="outlined" className="textField"/>
                                    </div>
                                    <div className="select-sides">
                                        <TextField
                                            error={formik.errors.phone === "Required"}
                                            value={formik.values.phone}
                                            onChange={formik.handleChange}
                                            name="phone"
                                            type="text"
                                            sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                                            label="Telefon raqam" variant="outlined" className="textField"/>
                                    </div>
                                </div>
                            </div>

                            <div className="add-btn">
                                Qo'shish
                            </div>
                        </div>
                    )}

                    {modalShow.status === "driver-photo" && (
                        <div className="driver-photo">
                            <div className="cancel-btn">
                                <img
                                    onClick={() => setModalShow({status: "", show: false})}
                                    src="./images/admin/x.png"
                                    alt=""
                                />
                            </div>

                            <div className="photo">
                                <img src="./images/admin/person.jpg" alt=""/>
                            </div>
                        </div>
                    )}

                    {modalShow.status === "blocked" && (
                        <div className="blocked">
                            <div className="title">
                                Mijozni bloklash
                            </div>

                            <div className="reason-text">
                                <textarea placeholder="Blok qilish sababini kiriting..." name="" id=""></textarea>

                                <div className="buttons">
                                    <div onClick={() => setModalShow({status: "", show: false})}
                                         className="cancel">Bekor qilish
                                    </div>
                                    <div className="success">Bloklash</div>
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

                            <div className="title">Mijoz ma'lumotlarini tahrirlash</div>

                            <div className="title-form">Mijoz ma'lumotlari:</div>

                            <div className="form-container">
                                <div className="select-box">
                                    <div className="select-sides-file">
                                        <input onChange={getInputPhoto} type="file"/>
                                        <div className={`sloy-image ${profileImage ? "active" : ""}`}>
                                            Profil rasmi
                                            <img src="./images/admin/image.png" alt=""/>
                                        </div>
                                    </div>

                                    <div className="select-sides">
                                        <TextField
                                            error={formik.errors.first_name === "Required"}
                                            value={formik.values.first_name}
                                            onChange={formik.handleChange}
                                            name="first_name"
                                            type="text"
                                            sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                                            label="Ism" variant="outlined" className="textField"/>
                                    </div>
                                </div>
                                <div className="select-box">
                                    <div className="select-sides">
                                        <TextField
                                            error={formik.errors.last_name === "Required"}
                                            value={formik.values.last_name}
                                            onChange={formik.handleChange}
                                            name="last_name"
                                            type="text"
                                            sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                                            label="Familiya" variant="outlined" className="textField"/>
                                    </div>
                                    <div className="select-sides">
                                        <TextField
                                            error={formik.errors.phone === "Required"}
                                            value={formik.values.phone}
                                            onChange={formik.handleChange}
                                            name="phone"
                                            type="text"
                                            sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                                            label="Telefon raqam" variant="outlined" className="textField"/>
                                    </div>
                                </div>
                            </div>

                            <div className="add-btn">
                               Tahrirlash
                            </div>
                        </div>
                    )}

                </div>

            </div>
        </CSSTransition>

        <div className="open-viewer">
            {isViewerOpen && (
                <ImageViewer
                    src={photoBox.map((item) => item.image)}
                    currentIndex={currentImage}
                    disableScroll={false}
                    closeOnClickOutside={true}
                    onClose={closeImageViewer}
                />
            )}
        </div>


        <div className="header">

            <div className="search-box">
                <img src="./images/admin/find-person.png" alt=""/>
                <input placeholder="Telefon raqam kiriting" type="text"/>
            </div>

            <div onClick={() => {
                setModalShow({show: true, status: "add-driver"});
            }} className="add-driver-btn">
                Mijoz qo'shish
            </div>

        </div>

        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Mijoz haqida</th>
                <th>Telefon raqam</th>
                <th>Tasdiqlash</th>
                <th>Bloklash</th>
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

export default Clients