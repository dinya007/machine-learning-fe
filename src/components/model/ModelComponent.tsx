import React, {Component} from "react";
import {RouteComponentProps} from "react-router";
import {Prediction, PredictionStatus} from "../../types/Prediction";
import {AddButtonComponent} from "../buttons/AddButtonComponent";
import {DownloadButtonComponent} from "../buttons/DownloadButtonComponent";
import {StatusComponent} from "../buttons/StatusComponent";

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
                    <div className="col-12 text-center">
                        <h2>Predictions</h2>
                    </div>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered text-center">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">Status</th>
                            <th scope="col">Type</th>
                            <th scope="col">Input data</th>
                            <th scope="col">Result</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.predictions.map((prediction, index) => {
                                return (<tr>
                                    <th scope="row">{index}</th>
                                    <td>{prediction.id}</td>
                                    <td><StatusComponent status={prediction.status.toString()}/></td>
                                    <td>
                                        <DownloadButtonComponent
                                            hidden={false}
                                            downloadLink={`http://localhost:8080/predictions/${prediction.id}/downloadData`}/>
                                    </td>
                                    <td>
                                        <DownloadButtonComponent
                                            hidden={prediction.status.toString() !== PredictionStatus[PredictionStatus.SUCCESS]}
                                            downloadLink={`http://localhost:8080/predictions/${prediction.id}/downloadResult`}/>
                                    </td>
                                </tr>);
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <AddButtonComponent
                    redirectLink={`/datasets/${this.state.datasetId}/models/${this.state.modelId}/predictions/new`}
                    hidden={false}/>
            </div>
        );
    }

}