
import axios from 'axios'


export interface IPRecord {
  id: number
  number: number
  tac: number
  contentType: 'img' | 'horizontalVideo' | 'verticalVideo'
  filterType: 'artificial' | 'rules'
  count: number
  status: 'online' | 'offline'
  createdTime: string
}

export interface IpParams extends Partial<IPRecord> {
  current: number
  pageSize: number
}

export interface IpListRes {
  list: IPRecord[]
  total: number
}


export function queryIpList() {
  return axios.post('/air/searchlatest')
}

