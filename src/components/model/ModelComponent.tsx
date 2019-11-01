import React, {Component} from "react";
import {RouteComponentProps} from "react-router";
import {Prediction} from "../../types/Prediction";
import {Link} from "react-router-dom";

type RouteParams = {
    datasetId: string
    modelId: string;
};

type State = {
    datasetId: string
    modelId: string
    predictions: Array<Prediction>
};

export class ModelComponent extends Component<RouteComponentProps<RouteParams> & {}, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            datasetId: props.match.params.datasetId,
            modelId: props.match.params.modelId,
            predictions: []
        };
    }

    componentDidMount() {
        fetch(`http://localhost:8080/predictions/modelId/${this.state.modelId}`)
            .then(res => res.json())
            .then((data) => {
                console.log(JSON.stringify(data));
                this.setState({
                    predictions: data
                });
            })
            .catch(alert)
    }


    render() {
        return (
            <div className="container">
                <div className='row'>
                    <div className="col-8 text-center">
                        <h2>Predictions</h2>
                    </div>
                    <div className="col-4 text-center">
                        <Link to={`/datasets/${this.state.datasetId}/models/${this.state.modelId}/predictions/new`}>
                            <button>New</button>
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            {/*<th scope="col"></th>*/}
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.predictions.map((prediction, index) => {
                                return (<tr>
                                    <th scope="row">{index}</th>
                                    <td>{prediction.id}</td>
                                    <td>{prediction.status}</td>
                                    <td><a href={`http://localhost:8080/predictions/${prediction.id}/downloadData`}
                                           target='_blank' rel='noopener noreferrer'>Download input data</a></td>
                                    <td><a href={`http://localhost:8080/predictions/${prediction.id}/downloadResult`}
                                           target='_blank' rel='noopener noreferrer'>Download predictions</a></td>
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