import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../api';

const Signup = (props) => {
    const [credential, setCredential] = useState({ name: "", email: "", password: "", cpassword: "", verificationCode: "" });
    const [isCodeSent, setIsCodeSent] = useState(false); // Track if the code is sent
    let history = useNavigate();

    const sendVerificationCode = async () => {
        const { email } = credential;
        const response = await fetch(API_URL + '/api/auth/send-verification-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const json = await response.json();
        if (json.success) {
          setIsCodeSent(true);
          props.showAlert("Verification code sent to email", "success");
        } else {
            props.showAlert(json.error || "Failed to send verification code", "danger");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, verificationCode } = credential;
        
        const response = await fetch(API_URL + '/api/auth/verify-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, verificationCode })
        });

        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            history('/');
            props.showAlert("Account created successfully", "success");
        } else {
            props.showAlert(json.error || "Invalid verification code", "danger");
        }
    };

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="d-flex w-50 justify-content-center p-5 bg-dark text-light rounded shadow-lg">
                <div className="w-100">
                    <h2 className="text-center mb-4 fw-bold text-uppercase">Signup to Save Notes</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group my-3">
                            <label htmlFor="name" className="fw-semibold">Name</label>
                            <input 
                                type="text" className="form-control my-2 rounded-3 p-2" 
                                name="name" value={credential.name} 
                                onChange={onChange} id="name" placeholder="Enter your name" 
                                minLength={3} required 
                            />
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="email" className="fw-semibold">Email address</label>
                            <input 
                                type="email" className="form-control my-2 rounded-3 p-2" 
                                name="email" value={credential.email} 
                                onChange={onChange} id="email" placeholder="Enter your email" 
                                required 
                            />
                        </div>
                        {!isCodeSent ? (
                            <button type="button" className="btn btn-warning mt-2 w-100" onClick={sendVerificationCode}>
                                Send Verification Code
                            </button>
                        ) : (
                            <>
                                <div className="form-group my-3">
                                    <label htmlFor="verificationCode" className="fw-semibold">Verification Code</label>
                                    <input 
                                        type="text" className="form-control my-2 rounded-3 p-2" 
                                        name="verificationCode" value={credential.verificationCode} 
                                        onChange={onChange} id="verificationCode" placeholder="Enter verification code" 
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
                                <div className="form-group my-3">
                                    <label htmlFor="cpassword" className="fw-semibold">Confirm Password</label>
                                    <input 
                                        type="password" className="form-control my-2 rounded-3 p-2" 
                                        name="cpassword" value={credential.cpassword} 
                                        onChange={onChange} id="cpassword" placeholder="Confirm password" 
                                        pattern={credential.password} minLength={5} required 
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary mt-4 w-100 rounded-3 py-2 fw-bold">
                                    Sign Up
                                </button>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
