let routes = [
  {
    path: '/',
    name: 'layout',
    redirect: {name: 'index'},
    component: 'layout',
    children: [
      {
        path: '/index',
        name: 'index',
        // component: ()=> import('../../views/index'),
        component: 'index/index'
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: 'login/index'
  },
  {
    path: '*',
    redirect: {name: 'index'}
  }
]

// 获取路由信息方法
let getRoutes = function () {
  // 自动生成路由
  createRoute(routes);
  return routes

}

// 自动生成路由
function createRoute (arr) {
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].component) return
    // 自动生成component
    let componentFun = import(`../../views/${arr[i].component}.vue`)
    arr[i].component = () => componentFun
    if (arr[i].children && arr[i].children.length > 0) {
      createRoute(arr[i].children)
    }
  }
}

export default getRoutes()