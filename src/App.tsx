import React, {Component} from 'react';
import './App.css';
import './Upload.css';
import axios from 'axios';

type UploadState = {
    trainFile?: Blob
    testFile?: Blob
    modelId?: string
    trainLoaded: 0
    testLoaded: 0
}

export class App extends Component<{}, UploadState> {

    constructor(props: any) {
        super(props);
        this.state = {
            trainFile: undefined,
            testFile: undefined,
            trainLoaded: 0,
            testLoaded: 0
        }

    }

    setTrainFile = (event: any) => {
        this.setState({
            trainFile: event.target.files[0],
            trainLoaded: 0,
        })
    };

    setTestFile = (event: any) => {
        this.setState({
            testFile: event.target.files[0],
            testLoaded: 0,
        })
    };

    uploadTrain = () => {
        const data = new FormData();
        data.append('file', this.state.trainFile!);
        axios.post("http://localhost:8080/train", data, {})
            .then(res => {
                console.log(JSON.stringify(res));
                this.setState({
                    modelId: res.data.id
                });
            })
    };

    uploadTest = () => {
        const data = new FormData();
        data.append('file', this.state.testFile!);
        axios.post("http://localhost:8080/predict?modelId=" + this.state.modelId, data, {})
            .then(res => {
                console.log(JSON.stringify(res));
            })
    };

    render() {
        return (
            <div className="App">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <form method="post" action="#" id="#">
                                <div className="form-group files">
                                    <label>Upload Your Training File </label>
                                    <input type="file" className="form-control" onChange={this.setTrainFile}/>
                                    <button type="button" className="btn btn-success btn-block"
                                            onClick={this.uploadTrain}>Upload
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <form method="post" action="#" id="#">
                                <div className="form-group files">
                                    <label>Upload Your Testing File </label>
                                    <input type="file" className="form-control" onChange={this.setTestFile}/>
                                    <button type="button" className="btn btn-success btn-block"
                                            onClick={this.uploadTest}>Upload
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/*<header className="App-header">*/}
                {/*  <img src={logo} className="App-logo" alt="logo"/>*/}
                {/*  <p>*/}
                {/*    Edit <code>src/App.tsx</code> and save to reload.*/}
                {/*  </p>*/}
                {/*  <a*/}
                {/*      className="App-link"*/}
                {/*      href="https://reactjs.org"*/}
                {/*      target="_blank"*/}
                {/*      rel="noopener noreferrer"*/}
                {/*  >*/}
                {/*    Learn React*/}
                {/*  </a>*/}
                {/*</header>*/}


            </div>)
    }
}

export default App;
