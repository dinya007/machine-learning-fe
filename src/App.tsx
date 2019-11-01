import React, {Component} from 'react';
import './App.css';
import './Upload.css';
import axios from 'axios';
import {DatasetsComponent} from "./components/dataset/DatasetsComponent";
import {DatasetComponent} from "./components/model/DatasetComponent";
import {ModelComponent} from "./components/model/ModelComponent";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {NewDatasetForm} from "./components/dataset/NewDatasetComponent";
import {NewPredictionForm} from "./components/prediction/NewPredictionComponent";


// https://reacttraining.com/react-router/web/guides/quick-start

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

    setTestFile = (event: any) => {
        this.setState({
            testFile: event.target.files[0],
            testLoaded: 0,
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
            <Router>
                <div>
                    {/*<nav>*/}
                    {/*    <ul>*/}
                    {/*        <li>*/}
                    {/*            <Link to="/">Datasets</Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link to="/models/1">Models 1</Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link to="/models/2">Models 2</Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link to="/models/1/predictions/2">Predictions 2</Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link to="/models/2/predictions/5">Predictions 5</Link>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*</nav>*/}

                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        <Route exact path="/" component={DatasetsComponent}/>
                        <Route exact path="/datasets" component={DatasetsComponent}/>
                        <Route exact path="/datasets/new" component={NewDatasetForm}/>
                        <Route exact path="/datasets/:datasetId" component={DatasetComponent}/>
                        <Route exact path="/datasets/:datasetId/models/:modelId" component={ModelComponent}/>
                        <Route exact path="/datasets/:datasetId/models/:modelId/predictions/new" component={NewPredictionForm}/>
                    </Switch>
                </div>
            </Router>



            // <div className="App">
            //     <div className="container">
            //         <div className="row">
            //             <div className="col-md-6">
            //                 <form method="post" action="#" id="#">
            //                     <div className="form-group files">
            //                         <label>Upload Your Training File </label>
            //                         <input type="file" className="form-control" onChange={this.setTrainFile}/>
            //                         <button type="button" className="btn btn-success btn-block"
            //                                 onClick={this.uploadTrain}>Upload
            //                         </button>
            //                     </div>
            //                 </form>
            //             </div>
            //         </div>
            //     </div>
            //
            //     <div className="container">
            //         <div className="row">
            //             <div className="col-md-6">
            //                 <form method="post" action="#" id="#">
            //                     <div className="form-group files">
            //                         <label>Upload Your Testing File </label>
            //                         <input type="file" className="form-control" onChange={this.setTestFile}/>
            //                         <button type="button" className="btn btn-success btn-block"
            //                                 onClick={this.uploadTest}>Upload
            //                         </button>
            //                     </div>
            //                 </form>
            //             </div>
            //         </div>
            //     </div>
            //
            // </div>
        )
    }
}

export default App;
