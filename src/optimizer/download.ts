
import * as JSZip from 'jszip';
import { SVGData } from "../shared/types";


export async function createZip( options: {
    svgs: SVGData[];} ) {
    const zip = new JSZip();
    for( const file of options.svgs) {
        zip.file(`${file.name}.svg`, file.svg);
    }
    const blob = await zip.generateAsync({type: "blob" });
    return blob;
}

export const downloadZip = (function () {
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');

    return function (blob: Blob, fileName: string) {
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    };
  })();

