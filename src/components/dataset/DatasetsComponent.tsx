import React, {Component} from 'react';
import {Dataset} from "../../types/Dataset";
import {Link} from "react-router-dom";
import {AddButtonComponent} from "../buttons/AddButtonComponent";
import {DownloadButtonComponent} from "../buttons/DownloadButtonComponent";
import {StatusComponent} from "../buttons/StatusComponent";

type State = {
    predictions: Array<Dataset>
};


export class DatasetsComponent extends Component<{}, State> {

    constructor(props: any) {
        super(props);
        this.state = {predictions: []};
    }

    componentDidMount() {
        fetch('http://localhost:8080/datasets')
            .then(res => res.json())
            .then((data) => {
                console.log(JSON.stringify(data));
                this.setState({
                    predictions: data
                });
            })
            .catch(console.log)
    }


    render() {
        return (
            <div className="container">
                <div className='row'>
                    <div className="col-12 text-center">
                        <h2>Datasets</h2>
                    </div>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered text-center">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">Status</th>
                            <th scope="col">Input data</th>
                            <th scope="col">Details</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.predictions.map((dataset, index) => {
                                return (<tr>
                                    <th scope="row">{index}</th>
                                    <td>{dataset.id}</td>
                                    <td><StatusComponent status={dataset.status.toString()}/></td>
                                    <td>
                                        <DownloadButtonComponent
                                            hidden={false}
                                            downloadLink={`http://localhost:8080/datasets/${dataset.id}/downloadData`}/>
                                    </td>
                                    <td><Link to={`/datasets/${dataset.id}`}>View</Link></td>
                                </tr>);
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <AddButtonComponent redirectLink='/datasets/new' hidden={false}/>
            </div>
        );
    }
}
