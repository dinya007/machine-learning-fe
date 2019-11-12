export interface DatasetAnalyze {
    categorical: Categorical,
    numerical: Numerical
}

export interface Categorical {
    count: number,
    features: Array<CategoricalFeature>
}

export interface Numerical {
    count: number,
    features: Array<NumericalFeature>
}

export interface CategoricalFeature {
    name: String,
    unique: number,
    top: String,
    frequencyTop: number,
    count: number,
    missing: number,
    values: Array<CategoricalValue>
}

export interface NumericalFeature {
    name: String,
    min: number,
    max: number,
    mean: number,
    median: number,
    missing: number,
    zeros: number
    count: number,
    correlation: number,
    values: Array<number>,
}

export interface CategoricalValue {
    count: number,
    name: String
}