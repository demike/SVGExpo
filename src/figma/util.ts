import { SVGData } from "src/shared/types"

const serialize = async (node: SceneNode): Promise<SVGData> => {
    const svg = await node.exportAsync({ format: 'SVG' })
  
    return {
      name: node.name,
      id: node.id,
      svg
    }
}
  
export const getSerializedSelection = (selection: readonly SceneNode[]) =>
    Promise.all(selection.map(serialize));