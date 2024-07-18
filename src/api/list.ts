import type { DescData } from '@arco-design/web-vue/es/descriptions/interface'
import axios from 'axios'
import qs from 'query-string'

export interface PolicyIPRecord {
  id: number
  tac: number
  cid: number
  freq: number
  pci: number
  imsi: number
  tmsi: number
  rnti: number
  srcip: string
  dstip: string
  timestamp: string
  count: number
}

export interface PolicyIpParams extends Partial<PolicyIPRecord> {
  current: number
  pageSize: number
}


export function queryIpList(params: PolicyIpParams) {
  console.log('数据读取')
  return axios.post<PolicyIPRecord[]>('air/searchlatest', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj)
    },
  })
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
