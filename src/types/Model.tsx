export interface Model {
    id: string;
    status: ModelStatus;
    type: ModelType;
    algorithm: Algorithm;
    mean: number;
    std: number;
}

export enum ModelStatus {
    STARTED,
    SUCCESS,
    ERROR
}

export enum ModelType {
    CLASSIFICATION,
    REGRESSION
}

export enum Algorithm {
    XG_BOOST
}