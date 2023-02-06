import * as React from "react";
import { useEffect } from "react";
import { createZip, downloadZip } from "../optimizer/download";
import { SVGData } from "../shared/types";
import './export-list.css';

export function ExportItem(props: { svg: SVGData }) {
    const objUrl = URL.createObjectURL(new Blob([props.svg.svg], {type: "image/svg+xml"}));
    useEffect( () => unmount, [] );

    const unmount = () => {
        URL.revokeObjectURL(objUrl);
    }
    return <div className="export-item">
        <img className="export-item-icon" src={objUrl}/>
        <div>{props.svg.id}</div>
        <div>{props.svg.name}</div>
    </div>
}

export function ExportList(props: { svgs: SVGData[] }) {

    const onEditPresets = () => {};
    const onRequestExportAll = async () => {
      const zip = await createZip({ svgs: props.svgs });
      downloadZip(zip, `figma-svg-export.zip`);
    };
return (<div><header>
    <img src={require("./assets/logo.svg")} />
    <h2>SVG Expo(rt)</h2>
  </header>
  <section>
    <ol>
        {props.svgs.map((svg) => <li><ExportItem key={svg.id} svg={svg}/></li>)}
    </ol>
  </section>
  <footer>
    <button className="brand" onClick={onRequestExportAll}>
      Export All
    </button>
    <button onClick={onEditPresets}>Edit Presets</button>
  </footer></div>);
    
}