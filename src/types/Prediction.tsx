export interface Prediction {
    id: String;
    dataPath: String;
    resultPath: String;
    status: PredictionStatus
}

export enum PredictionStatus {
    STARTED,
    SUCCESS,
    ERROR
}