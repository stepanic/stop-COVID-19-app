interface IAnswerConfigItem {
    tid: string; // tid === translationIdenitficator (key in ngx-translate config => assets/i18n/${lang}.json)
}

export enum AnswerType {
    BINARY = 'BINARY',
    MULTIPLE = 'MULTIPLE'
}

export enum AnswerBinary {
    POSITIVE = 'POSITIVE',
    NEGATIVE = 'NEGATIVE'
}

export interface IAnswerConfigBinary {
    type: AnswerType.BINARY;
    positive: IAnswerConfigItem;
    negative: IAnswerConfigItem;
}

export interface IAnswerConfigMultiple {
    type: AnswerType.MULTIPLE;
    submit: IAnswerConfigItem;
}
