import React, {Component} from 'react';
import {RouteComponentProps} from 'react-router-dom'
import axios from "axios";

type RouteParams = {
    datasetId: string
};

type State = {};


export class NewModelComponent extends Component<RouteComponentProps<RouteParams>, State> {

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
    }

    trainModel = () => {
        axios.post(`http://localhost:8080/models/train/${this.props.match.params.datasetId}`)
            .then(res => {
                this.props.history.push(`/datasets/${this.props.match.params.datasetId}`)
            }).catch(error => {
            alert(JSON.stringify(error));
        })
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <form>
                            <div className="form-group row">
                                <button type="button" className="btn btn-success btn-block"
                                        onClick={this.trainModel}>Train model
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-4"></div>
                </div>
            </div>

        );
    }

}