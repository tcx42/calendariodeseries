import React from "react";
import { Link } from "react-router-dom";
import './css/header.css'

export default class Header extends React.Component {
    render(): React.ReactNode {
        return (
            <header className="App-header">
                <nav>
                    <Link to={'/'}>Calendário</Link>
                    <Link to={'/browse'}>Navegue</Link>
                </nav>
            </header>
        )
    }
}