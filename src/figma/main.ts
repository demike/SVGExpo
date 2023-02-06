import { EXPORT_SVGS_CMD, EXPORT_SVGS_RESPONSE, SVGData } from "../shared/types";
import { getSerializedSelection } from "./util";


figma.showUI(__html__, { themeColors: true, height: 600, width: 800 });
figma.ui.onmessage = async (msg) => {

  switch(msg.type) {
    case EXPORT_SVGS_CMD:
      const svgs = await exportSVG()
      figma.ui.postMessage({ id: msg.id, type: EXPORT_SVGS_RESPONSE, svgs });
      // figma.closePlugin();
      break;
  }
};


export const exportSVG = async () => {
  
  // Get the selected items in the document
  console.log("Start SVG Export");

  const selectedItems = figma.currentPage.selection;
  const svgs: SVGData[] = (await getSerializedSelection(selectedItems)).filter(item => item.svg.length > 0);
 
  console.log(`Exported ${svgs.length} SVGs`);

  return svgs;
};
