import { IProgram } from './IProgram'
import { IComponentList } from './IComponentList'
import { IWodHeader } from './IWodHeader';

export interface IApiWod {
    Program: IProgram;
    Components: IComponentList;
    WodHeader: IWodHeader;
    NoWod: boolean;
}