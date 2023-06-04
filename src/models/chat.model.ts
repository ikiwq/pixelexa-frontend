import { MessageModel } from "./message.model";
import { UserModel } from "./user.model";

export class ChatModel {
    messages : MessageModel[] = [];
    users : UserModel[] = [];

    recipient : UserModel | null = null;
}