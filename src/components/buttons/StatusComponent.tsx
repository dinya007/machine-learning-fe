import React, {Component} from 'react';

type Props = {
    status: string
};


export class StatusComponent extends Component<Props, {}> {

    render() {
        switch (this.props.status) {
            case 'SUCCESS':
                return this.success();
            case 'STARTED':
                return this.started();
            case 'ERROR':
                return this.error();
        }
        return (
            <button type="button" className="btn btn-success bmd-btn-fab">
                <i className="material-icons">add</i>
            </button>
        );
    }

    success() {
        return (
            <button type="button" className="btn btn-success bmd-btn-fab">
                <i className="material-icons">check_circle</i>
            </button>
        )
    }

    started() {
        return (
            <button type="button" className="btn btn-secondary bmd-btn-fab">
                <i className="material-icons">flight_takeoff</i>
            </button>
        )
    }

    error() {
        return (
            <div>
                <button type="button" className="btn btn-danger bmd-btn-fab">
                    <i className="material-icons">error</i>
                </button>
            </div>
        )
    }

}