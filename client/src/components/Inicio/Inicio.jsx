
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./inicio.css";

export class Inicio extends Component {

    componentDidMount() {
        //this.props.getAllMovies()
    }
    render() {
        return (

            <div className="inicio">
                <Link to='/home'>
                    <button>Iniciar</button>
                </Link>
            </div>
        );

    }
}
export default Inicio;