import ArrowDown from '@/app/(assets)/(svg)/arrow-down.svg'
import { useDispatch } from 'react-redux';
import CloseButton from '../Helpers/close-button';
import { useState } from 'react';
import EditLogo from '../(assets)/(svg)/edit-logo';
import EyeLogo from '../(assets)/(svg)/eye-logo';
import { API_URL } from '@/constants';
import axios from 'axios';
import { ErrorNotify, InfoNotify, SuccessNotify } from '../Helpers/popups';

const PasswordCard = ({ data, Severity, reload }) => {
    const [showPasswords, setShowPasswords] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showEditPassword, setshowEditPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [c_password, setC_password] = useState("");
    const dispatch = useDispatch();

    const color =
        Severity == "High"
            ? "#FFC0C0"
            : Severity == "Medium"
                ? "#FFE195"
                : Severity == "Low" ? "#AFFFE7" : "#F1F1F1";

    const onEditPassword = async () => {
        if (password !== c_password) return alert("Passwords not matching");
        try {
            setshowEditPassword(false);
            const res = await axios.post(
                `${API_URL}/edit-password`,
                {
                    password: password,
                    label: data.label,
                }
            );

            const newdata = {
                label: data.label,
                password_category: data.password_category,
                password: password,
                added_on: data.added_on,
            };

            reload();
            setshowEditPassword(false);
            SuccessNotify('Password Changed!')
            console.log(res);
        } catch (error) {
            console.log(error);
            ErrorNotify('Password Changed Failed!')

        }
    };

    return (
        <div className="tasks-container mb-5 rounded-md p-5 hover:shadow-md" style={{ backgroundColor: `${color}` }}>
            <div
                className="flex justify-between"
                onClick={() => setShowPasswords(!showPasswords)}
            >
                <h1 className="head-24-semi">{data.label}</h1>
                <div className="cursor-pointer">
                    <EyeLogo show={!showPasswords} />
                </div>
            </div>

            <div className={showPasswords ? "tasks-list-div" : "hidden"}>
                <div className="flex justify-between bg-pure p-3 rounded-lg my-2">
                    <span>
                        <h1 className="head-16-semi">{data.password}</h1>
                        {showPassword ? (
                            <h1 className="head-12-regular its-password">{data.password}</h1>
                        ) : null}
                    </span>

                    <span className="utility-section">
                        <div
                            className="logo"
                            onClick={() => {
                                setshowEditPassword(true);
                            }}
                        >
                            <EditLogo color={"#000"} />
                        </div>
                        {/* <div
                className="logo"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                <ViewLogo color={"#000"} />
              </div> */}
                    </span>
                </div>
            </div>

            {showEditPassword ? (
                <div className="dark-back"
                >
                    <div className="add-note-popup">
                        <div className="popup-container-title just-space mb-3">
                            <h1 className="text-lg font-semibold">Change Password</h1>
                            <CloseButton
                                callback={() => {
                                    setshowEditPassword(false);
                                }}
                            />
                        </div>

                        <div className="popup-form flex flex-col gap-3">
                            <div className=" m-yy-20">
                                <label className="head-16-semi inline-block w-[200px]" htmlFor="">
                                    Enter New Password
                                </label>
                                <span className="input-wrapper">
                                    <input
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="input-box head-16-semi"
                                        type="password"
                                    />
                                </span>
                            </div>

                            <div className=" m-yy-20">
                                <label className="head-16-semi inline-block w-[200px]" htmlFor="">
                                    Confirm Password
                                </label>
                                <span className="input-wrapper">
                                    <input
                                        value={c_password}
                                        onChange={e => setC_password(e.target.value)}
                                        className="input-box head-16-semi"
                                        type="password"
                                    />
                                </span>
                            </div>

                            <div className=" m-yy-20">
                                <label className="head-16-semi inline-block w-[200px]" htmlFor="" />
                                <span className="input-wrapper">
                                    <button
                                        onClick={() => onEditPassword()}
                                        className="primary_button head-16-semi"
                                    >
                                        Submit
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default PasswordCard;