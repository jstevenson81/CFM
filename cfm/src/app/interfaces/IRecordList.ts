import { IProgram } from './IProgram';
import { IApiWod } from './IApiWod';
import { IApiClass } from './IApiClass';

export interface IRecordList {
    Program: Array<IProgram>;
    APIWod: IApiWod;
    Class: Array<IApiClass>;
}