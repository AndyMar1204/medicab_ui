import { Hopital } from "./hopital"
import { User } from "./user"

export class Urgence {
    id!: number
    typeUrgences!: string
    typeTransport!: string
    user!: User
    hopital!: Hopital
    date!: Date
    etat!: string
}
