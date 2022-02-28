import {
  getRequest
} from '../api'

export const initMenu = (router, store) => {
  if (!store.state.routes.length) {
    console.log('vuex中没有数据')
    getRequest('/system/menu').then(data => {
      if (data) {
        // 格式化router
        const fmtRoutes = formatRoutes(data)
        // 添加到路由
        router.addRoutes(fmtRoutes)
        // 将数据存入vuex
        store.commit('initRoutes', fmtRoutes)
      }
    })
  }
}

export const formatRoutes = (routes) => {
  const fmtRoutes = []
  // 格式化routes
  routes.forEach(router => {
    let {
      path,
      component,
      name,
      iconCls,
      children
    } = router
    if (children && children instanceof Array) {
      // @ts-ignore
      children = formatRoutes(children)
    }
    const fmtRouter = {
      path: path,
      name: name,
      iconCls: iconCls,
      children: children,
      component(resolve) {
        // @ts-ignore
        if (component.startsWith('Home')) {
          require(['../views/' + component + '.vue'], resolve)
        } else if (component.startsWith('Emp')) {
          require(['../views/emp/' + component + '.vue'], resolve)
        } else if (component.startsWith('Per')) {
          require(['../views/per/' + component + '.vue'], resolve)
        } else if (component.startsWith('Sal')) {
          require(['../views/sal/' + component + '.vue'], resolve)
        } else if (component.startsWith('Sta')) {
          require(['../views/sta/' + component + '.vue'], resolve)
        } else if (component.startsWith('Sys')) {
          require(['../views/sys/' + component + '.vue'], resolve)
        }
      }
    }
    fmtRoutes.push(fmtRouter)
  })
  return fmtRoutes
}
