import { Account } from "./account";

export class Hopital extends Account{
    nom!: string;
    heureOuverture!: Date;
    heureFermeture!: Date;
    ouvert!: boolean;
}
