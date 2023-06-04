import { UserModel } from "./user.model";

export class MessageModel{
    text : string = "";
    sender : UserModel = new UserModel();
    recipient : UserModel = new UserModel();
    created_at : Date = new Date();
}