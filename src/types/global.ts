export interface AnyObject {
  [key: string]: unknown
}

export interface Options {
  value: unknown
  label: string
}

export interface NodeOptions extends Options {
  children?: NodeOptions[]
}

export interface GetParams {
  body: null
  type: string
  url: string
}

export interface PostData {
  body: string
  type: string
  url: string
}

export interface Pagination {
  pageNo: number
  pageSize: number
  total: number
  isphonenum?: number
  tac?: number
  cid?: number
  tmsi?: number
  rnti?: number
  srcip?: string
  dstip?: string
  endtime?: number
  starttime?: number
  phonenum?: string
}

export type TimeRanger = [string, string]

export interface GeneralChart {
  xAxis: string[]
  data: Array<{ name: string; value: number[] }>
}
