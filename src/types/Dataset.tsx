import {Model} from "./Model";

export interface Dataset {
    id: string;
    path: string;
    status: DatasetStatus;
    models: Model[];
}

export enum DatasetStatus {
    CREATED,
    ANALYZED,
    ERROR
}