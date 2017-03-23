import {IApiCoach} from './IApiCoach';

export class IApiClass {
    Name: string;
    ProgramName: string;
    ProgramId: number;
    StartDateTime: string;
    EndDateTime: string;
    Coaches: IApiCoach
}