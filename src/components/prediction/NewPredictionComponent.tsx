import React, {Component} from 'react';
import axios from "axios";
import {RouteComponentProps} from 'react-router-dom'

type RouteParams = {
    datasetId: string
    modelId: string;
};

type State = {
    predictFile?: Blob
};


export class NewPredictionForm extends Component<RouteComponentProps<RouteParams>, State> {

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
    }

    setPredictFile = (event: any) => {
        this.setState({
            predictFile: event.target.files[0],
        })
    };

    uploadPredict = () => {
        const data = new FormData();
        data.append('file', this.state.predictFile!);
        axios.post(`http://localhost:8080/predictions/predict?modelId=${this.props.match.params.modelId}`, data, {})
            .then(res => {
                this.props.history.push(`/datasets/${this.props.match.params.datasetId}/models/${this.props.match.params.modelId}`)
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
                        < form>
                            < div
                                className="form-group row">
                                <label htmlFor="predictionName">Prediction name</label>
                                <input type="text" className="form-control" id="predictionName"/>
                            </div>
                            <div className="form-group row files">
                                <label htmlFor="predictFile">Upload file to predict</label>
                                <input id="predictFile" type="file" className="form-control" onChange={this.setPredictFile}/>
                            </div>
                            <div className="form-group row">
                                <button type="button" className="btn btn-success btn-block"
                                        onClick={this.uploadPredict}
                                        disabled={this.state === null || this.state.predictFile === null}>Upload
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