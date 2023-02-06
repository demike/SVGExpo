
import { OPTIMIZE_SVGS_CMD, OPTIMIZE_SVGS_RESPONSE, SVGData } from "../shared/types";
import { optimize } from "svgo";
import { OptimizeSVGsCommand, OptimizeSVGsResponse } from "../shared/types";

const self = window;

self.addEventListener('message', (msg: { data: OptimizeSVGsCommand }) => {
 
    if(msg.data.type !== OPTIMIZE_SVGS_CMD) {
        return;
    }
    console.log("In SVGO Web Worker");
    const result = optimizeSVGs(msg.data);
    const transferables = result.svgs.map(item => item.svg.buffer);
    self.postMessage(result, '*', transferables);
  });


export function optimizeSVGs(options: OptimizeSVGsCommand ): OptimizeSVGsResponse {
    const selectedItems = options.svgs;
    const result: SVGData[] = [];

    console.log(`Optimizing ${options.svgs.length} SVGs`)
    // Iterate through the selected items
    const encoder = new TextEncoder();
    const decoder = new TextDecoder('utf-8');
    for (const [index, item] of selectedItems.entries()) {
        // Optimize the SVG string using SVGO
        const svg = encoder.encode(optimize(decoder.decode(item.svg)).data)
        result.push({ name: item.name, id: item.id, svg });
    }


    return  {
        id: options.id,
        svgs: result,
        type: OPTIMIZE_SVGS_RESPONSE
    }
}

export default (null as any) as typeof Worker;
