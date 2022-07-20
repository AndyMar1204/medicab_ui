import { __values } from "tslib";

export class TypeAccount {
    private static _values = new Array<TypeAccount>();  
    public static readonly User = new TypeAccount('assets/img/user.gif','utilisateur')
    public static readonly Hopital = new TypeAccount('assets/img/hopital.gif','hopital')
    public static readonly Driver = new TypeAccount('assets/img/driver.png','chauffeur')
    public constructor(
        private _img: string,
        private _name: string
    ){
        TypeAccount._values.push(this)
    }
     //Like a normal getter
  public get img() {
    return this._img 
  }
  public get name(){
      return this._name
  }
  public static get values(){
      return this._values;
  }
   //Get a constant from the name
   static fromName(name: string) {
    return this.values.find(accounType => accounType.name === name)
  }
  equals(other: TypeAccount) {
    return this.name === other.name
  }
  toString() {
    return `${this.name}`
  }
}
