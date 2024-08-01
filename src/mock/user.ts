import setupMock, { failResponseWrap, successResponseWrap } from '@/utils/setup-mock'
import Mock from 'mockjs'

import { MockParams } from '@/types/mock'
import { isLogin } from '@/utils/auth'

setupMock({
  setup() {
    // Mock.XHR.prototype.withCredentials = true;

    // 用户信息
    Mock.mock(new RegExp('/api/user/info'), () => {
      if (isLogin()) {
        const role = window.localStorage.getItem('userRole') || 'admin'
        return successResponseWrap({
          name: '恒达安网',
          avatar: 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif',
          email: 'wangliqun@email.com',
          job: 'frontend',
          jobName: '前端工程师',
          organization: 'Frontend',
          organizationName: '前端',
          location: 'wuhan',
          locationName: '武汉',
          introduction: '',
          personalWebsite: 'https://www.arco.design',
          phone: '',
          registrationDate: '',
          accountId: '',
          certification: 1,
          role,
        })
      }
      return failResponseWrap(null, '未登录', 50008)
    })

    // 登录
    Mock.mock(new RegExp('/api/user/login'), (params: MockParams) => {
      const { username, password } = JSON.parse(params.body)
      if (!username) {
        return failResponseWrap(null, '用户名不能为空', 50000)
      }
      if (!password) {
        return failResponseWrap(null, '密码不能为空', 50000)
      }
      if (username === 'admin' && password === 'admin') {
        window.localStorage.setItem('userRole', 'admin')
        return successResponseWrap({
          token: '12345',
        })
      }
      if (username === 'user' && password === 'user') {
        window.localStorage.setItem('userRole', 'user')
        return successResponseWrap({
          token: '54321',
        })
      }
      return failResponseWrap(null, '账号或者密码错误', 50000)
    })

    // 登出
    Mock.mock(new RegExp('/api/user/logout'), () => {
      return successResponseWrap(null)
    })

    // 用户的服务端菜单
    Mock.mock(new RegExp('/api/user/menu'), () => {
      const menuList = [
        {
          path: '/dashboard',
          name: 'dashboard',
          meta: {
            locale: 'menu.server.dashboard',
            requiresAuth: true,
            icon: 'icon-dashboard',
            order: 1,
          },
          children: [
            {
              path: 'workplace',
              name: 'Workplace',
              meta: {
                locale: 'menu.server.workplace',
                requiresAuth: true,
              },
            },
          ],
        },
      ]
      return successResponseWrap(menuList)
    })
  },
})
