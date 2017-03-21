import {IProgram} from './IProgram'
import {IApiWod} from './IApiWod'

export interface IRecordList {
    Program: Array<IProgram>;
    APIWod: IApiWod;
}