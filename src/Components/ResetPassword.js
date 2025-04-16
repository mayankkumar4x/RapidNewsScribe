import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../api';

const ResetPassword = (props) => {
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    let history = useNavigate();
    const email = localStorage.getItem("resetEmail");

    const handleResetPassword = async () => {
        if (!otp || !newPassword) {
            props.showAlert("Please enter OTP and new password", "warning");
            return;
        }

        const response = await fetch(API_URL + '/api/auth/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp, newPassword })
        });

        const json = await response.json();
        console.log("Response:", json);
        if (json.success) {
            props.showAlert("Password changed successfully", "success");
            localStorage.removeItem("resetEmail");
            history('/login'); // Redirect to login
        } else {
            props.showAlert(json.error || "Invalid OTP", "danger");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="w-50 p-5 bg-dark text-light rounded shadow-lg">
                <h2 className="text-center mb-4">Reset Password</h2>
                <input type="text" className="form-control my-3" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                <input type="password" className="form-control my-3" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <button className="btn btn-primary w-100" onClick={handleResetPassword}>Reset Password</button>
            </div>
        </div>
    );
};

export default ResetPassword;
