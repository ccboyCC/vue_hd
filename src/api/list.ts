import type { DescData } from '@arco-design/web-vue/es/descriptions/interface'
import axios from 'axios'
import qs from 'query-string'

export interface IpDataSet {
  tac: number
  cid: number
  tmsi: number
  rnti: number
  srcip: string
  dstip: string
  starttime: number
  endtime: number
}

export interface allsize {
  allsize: number
}


export interface PolicyIpForm {
  pageNo: number
  pageSize: number
  tac: number
  cid: number
  tmsi: number
  rnti: number
  srcip: string
  dstip: string
  starttime: number
  endtime: number
}





export function queryIpList(params: PolicyIpForm) {
  console.log('数据读取')
  return axios.post('air/searchlatest', qs.stringify(params))
}


export function queryIpTime(params: PolicyIpForm) {
  console.log('数据获取')
  return axios.post('air/searchlatest', qs.stringify(params))
}

export interface ServiceRecord {
  id: number
  title: string
  description: string
  name?: string
  actionType?: string
  icon?: string
  data?: DescData[]
  enable?: boolean
  expires?: boolean
}
export function queryInspectionList() {
  return axios.get('/api/list/quality-inspection')
}

export function queryTheServiceList() {
  return axios.get('/api/list/the-service')
}

export function queryRulesPresetList() {
  return axios.get('/api/list/rules-preset')
}
