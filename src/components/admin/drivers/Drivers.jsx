import {useCallback, useEffect, useRef, useState, useMemo, useContext} from "react";
import {CSSTransition} from "react-transition-group";
import {useFormik} from "formik";
import ImageViewer from 'react-simple-image-viewer';
import ReactPaginate from "react-paginate";
import axios from "axios";
import {
    TextField,
    MenuItem,
    InputLabel,
    FormControl,
    Select
} from "@mui/material";
import "./style.scss"
import {MyContext} from "../../App/App";

const Drivers = () => {
    let value = useContext(MyContext);
    const [modalShow, setModalShow] = useState({show: false, status: false});
    const nodeRef = useRef(null);
    const ref = useRef(null);

    const [driverPhoto, setDriverPhoto] = useState(null);
    const [carInformation, setCarInformation] = useState([]);

    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [photoBox, setPhotoBox] = useState([]);
    const [driversList, setDriversList] = useState([]);

    const [profileImage, setProfileImage] = useState(null);
    const [car_color, setCar_color] = useState("");
    const [luggage, setLuggage] = useState(false);
    const [airconditioner, setAirconditioner] = useState(false);
    const [inmark, setInMark] = useState(false)
    const [car_images, setCar_images] = useState([]);
    const [car_tex_passport_images, setCar_tex_passport_images] = useState([]);
    const [license_images, setLicenseImages] = useState([]);

    const worksPage = 100;
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * worksPage;

    const pageCount = Math.ceil(driversList.length / worksPage);

    const getDrivers = () => {
        axios.get(`${value.url}/dashboard/driver/`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            setDriversList(response.data);
            console.log(response.data);
        })
    }

    useEffect(() => {
        getDrivers()
    }, []);

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
        const file = event.target.files[0];
        setProfileImage(file);
    };

    const getInputDocs = (event) => {
        const file = event.target.files;
        console.log(file);
        console.log(event.target.name);
        if (event.target.name == "car_images") {
            setCar_images(file);
        }

        if (event.target.name == "car_tex_passport_images") {
            setCar_tex_passport_images(file);
        }

        if (event.target.name == "license_images") {
            setLicenseImages(file);
        }
    };

    const sendAllInfo = () => {
        let userFrom = new FormData();
        let extraData = new FormData();



        let user = {
            first_name: formik.values.first_name,
            last_name: formik.values.last_name,
            phone: formik.values.phone,
            role: "driver",
            complete_profile: true,
            is_verified: true
        }
        let allInfo = {
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
            inmark: inmark
        }


        Object.entries(user).forEach(([key, value]) => {
            userFrom.append(key, value);
        });

        // Append other fields
        Object.entries(allInfo).forEach(([key, value]) => {
            userFrom.append(key, value);
        });


        Array.from(car_images).forEach((image, index) => {
            userFrom.append(`car_images[${index}]`, image);
        });

        Array.from(car_tex_passport_images).forEach((image, index) => {
            userFrom.append(`car_tex_passport_images[${index}]`, image);
        });

        Array.from(license_images).forEach((image, index) => {
            userFrom.append(`license_images[${index}]`, image);
        });

        userFrom.append('user',extraData)

        axios.post(`http://192.168.1.8:8000/dashboard/driver/`, userFrom,
            {

            }).then((response) => {
            setModalShow({status: "", show: false})
            getDrivers()
        })
    }

    const editInfo = (driver) => {
        formik.setValues({
            first_name: driver.user.first_name,
            last_name: driver.user.last_name,
            phone: driver.user.phone,
            car_model: driver.car_model,
            car_name: driver.car_name,
            car_number: driver.car_number,
            car_manufactured_date: driver.car_manufactured_date,
            car_tex_passport_date: driver.car_tex_passport_date,
            license_date: driver.license_date,
        });
        setProfileImage(driver.profile_image);
        setCar_images(driver.car_images);
        setCar_tex_passport_images(driver.car_tex_passport_images);
        setLicenseImages(driver.license_images);
        setInMark(driver.inmark)
        setAirconditioner(driver.aircoditioner)
        setLuggage(driver.luggage)
        setCar_color(driver.car_color)
    }

    const productList = driversList.slice(pagesVisited, pagesVisited + worksPage).map((item, index) => {
        return <tr key={index}>
            <td>{index + 1}</td>
            <td className="driver-wrapper">
                <div className="icon-driver">
                    <img onClick={() => {
                        setModalShow({show: true, status: "driver-photo"});
                        setDriverPhoto(item.profile_image)
                    }} src={item.profile_image} alt=""/>
                </div>
                <div className="text-driver">
                    <div className="name">
                        {item.user && item.user.first_name} &nbsp;
                        {item.user && item.user.last_name}
                    </div>
                    <div className="phone">
                        {item.user && item.user.phone}
                    </div>
                </div>
            </td>
            <td>
                <div className="icon">
                    <img onClick={() => {
                        setModalShow({show: true, status: "car-information"});
                        setCarInformation(item)
                    }} src="./images/admin/sport-car.png" alt=""/>
                </div>
            </td>
            <td>
                <div className="icon">
                    <img onClick={() => {
                        openImageViewer(index)
                        setPhotoBox(item.car_images)
                    }} src="./images/admin/car-photo.png" alt=""/>
                </div>
            </td>
            <td>
                <div className="icon">
                    <img onClick={() => {
                        openImageViewer(index)
                        setPhotoBox(item.car_tex_passport_images)
                    }} src="./images/admin/document.png" alt=""/>
                </div>
            </td>
            <td>
                <div onClick={() => {
                    openImageViewer(index)
                    setPhotoBox(item.license_images)
                }} className="icon">
                    <img src="./images/admin/document.png" alt=""/>
                </div>
            </td>
            <td>{item.mark}</td>
            <td>
                <div className={item.user.is_verified ? "icon-check" : "icon-check disablet"}>
                    <img src="./images/admin/check.png" alt=""/>
                </div>
            </td>
            <td>
                <div className={item.user.is_block ? "icon-check" : "icon-check disablet"}>

                    <img onClick={() => {

                        setModalShow({show: true, status: "blocked"});

                    }} src="./images/admin/block.png" alt="block"/>

                    {item.user.reason && item.user.is_block && <div className="reason-block">
                        <img src="./images/admin/warning.png" alt=""/>
                        <div className="text">
                            item.user.reason
                        </div>
                    </div>}
                </div>
            </td>
            <td>
            </td>
            <div className="edit-icon">
                <img onClick={() => {
                    setModalShow({show: true, status: "edit-driver"});
                    editInfo(item)
                }} src="./images/admin/edit-tools.png" alt=""/>
            </div>
        </tr>
    });

    return <div className="drivers-container">
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

                            <div className="title">Haydovchi qo'shish</div>

                            <div className="title-form">Haydovchi ma'lumotlari:</div>

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
                                </div>

                                <div className="select-box">
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

                            <div className="title-form">Avtomobil ma'lumotlari:</div>

                            <div className="form-container">

                                <div className="select-box">
                                    <div className="select-sides">
                                        <TextField
                                            error={formik.errors.car_model === "Required"}
                                            value={formik.values.car_model}
                                            onChange={formik.handleChange}
                                            name="car_model"
                                            type="text"
                                            sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                                            label="Modeli" variant="outlined" className="textField"/>
                                    </div>

                                    <div className="select-sides">
                                        <TextField
                                            error={formik.errors.car_name === "Required"}
                                            value={formik.values.car_name}
                                            onChange={formik.handleChange}
                                            name="car_name"
                                            type="text"
                                            sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                                            label="Nomi" variant="outlined" className="textField"/>
                                    </div>

                                    <div className="select-sides">
                                        <TextField
                                            error={formik.errors.car_number === "Required"}
                                            value={formik.values.car_number}
                                            onChange={formik.handleChange}
                                            name="car_number"
                                            type="text"
                                            sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                                            label="Avtomobil raqami" variant="outlined" className="textField"/>
                                    </div>
                                </div>

                                <div className="select-box ">
                                    <div className="select-sides">
                                        <FormControl sx={{m: 1, minWidth: "100%"}} size="small" className="selectMui">
                                            <InputLabel id="demo-select-large-label">Avtomobil rangi</InputLabel>
                                            <Select
                                                error={car_color ? false : true}
                                                labelid="demo-select-small-label"
                                                id="demo-select-small"
                                                value={car_color}
                                                label="Avtomobil rangi"
                                                onChange={(e) => setCar_color(e.target.value)}
                                            >
                                                <MenuItem value="oq">Oq</MenuItem>
                                                <MenuItem value="qora">Qora</MenuItem>
                                                <MenuItem value="qizil">Qizil</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>

                            <div className="title-form">Xujjatlar berilgan sanalar:</div>

                            <div className="form-container">
                                <div className="select-box ">
                                    <div className="select-sides-time">
                                        <label htmlFor="">Avtomobil ishlab chiqarilgan sana:</label>
                                        <input
                                            className={`working_time ${formik.errors.car_manufactured_date === "Required" ? "working_time_required" : ""}`}
                                            name="car_manufactured_date" onChange={formik.handleChange}
                                            value={formik.values.car_manufactured_date}
                                            type="date"/>
                                    </div>

                                    <div className="select-sides-time">
                                        <label htmlFor="">Tex passport berilgan sana:</label>
                                        <input
                                            className={`working_time ${formik.errors.car_tex_passport_date === "Required" ? "working_time_required" : ""}`}
                                            name="car_tex_passport_date" onChange={formik.handleChange}
                                            value={formik.values.car_tex_passport_date}
                                            type="date"/>
                                    </div>

                                    <div className="select-sides-time">
                                        <label htmlFor="">Ruxsatnoma berilgan sana:</label>
                                        <input
                                            className={`working_time ${formik.errors.license_date === "Required" ? "working_time_required" : ""}`}
                                            name="license_date" onChange={formik.handleChange}
                                            value={formik.values.license_date}
                                            type="date"/>
                                    </div>
                                </div>
                            </div>

                            <div className="title-form">Avtomobil haqida qo'shimcha ma'lumotlar:</div>

                            <div className="form-container">
                                <div className="select-box">
                                    <div className="select-sides">
                                        <div className="title-on">
                                            Yuk olishi:
                                        </div>
                                        <div className="on-of">
                                            <div onClick={() => setLuggage(true)}
                                                 className={`of ${luggage ? "on" : ""}`}>
                                                Ha
                                            </div>
                                            <div onClick={() => setLuggage(false)}
                                                 className={`of ${!luggage ? "on" : ""}`}>
                                                Yoq
                                            </div>
                                        </div>
                                    </div>

                                    <div className="select-sides">
                                        <div className="title-on">
                                            Kondisaner:
                                        </div>
                                        <div className="on-of">
                                            <div onClick={() => setAirconditioner(true)}
                                                 className={`of ${airconditioner ? "on" : ""}`}>
                                                Bor
                                            </div>
                                            <div onClick={() => setAirconditioner(false)}
                                                 className={`of ${!airconditioner ? "on" : ""}`}>
                                                Yoq
                                            </div>
                                        </div>
                                    </div>

                                    <div className="select-sides">
                                        <div className="title-on">
                                            Inamarka:
                                        </div>
                                        <div className="on-of">
                                            <div onClick={() => setInMark(true)}
                                                 className={`of ${inmark ? "on" : ""}`}>
                                                Ha
                                            </div>
                                            <div onClick={() => setInMark(false)}
                                                 className={`of ${!inmark ? "on" : ""}`}>
                                                Yoq
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="title-form">Xujjatlar:</div>

                            <div className="form-container">
                                <div className="select-box">
                                    <div className="select-sides-file">
                                        <input multiple={true} name="car_images" onChange={getInputDocs} type="file"/>
                                        <div className={`sloy-image ${car_images ? "active" : ""}`}>
                                            Avtomobil rasmi
                                            <img src="./images/admin/image.png" alt=""/>
                                        </div>
                                    </div>

                                    <div className="select-sides-file">
                                        <input multiple={true} name="car_tex_passport_images" onChange={getInputDocs}
                                               type="file"/>
                                        <div className={`sloy-image ${car_tex_passport_images ? "active" : ""}`}>
                                            Tex passport rasmi
                                            <img src="./images/admin/image.png" alt=""/>
                                        </div>
                                    </div>

                                    <div className="select-sides-file">
                                        <input multiple={true} name="license_images" onChange={getInputDocs}
                                               type="file"/>
                                        <div className={`sloy-image ${license_images ? "active" : ""}`}>
                                            Ruxsatnoma rasmi
                                            <img src="./images/admin/image.png" alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div onClick={() => formik.handleSubmit()} className="add-btn">
                                <img src="./images/admin/add.png" alt=""/>
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
                                <img src={driverPhoto} alt=""/>
                            </div>
                        </div>
                    )}

                    {modalShow.status === "car-information" && (
                        <div className="car-information">
                            <div className="cancel-btn">
                                <img onClick={() => setModalShow({status: "", show: false})}
                                     src="./images/admin/x.png"
                                     alt=""
                                />
                            </div>
                            <div className="title">
                                Avtomobil ma'lumotlari
                            </div>
                            {carInformation &&
                                <div className="information">
                                    <div className="info">
                                        <div className="title">Moshina modeli:</div>
                                        <div className="text">{carInformation.car_model}</div>
                                    </div>

                                    <div className="info">
                                        <div className="title">Moshina nomi:</div>
                                        <div className="text">{carInformation.car_name}</div>
                                    </div>

                                    <div className="info">
                                        <div className="title">Moshina raqami:</div>
                                        <div className="text">{carInformation.car_number}</div>
                                    </div>

                                    <div className="info">
                                        <div className="title">Moshina rangi:</div>
                                        <div className="text">{carInformation.car_color}</div>
                                    </div>

                                    <div className="info">
                                        <div className="title">Ro'yxatdan o'tgan sana:</div>
                                        <div className="text">{carInformation.car_manufactured_date}</div>
                                    </div>

                                    <div className="info">
                                        <div className="title">Tex passport berilgan sana:</div>
                                        <div className="text">{carInformation.car_tex_passport_date}</div>
                                    </div>

                                    <div className="info">
                                        <div className="title">Ruxsotnoma berilgan sana:</div>
                                        <div className="text">{carInformation.license_date}</div>
                                    </div>

                                    <div className="info">
                                        <div className="title">Yuk orta olishi:</div>
                                        <div className="text">{carInformation.luggage === true ? "Ha" : "Yo'q"}</div>
                                    </div>

                                    <div className="info">
                                        <div className="title">Kondisaner:</div>
                                        <div
                                            className="text">{carInformation.airconditioner === true ? "Bor" : "Yo'q"}</div>
                                    </div>

                                    <div className="info">
                                        <div className="title">Tasdiqlanganmi:</div>
                                        <div className="text">{carInformation.status === "active" ? "Ha" : "Yo'q"}</div>
                                    </div>
                                </div>}
                        </div>
                    )}

                    {modalShow.status === "blocked" && (
                        <div className="blocked">
                            <div className="title">
                                Haydovchini bloklash
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

                            <div className="title">Haydovchi ma'lumotlarini tahrirlash</div>

                            <div className="title-form">Haydovchi ma'lumotlari:</div>

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
                                </div>

                                <div className="select-box">
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

                            <div className="title-form">Avtomobil ma'lumotlari:</div>

                            <div className="form-container">

                                <div className="select-box">
                                    <div className="select-sides">
                                        <TextField
                                            error={formik.errors.car_model === "Required"}
                                            value={formik.values.car_model}
                                            onChange={formik.handleChange}
                                            name="car_model"
                                            type="text"
                                            sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                                            label="Modeli" variant="outlined" className="textField"/>
                                    </div>

                                    <div className="select-sides">
                                        <TextField
                                            error={formik.errors.car_name === "Required"}
                                            value={formik.values.car_name}
                                            onChange={formik.handleChange}
                                            name="car_name"
                                            type="text"
                                            sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                                            label="Nomi" variant="outlined" className="textField"/>
                                    </div>

                                    <div className="select-sides">
                                        <TextField
                                            error={formik.errors.car_number === "Required"}
                                            value={formik.values.car_number}
                                            onChange={formik.handleChange}
                                            name="car_number"
                                            type="text"
                                            sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                                            label="Avtomobil raqami" variant="outlined" className="textField"/>
                                    </div>
                                </div>

                                <div className="select-box ">
                                    <div className="select-sides">
                                        <FormControl sx={{m: 1, minWidth: "100%"}} size="small" className="selectMui">
                                            <InputLabel id="demo-select-large-label">Avtomobil rangi</InputLabel>
                                            <Select
                                                error={car_color ? false : true}
                                                labelid="demo-select-small-label"
                                                id="demo-select-small"
                                                value={car_color}
                                                label="Avtomobil rangi"
                                                onChange={(e) => setCar_color(e.target.value)}
                                            >
                                                <MenuItem value="oq">Oq</MenuItem>
                                                <MenuItem value="qora">Qora</MenuItem>
                                                <MenuItem value="qizil">Qizil</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>

                            <div className="title-form">Xujjatlar berilgan sanalar:</div>

                            <div className="form-container">
                                <div className="select-box ">
                                    <div className="select-sides-time">
                                        <label htmlFor="">Avtomobil ishlab chiqarilgan sana:</label>
                                        <input
                                            className={`working_time ${formik.errors.car_manufactured_date === "Required" ? "working_time_required" : ""}`}
                                            name="car_manufactured_date" onChange={formik.handleChange}
                                            value={formik.values.car_manufactured_date}
                                            type="date"/>
                                    </div>

                                    <div className="select-sides-time">
                                        <label htmlFor="">Tex passport berilgan sana:</label>
                                        <input
                                            className={`working_time ${formik.errors.car_tex_passport_date === "Required" ? "working_time_required" : ""}`}
                                            name="car_tex_passport_date" onChange={formik.handleChange}
                                            value={formik.values.car_tex_passport_date}
                                            type="date"/>
                                    </div>

                                    <div className="select-sides-time">
                                        <label htmlFor="">Ruxsatnoma berilgan sana:</label>
                                        <input
                                            className={`working_time ${formik.errors.license_date === "Required" ? "working_time_required" : ""}`}
                                            name="license_date" onChange={formik.handleChange}
                                            value={formik.values.license_date}
                                            type="date"/>
                                    </div>
                                </div>
                            </div>

                            <div className="title-form">Avtomobil haqida qo'shimcha ma'lumotlar:</div>

                            <div className="form-container">
                                <div className="select-box">
                                    <div className="select-sides">
                                        <div className="title-on">
                                            Yuk olishi:
                                        </div>
                                        <div className="on-of">
                                            <div onClick={() => setLuggage(true)}
                                                 className={`of ${luggage ? "on" : ""}`}>
                                                Ha
                                            </div>
                                            <div onClick={() => setLuggage(false)}
                                                 className={`of ${!luggage ? "on" : ""}`}>
                                                Yoq
                                            </div>
                                        </div>
                                    </div>

                                    <div className="select-sides">
                                        <div className="title-on">
                                            Kondisaner:
                                        </div>
                                        <div className="on-of">
                                            <div onClick={() => setAirconditioner(true)}
                                                 className={`of ${airconditioner ? "on" : ""}`}>
                                                Bor
                                            </div>
                                            <div onClick={() => setAirconditioner(false)}
                                                 className={`of ${!airconditioner ? "on" : ""}`}>
                                                Yoq
                                            </div>
                                        </div>
                                    </div>

                                    <div className="select-sides">
                                        <div className="title-on">
                                            Inamarka:
                                        </div>
                                        <div className="on-of">
                                            <div onClick={() => setInMark(true)}
                                                 className={`of ${inmark ? "on" : ""}`}>
                                                Ha
                                            </div>
                                            <div onClick={() => setInMark(false)}
                                                 className={`of ${!inmark ? "on" : ""}`}>
                                                Yoq
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="title-form">Xujjatlar:</div>

                            <div className="form-container">
                                <div className="select-box">
                                    <div className="select-sides-file">
                                        <input multiple={true} name="car_images" onChange={getInputDocs} type="file"/>
                                        <div className={`sloy-image ${car_images ? "active" : ""}`}>
                                            Avtomobil rasmi
                                            <img src="./images/admin/image.png" alt=""/>
                                        </div>
                                    </div>

                                    <div className="select-sides-file">
                                        <input multiple={true} name="car_tex_passport_images" onChange={getInputDocs}
                                               type="file"/>
                                        <div className={`sloy-image ${car_tex_passport_images ? "active" : ""}`}>
                                            Tex passport rasmi
                                            <img src="./images/admin/image.png" alt=""/>
                                        </div>
                                    </div>

                                    <div className="select-sides-file">
                                        <input multiple={true} name="license_images" onChange={getInputDocs}
                                               type="file"/>
                                        <div className={`sloy-image ${license_images ? "active" : ""}`}>
                                            Ruxsatnoma rasmi
                                            <img src="./images/admin/image.png" alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="add-btn">
                                <img src="./images/admin/checkmark.png" alt=""/>
                            </div>

                        </div>
                    )}

                </div>

            </div>
        </CSSTransition>

        <div className="open-viewer">
            {isViewerOpen && (
                <ImageViewer
                    src={photoBox.map((item) => "https://api.perfecttaxi.uz" + item.image)}
                    currentIndex={currentImage}
                    disableScroll={false}
                    closeOnClickOutside={true}
                    onClose={closeImageViewer}
                />
            )}

        </div>

        <div className="header">

            <div className="search-box">
                <img src="./images/admin/search.png" alt=""/>
                <input placeholder="Telefon raqam kiriting" type="text"/>
            </div>

            <div onClick={() => {
                setModalShow({show: true, status: "add-driver"});
            }} className="add-driver-btn">
                Haydovchi qo'shish
            </div>

        </div>
        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Haydovchi haqida</th>
                <th>Moshina ma'lumotlari</th>
                <th>Moshina rasmlari</th>
                <th>Tex p.d</th>
                <th>Ruxsatnoma</th>
                <th>Baholash</th>
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

export default Drivers