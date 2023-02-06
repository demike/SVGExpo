import { ErrorMessage, Message, RESPONSE_ENDING } from "./types";

export function isResponseOfMessage(response: Message, message: Message ) {
    return (response.id === message.id && response.type === `${message.type}-${RESPONSE_ENDING}`);
}

export function isErrorMessage(response: Message | ErrorMessage): response is ErrorMessage {
    if(response.error) {
        return true;
    }
    return false;
}