import * as React from "react";
import * as ReactDOM from "react-dom";
import { createZip, downloadZip } from "../optimizer/download";
import { Messanger as Messenger } from "../figma/messanger";
import { Optimizer } from "../optimizer/optimizer";
import "./ui.css";
import { useEffect, useState } from "react";
import { SVGData } from "src/shared/types";
import { ExportList } from "./export-list";

function App() {
  const [loading, setLoading] = useState(true);
  const [svgs, setSVGs] = useState<SVGData[]>([]);
  const optimizer = new Optimizer();
  const messanger = new Messenger();
 
  // init
  useEffect( () => { (async () => {
    const exportResponse = await messanger.exportSelectedSvgs();
    const optimizeResponse = await optimizer.optimizeSvg(exportResponse.svgs);
    console.log(`Optimized ${optimizeResponse.length} SVGs`);
    setSVGs(optimizeResponse);
    setLoading(false);
  })();}, []);

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  };

  return (
    <main>
        { loading ? "Loading" : <ExportList svgs={svgs}/>}
    </main>
  );
}



ReactDOM.render(<App />, document.getElementById("react-page"));
