import { Account } from "./account";
import { Doctor } from "./doctor";
import { Hopital } from "./hopital";

export class User extends Account{
    postnom!: string;
    sexe!:string
    groupeSanguin!:string
    doctor!: Doctor;
    hopital!:Hopital;
    alergies!:string
    donneurOrgane!:string
   traitement!:string
}
