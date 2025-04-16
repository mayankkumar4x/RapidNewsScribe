import React from 'react'

const Alert = (props) => {
    const { msg, type } = props.alert;

    return (
        msg && (
            <div className="alert-container" style={{ position: 'fixed', top: '56px', width: '100%', zIndex: 1000 }}>
                <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
                    {msg}
                </div>
            </div>
        )
    );
};

export default Alert;
