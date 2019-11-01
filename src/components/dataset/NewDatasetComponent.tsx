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
                console.log(JSON.stringify(res));
                this.props.history.push(`/datasets/${res.data.datasetId}`)
                // this.setState({
                //     modelId: res.data.id
                // });
            }).catch(error => {
            alert(JSON.stringify(error));
        })
    };


    render() {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Dataset name</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                           placeholder="Enter email"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                        else.</small>
                </div>
                {/*<div className="form-group">*/}
                {/*    <label htmlFor="exampleInputPassword1">Password</label>*/}
                {/*    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>*/}
                {/*</div>*/}
                <div className="form-group files">
                    <label>Upload Your Training File </label>
                    <input type="file" className="form-control" onChange={this.setTrainFile}/>
                    {/*<button type="button" className="btn btn-success btn-block"*/}
                    {/*        onClick={this.uploadTrain}>Upload*/}
                    {/*</button>*/}
                </div>
                {/*<div className="form-group form-check">*/}
                {/*    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>*/}
                {/*    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>*/}
                {/*</div>*/}
                <button type="button" className="btn btn-success btn-block"
                        onClick={this.uploadTrain}>Upload
                </button>
                {/*<button type="submit" className="btn btn-primary">Submit</button>*/}
            </form>
        );
    }

}