import {IApiCoach} from './IApiCoach';

export interface IClass {
    Name: string;
    ProgramName: string;
    ProgramId: number;
    StartDateTime: string;
    EndDateTime: string;
    Coach: string;
}