import "./style.scss"

const CarBrand = () => {
    return <div className="car-brand-wrapper">
        <div className="header">
            <div className="form-wrapper">
                <input placeholder="Moshina nomi..." type="text"/>
                <div className="add-color">
                    <img src="./images/admin/add.png" alt=""/>
                </div>
            </div>

        </div>

        <div className="colors-cards">
            <div className="wrapper-box">
                <div className="color-card">
                    <div className="name">Nexia</div>
                    <div className="bttons">
                        <div className="btn">
                            <img src="./images/admin/edit-tools.png" alt=""/>
                        </div>

                        <div className="btn">
                            <img src="./images/admin/delete.png" alt=""/>
                        </div>
                    </div>
                </div>

                <div className="color-card">
                    <div className="name">Lacetti</div>
                    <div className="bttons">
                        <div className="btn">
                            <img src="./images/admin/edit-tools.png" alt=""/>
                        </div>

                        <div className="btn">
                            <img src="./images/admin/delete.png" alt=""/>
                        </div>
                    </div>
                </div>

                <div className="color-card">
                    <div className="name">Malibu</div>
                    <div className="bttons">
                        <div className="btn">
                            <img src="./images/admin/edit-tools.png" alt=""/>
                        </div>

                        <div className="btn">
                            <img src="./images/admin/delete.png" alt=""/>
                        </div>
                    </div>
                </div>

            </div>


        </div>

    </div>
}

export default CarBrand;