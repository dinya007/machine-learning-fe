import React, {Component} from 'react';
import axios from "axios";
import {RouteComponentProps} from 'react-router-dom'

type State = {
    trainFile?: Blob
};


export class NewDatasetForm extends Component<RouteComponentProps, State> {

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
    }

    setTrainFile = (event: any) => {
        this.setState({
            trainFile: event.target.files[0],
        })
    };

    uploadTrain = () => {
        const data = new FormData();
        data.append('file', this.state.trainFile!);
        axios.post("http://localhost:8080/models/train", data, {})
            .then(res => {
                this.props.history.push(`/datasets/${res.data.datasetId}`)
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
                                <label htmlFor="datasetName" className="bmd-label-floating">Dataset name</label>
                                <input type="text" className="form-control" id="datasetName"/>
                            </div>
                            <div className="form-group row files">
                                <label htmlFor="trainFile">Upload file to train</label>
                                <input id="trainFile" type="file" className="form-control"
                                       onChange={this.setTrainFile}/>
                            </div>
                            <div className="form-group row">
                                <button type="button" className="btn btn-success btn-block"
                                        onClick={this.uploadTrain}
                                        disabled={this.state === null || this.state.trainFile === null}>Upload
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