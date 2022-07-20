import { Adresse } from "./adresse"
import { Fichier } from "./fichier"
import { FileInfo } from "./file-info"
import { Position } from "./position"

export class Account {
    id!: number
    username!: string
    password!: string
    number!: string
    email!: string
    adresse!: Adresse
    position!: Position
    profil!: FileInfo
     infos!:string
}

