import {TypeMessage} from "./type-message";

export class BuildMessage {
  public messageModal!: string;
  public displayMessageModal: boolean = false;
  public type!:string

  /**
   * Construit le message à afficher suite à une action utilisateur.
   * @param msg le message à afficher
   * @param type_ le type de message à afficher
   */
  buildMessageModal(msg: string, type_:TypeMessage){
    this.messageModal = msg;
    this.type = type_;
    this.displayMessageModal = true;
  }

  hideMessage(){
    this.displayMessageModal = false;
  }
}

