import { isErrorMessage, isResponseOfMessage } from "../shared/util";
import { Message, OPTIMIZE_SVGS_CMD, SVGData } from "../shared/types";
import { OptimizeSVGsCommand, OptimizeSVGsResponse } from "../shared/types";

import SVGOWorker from './svgo.worker';

const WORKER_URL = "./svgo.worker.js";

export class Optimizer {
    public static workerScript = SVGOWorker; // prevent tree shaking of SVGOWorker (TODO: remove this when worker actually works ;) 
    private msgId = 0;
    private worker = window as unknown as Worker; //new Worker(require('./svgo.worker'),  { type: "module" });

    async optimizeSvg(svgData: SVGData[]): Promise<SVGData[]> {
        const cmd: OptimizeSVGsCommand = { type: OPTIMIZE_SVGS_CMD, svgs: svgData, id: this.msgId++  }
        const response = await this.postMessageAsync<OptimizeSVGsResponse>(this.worker, cmd, { transfer: cmd.svgs.map(svg => svg.svg.buffer)});
        return response.svgs
    }  

    protected postMessageAsync<R extends Message>(worker: Worker, cmd: Message, options?: StructuredSerializeOptions): Promise<R> {
        return new Promise((resolve, reject) => {
            const listener = (evt: MessageEvent<Message> ) => {

                if(isResponseOfMessage(evt.data,cmd)) {
                    window.removeEventListener('message', listener);

                    if(isErrorMessage(evt.data)) {
                        return reject(evt.data.error);
                    }
                    resolve((evt as MessageEvent).data);
                }
            }
    
            window.addEventListener('message',listener);
            worker.postMessage(cmd, options);
            
    
            
    
        });
    }
}