import "./style.scss"
import {useEffect, useRef} from "react";

const ChatDriver = () => {
    const bodyRef = useRef(null);

    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    });

    return <div className="chat-driver">
        <div className="left">
            <div className="header">
                <div className="search-box">
                    <img src="./images/admin/search.png" alt=""/>
                    <input placeholder="Telefon raqam kiriting" type="text"/>
                </div>
            </div>

            <div className="drivers-box">
                <div className="driver">
                    <div className="photo">
                        <img src="./images/admin/person.jpg" alt=""/>
                    </div>
                    <div className="left-content">
                        <div className="name">AAA BBBB MMMM</div>
                        <div className="number">99 999 99 99</div>
                    </div>
                </div>
                <div className="driver active">
                    <div className="photo">
                        <img src="./images/admin/person.jpg" alt=""/>
                    </div>
                    <div className="left-content">
                        <div className="name">AAA BBBB MMMM</div>
                        <div className="number">99 999 99 99</div>
                    </div>
                </div>
            </div>
        </div>

        <div className="right">
            <div className="top">
                <div className="photo">
                    <img src="./images/admin/person.jpg" alt=""/>
                </div>
                <div className="left-content">
                    <div className="name">AAA BBBB MMMM</div>
                    <div className="number">99 999 99 99</div>
                </div>
            </div>

            <div ref={bodyRef} className="body">

                <div className="scroll">
                    <div className="message-my">
                        <div className="message">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At commodi eveniet ex in,
                            laboriosam
                            nam
                            nemo odit quaerat reiciendis sunt!
                            <div className="time">
                                01.04; 20:00
                            </div>
                        </div>
                    </div>

                    <div className="message-driver">
                        <div className="message">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur dignissimos fugit id
                            impedit
                            nam non, nostrum perferendis quasi quo rerum temporibus tenetur totam? Consequatur cum harum
                            illo
                            inventore ipsam numquam omnis vel! Ab aperiam cumque esse inventore modi quam sit.

                            <div className="time">
                                01.04; 20:00
                            </div>
                        </div>
                    </div>

                    <div className="message-my">
                        <div className="message">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At commodi eveniet ex in,
                            laboriosam
                            nam
                            nemo odit quaerat reiciendis sunt!
                            <div className="time">
                                01.04; 20:00
                            </div>
                        </div>
                    </div>

                    <div className="message-my">
                        <div className="message">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At commodi eveniet ex in,
                            laboriosam
                            nam
                            nemo odit quaerat reiciendis sunt!
                            <div className="time">
                                01.04; 20:00
                            </div>
                        </div>
                    </div>

                    <div className="message-driver">
                        <div className="message">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur dignissimos fugit id
                            impedit
                            nam non, nostrum perferendis quasi quo rerum temporibus tenetur totam? Consequatur cum harum
                            illo
                            inventore ipsam numquam omnis vel! Ab aperiam cumque esse inventore modi quam sit.

                            <div className="time">
                                01.04; 20:00
                            </div>
                        </div>
                    </div>

                    <div className="message-my">
                        <div className="message">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At commodi eveniet ex in,
                            laboriosam
                            nam
                            nemo odit quaerat reiciendis sunt!
                            <div className="time">
                                01.04; 20:00
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="bottom">
                <input placeholder="Xabar..." type="text"/>
                <div className="icon-send">
                    <img src="./images/admin/message.png" alt=""/>
                </div>
            </div>
        </div>
    </div>
}

export default ChatDriver;