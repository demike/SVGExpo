import { isErrorMessage, isResponseOfMessage } from "../shared/util";
import { ExportSVGResponse } from "../shared/types";
import { EXPORT_SVGS_CMD, Message } from "../shared/types";

export class Messanger {
    private msgId = 0;

    public exportSelectedSvgs(): Promise<ExportSVGResponse> {
        return this.postMessageAsync(parent, { type: EXPORT_SVGS_CMD, id: this.msgId++ }, { targetOrigin: '*'})
    }  

    protected postMessageAsync<R extends Message>(target: Window, cmd: Message, options?: WindowPostMessageOptions ): Promise<R> {
    return new Promise((resolve, reject) => {

        const listener = (evt: MessageEvent<{pluginMessage: R}> ) => {
            const msg = evt.data.pluginMessage;
            if(isResponseOfMessage(msg,cmd)) {
                window.removeEventListener('message', listener);

                if(isErrorMessage(msg)) {
                    return reject(msg.error);
                }
                resolve(msg);
            }
        }

        window.addEventListener('message',listener);
        target.postMessage({ pluginMessage: cmd}, options);
    });
}

}