import {Prediction} from "./Prediction";

export interface Model {
    id: string;
    status: ModelStatus;
    predictions: Prediction[];
}

export enum ModelStatus {
    STARTED,
    SUCCESS,
    ERROR
}