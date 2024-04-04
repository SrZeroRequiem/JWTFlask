import React, { useContext } from 'react';
import { Context } from "../store/appContext";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    actions.getProfile();

    if (store.auth) {
        return(
        <div className="container-fluid mt-3">
            <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Profile</h5>
                    <div className="card-text">
                    <div className="form-group">
                        <label htmlFor="formEmail">Email</label>
                        <div className="input-group">
                        <input
                            type="email"
                            className="form-control"
                            value={store.user.email}
                            readOnly
                        />
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        )
    } else {
        return (!store.auth ? <h1>Loading...</h1> : <h1>Loading...</h1>)
    }
};


export default Profile;