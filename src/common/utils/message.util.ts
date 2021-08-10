import { MESSAGE } from "../configuration/messages/message-config";
import { EmessageMapping } from "./enums/message.enum";

export default class UtilMessage {

    public static mappingMessage(idMessage: EmessageMapping): string {
        return MESSAGE.find(m => m.id == idMessage)?.message;
    }

}