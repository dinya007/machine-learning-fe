import React, {Component} from "react";
import {Link, RouteComponentProps} from "react-router-dom";
import {Model, ModelStatus} from "../../types/Model";
import {StatusComponent} from "../buttons/StatusComponent";
import Chart from "react-google-charts";
import {AddButtonComponent} from "../buttons/AddButtonComponent";

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
                                    <td>{model.status.toString() === ModelStatus[ModelStatus.SUCCESS] ?
                                        <Link
                                            to={`/datasets/${this.state.datasetId}/models/${model.id}`}>View</Link> : null}
                                    </td>
                                </tr>);
                            })
                        }
                        </tbody>
                    </table>
                    <Chart
                        chartType="ScatterChart"
                        rows={[[8, 12], [4, 5.5], [11, 14], [4, 5], [3, 3.5], [6.5, 7]]}
                        columns={[
                            {
                                type: "number",
                                label: "Age"
                            },
                            {
                                type: "number",
                                label: "Weight"
                            }
                        ]}
                        options={
                            {
                                title: "Age vs. Weight comparison",
                                hAxis: {
                                    title: "Age",
                                    viewWindow: { min: 0, max: 15 }
                                },
                                vAxis: { title: "Weight", viewWindow: { min: 0, max: 15 } },
                                legend: "none"
                            }
                        }
                        width={"100%"}
                        height={"400px"}
                        legendToggle
                    />
                </div>
                <AddButtonComponent redirectLink={`/datasets/${this.state.datasetId}/models/new`} hidden={false}/>
            </div>
        );
    }

}