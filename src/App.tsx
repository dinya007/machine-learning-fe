import React, {Component} from 'react';
import './App.css';
import {DatasetsComponent} from "./components/dataset/DatasetsComponent";
import {DatasetComponent} from "./components/model/DatasetComponent";
import {ModelComponent} from "./components/model/ModelComponent";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {NewDatasetForm} from "./components/dataset/NewDatasetComponent";
import {NewPredictionForm} from "./components/prediction/NewPredictionComponent";

// https://reacttraining.com/react-router/web/guides/quick-start

export class App extends Component<{}, {}> {

    render() {
        return (
            <Router>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to="/" className="navbar-brand">App name</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Datasets <span
                                    className="sr-only">(current)</span></Link>
                            </li>
                        </ul>
                    </div>
                </nav>


                <div>
                    <Switch>
                        <Route exact path="/" component={DatasetsComponent}/>
                        <Route exact path="/datasets" component={DatasetsComponent}/>
                        <Route exact path="/datasets/new" component={NewDatasetForm}/>
                        <Route exact path="/datasets/:datasetId" component={DatasetComponent}/>
                        <Route exact path="/datasets/:datasetId/models/:modelId" component={ModelComponent}/>
                        <Route exact path="/datasets/:datasetId/models/:modelId/predictions/new"
                               component={NewPredictionForm}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;
