import React, {Component} from "react";
import {Link, RouteComponentProps} from "react-router-dom";
import {Model} from "../../types/Model";
import {StatusComponent} from "../buttons/StatusComponent";

type RouteParams = {
    datasetId: string
};

type State = {
    datasetId: String
    models: Array<Model>
};

export class DatasetComponent extends Component<RouteComponentProps<RouteParams> & {}, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            datasetId: props.match.params.datasetId,
            models: []
        };
    }

    componentDidMount() {
        fetch(`http://localhost:8080/models/datasetId/${this.state.datasetId}`)
            .then(res => res.json())
            .then((data) => {
                console.log(JSON.stringify(data));
                this.setState({
                    models: data
                });
            })
            .catch(console.log)
    }


    render() {
        return (
            <div className="container">
                <div className='row'>
                    <div className="col-12 text-center">
                        <h2>Models</h2>
                    </div>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered text-center">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">Status</th>
                            <th scope="col">Details</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.models.map((model, index) => {
                                return (<tr>
                                    <th scope="row">{index}</th>
                                    <td>{model.id}</td>
                                    <td><StatusComponent status={model.status.toString()}/></td>
                                    <td><Link to={`/datasets/${this.state.datasetId}/models/${model.id}`}>View</Link>
                                    </td>
                                </tr>);
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}