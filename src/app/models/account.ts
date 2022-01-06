import { Adresse } from "./adresse";
import { Position } from "./position";

export class Account {
    public id: number;
    public username: string;
    public number: string;
    public email : string;
    public password: string;
    public adresse: Adresse
    public position: Position
}
