import {Model} from "./Model";

export interface Dataset {
    id: string;
    path: string;
    models: Model[];
}