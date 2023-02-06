
export interface SVGData {
  name: string
  id: string
  svg: Uint8Array
}

export interface PluginSettings {
  userId: string
  settings: PluginSettings
  totalSaved: number
  version: number
}


export interface OptimizerPluginSettings {

}

export interface Message {
  type: string;
  id: number;
  [prop: string]: any;
  
}


export interface ErrorMessage{
  type: string;
  id: number;
  error: Error
}

export const RESPONSE_ENDING = 'response'

export const EXPORT_SVGS_CMD = "export-svgs";
export const EXPORT_SVGS_RESPONSE = `${EXPORT_SVGS_CMD}-${RESPONSE_ENDING}`;

export const OPTIMIZE_SVGS_CMD = "optimize-svgs";
export const OPTIMIZE_SVGS_RESPONSE = `${OPTIMIZE_SVGS_CMD}-${RESPONSE_ENDING}`;

export const DOWNLOAD_ZIP_CMD = "download-zip";
export const DOWNLOAD_ZIP_RESPONSE = `${DOWNLOAD_ZIP_CMD}-${RESPONSE_ENDING}`;

export interface ExportSVGResponse extends Message {
  type: typeof EXPORT_SVGS_RESPONSE;
  svgs: SVGData[];
};



export interface OptimizeSVGsCommand extends Message {
  type: typeof OPTIMIZE_SVGS_CMD;
  svgs: SVGData[];
} 

export interface OptimizeSVGsResponse extends Message {
  type: typeof OPTIMIZE_SVGS_RESPONSE;
  svgs: SVGData[];
};

export interface DownloadZipCommand extends Message {
  type: typeof DOWNLOAD_ZIP_CMD;
  fileName: string
  svgs: SVGData[];
} 

export interface DownloadZipResponse extends Message {
  type: typeof DOWNLOAD_ZIP_RESPONSE;
  fileContent: Blob;
  fileName: string;
};


