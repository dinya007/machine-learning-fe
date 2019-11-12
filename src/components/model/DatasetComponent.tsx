import React, {Component} from "react";
import {Link, RouteComponentProps} from "react-router-dom";
import {Model, ModelStatus} from "../../types/Model";
import {StatusComponent} from "../buttons/StatusComponent";
import {AddButtonComponent} from "../buttons/AddButtonComponent";
import {DatasetAnalyze} from "../../types/DatasetAnalyze";
import {CategoricalChartsComponent} from "./CategoricalChartsComponent";
import {NumericalChartsComponent} from "./NumericalChartsComponent";
import Collapse from "react-collapse";

type RouteParams = {
    datasetId: string
};

type State = {
    datasetId: String
    models: Array<Model>
    datasetAnalyze?: DatasetAnalyze
};

export class DatasetComponent extends Component<RouteComponentProps<RouteParams> & {}, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            datasetId: props.match.params.datasetId,
            models: [],
            datasetAnalyze: undefined
        };
    }

    componentDidMount() {
        fetch(`http://localhost:8080/models/datasetId/${this.state.datasetId}`)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    models: data
                });
            })
            .catch(console.log)

        fetch(`http://localhost:8080/datasets/${this.state.datasetId}/featureAnalyse`)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    datasetAnalyze: data
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
                                    <td>{model.status.toString() === ModelStatus[ModelStatus.SUCCESS] ?
                                        <Link
                                            to={`/datasets/${this.state.datasetId}/models/${model.id}`}>View</Link> : null}
                                    </td>
                                </tr>);
                            })
                        }
                        </tbody>
                    </table>
                </div>

                {
                    this.state.datasetAnalyze === undefined ? null :
                            <CategoricalChartsComponent categorical={this.state.datasetAnalyze.categorical}/>
                }
                {
                    this.state.datasetAnalyze === undefined ? null :
                        <NumericalChartsComponent numerical={this.state.datasetAnalyze.numerical}/>

                }
                <AddButtonComponent redirectLink={`/datasets/${this.state.datasetId}/models/new`} hidden={false}/>
            </div>
        );
    }

}