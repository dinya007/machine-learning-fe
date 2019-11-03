import React, {Component} from 'react';
import {Link} from 'react-router-dom'

type Props = {
    redirectLink: string
};


export class AddButtonComponent extends Component<Props, {}> {

    render() {
        return (
            <div className="row app-add-button">
                <Link to={this.props.redirectLink}>
                    <button type="button" className="btn btn-success bmd-btn-fab">
                        <i className="material-icons">add</i>
                    </button>
                </Link>
            </div>
        );
    }

}