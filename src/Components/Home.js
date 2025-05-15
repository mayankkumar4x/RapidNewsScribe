import React from 'react';
import { useLocation } from 'react-router-dom';
import Notes from './Notes';

export default function Home(props) {
    const location = useLocation();
    const newsUrl = location.state?.newsUrl; // Retrieve the URL from Link state

    return (
        <Notes showAlert={props.showAlert} newsUrl={newsUrl} mode={props.mode} />
    );
}
