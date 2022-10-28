
import React, { Fragment, useEffect, useState } from 'react'
import "./UpdateProfile.css"
import Loader from "../layout/loader/Loader"
import {  useNavigate } from "react-router-dom"
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import FaceIcon from "@material-ui/icons/Face"
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, updateProfile } from '../../actions/userAction'
import { useAlert } from "react-alert"
import { loadUser } from '../../actions/userAction'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'
import MetaData from '../layout/MetaData'

const UpdateProfile = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user)
    const { error, isUpdated, loading } = useSelector(state => state.profile)
    const alert = useAlert();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png")

    const updateProfileSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar)
        dispatch(updateProfile(myForm));
    }

    const updateProfileDataChange = (e) => {


        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
        };
        reader.readAsDataURL(file);

        // reader.onload = () => {
        //     if (1) {
        //         console.log(reader.result);
        //         setAvatarPreview(reader.result);
        //         setAvatar(reader.result);
        //     }
        // }

    }

    useEffect(() => {

        if (user) {
            setName(user.name);
            setEmail(user.email);
            if (user.avatar.url)
                setAvatarPreview(user.avatar.url);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {

            alert.success("Profile Updates Successfully");
            navigate("/account");
            dispatch(loadUser());

            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }
    }, [dispatch, error, alert, navigate, user, isUpdated])


    return (
        <Fragment>
            {loading ? <Loader/> :
            <Fragment>
            <MetaData title="Update Profile"/>
            <div className="updateProfileContainer">
                <div className="updateProfileBox">

                    <h2 className='updateProfileHeading' >Update Profile</h2>
                    <form className="updateProfileForm" encType="multipart/form-data" onSubmit={updateProfileSubmit}>


                        <div className="updateProfileName">
                            <FaceIcon />
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                name="name"
                                value={name}
                                onChange={(e)=> setName(e.target.value)}
                            />
                        </div>
                        <div className="updateProfileEmail">
                            <MailOutlineIcon />
                            <input type="emial" placeholder='Email' required name='email' value={email} onChange={(e)=> setEmail(e.target.value)}
/>
                        </div>

                        <div id="updateProfileImage">
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input type="file" name="avatar" accept="image/*" onChange={updateProfileDataChange} />
                        </div>
                        <input type="submit" value="Update" className="updateProfileBtn" />

                    </form>
                </div>
            </div>
        </Fragment>}
        </Fragment>
    )
}

export default UpdateProfile