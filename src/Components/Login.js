import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../api';

const Login = (props) => {
    const [credential, setCredential] = useState({ email: "", password: "" });
    const [emailForReset, setEmailForReset] = useState(""); // For forgot password
    const [showForgotPassword, setShowForgotPassword] = useState(false); // Modal control
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(API_URL + '/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });

        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            history('/');
            props.showAlert("Successfully Logged In", "success");
        } else {
            props.showAlert("Invalid Credentials", "danger");
        }
    };

    const handleForgotPassword = async () => {
        if (!emailForReset) {
            props.showAlert("Please enter your email", "warning");
            return;
        }

        const response = await fetch(API_URL + '/api/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: emailForReset })
        });

        const json = await response.json();
        if (json.success) {
            props.showAlert("Reset code sent to your email", "success");
            localStorage.setItem("resetEmail", emailForReset); // Store email temporarily
            history('/reset-password'); // Redirect to reset password page
        } else {
            props.showAlert(json.error || "Failed to send reset code", "danger");
        }
        setShowForgotPassword(false);
    };

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="d-flex w-50 justify-content-center p-5 bg-dark text-light rounded shadow-lg">
                    <div className="w-100">
                        <h2 className="text-center mb-4 fw-bold text-uppercase">Login to Save Note</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group my-3">
                                <label htmlFor="email" className="fw-semibold">Email address</label>
                                <input
                                    type="email" className="form-control my-2 rounded-3 p-2"
                                    name="email" value={credential.email}
                                    onChange={onChange} id="email" placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="password" className="fw-semibold">Password</label>
                                <input
                                    type="password" className="form-control my-2 rounded-3 p-2"
                                    name="password" value={credential.password}
                                    onChange={onChange} id="password" placeholder="Enter password"
                                    minLength={5} required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-4 w-100 rounded-3 py-2 fw-bold">
                                Login
                            </button>
                        </form>
                        <p className="mt-3 text-center">
                            <button className="btn btn-link text-light" onClick={() => setShowForgotPassword(true)}>
                                Forgot Password?
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            {/* Forgot Password Modal */}
            {showForgotPassword && (
                <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Reset Password</h5>
                                <button className="btn-close" onClick={() => setShowForgotPassword(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Enter your registered email to receive a reset code.</p>
                                <input
                                    type="email" className="form-control"
                                    placeholder="Enter your email"
                                    value={emailForReset}
                                    onChange={(e) => setEmailForReset(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowForgotPassword(false)}>Cancel</button>
                                <button className="btn btn-primary" onClick={handleForgotPassword}>Send Reset Code</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;
