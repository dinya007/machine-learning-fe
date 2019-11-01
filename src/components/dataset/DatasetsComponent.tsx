import React, {Component} from 'react';
import {Dataset} from "../../types/Dataset";
import {Link} from "react-router-dom";

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
                    <div className="col-8 text-center">
                        <h2>Datasets</h2>
                    </div>
                    <div className="col-4 text-center">
                        <Link to='/datasets/new'>
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
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.predictions.map((dataset, index) => {
                                return (<tr>
                                    <th scope="row">{index}</th>
                                    <td>{dataset.id}</td>
                                    <td><a href={`http://localhost:8080/datasets/${dataset.id}/downloadData`}
                                           target='_blank' rel='noopener noreferrer'>Download input data</a></td>
                                    <td><Link to={`/datasets/${dataset.id}`}>View details</Link></td>
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
