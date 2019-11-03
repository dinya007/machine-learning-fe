import React, {Component} from 'react';
import './App.css';
import {DatasetsComponent} from "./components/dataset/DatasetsComponent";
import {DatasetComponent} from "./components/model/DatasetComponent";
import {ModelComponent} from "./components/model/ModelComponent";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {NewDatasetForm} from "./components/dataset/NewDatasetComponent";
import {NewPredictionForm} from "./components/prediction/NewPredictionComponent";

// https://reacttraining.com/react-router/web/guides/quick-start

export class App extends Component<{}, {}> {

    render() {
        return (
            <Router>
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
