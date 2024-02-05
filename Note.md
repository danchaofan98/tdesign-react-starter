```bash
├── assets                              # 静态资源
│   ├── image
│   └── svg
├── components                          # 公共组件(非路由组件)
│   ├── Board
│   ├── DatePicker
│   └── ErrorPage
├── configs                             # 配置文件
│   ├── color.ts
│   └── host.ts
├── hooks                               # 自定义 hooks，封装复用数据和逻辑
├── layouts                             # 中后台项目特有的布局样式
│   ├── components
│   │   ├── AppLayout.tsx
│   │   ├── Content
│   │   ├── Footer
│   │   ├── Header
│   │   ├── Menu
│   │   └── Setting
│   └── index.tsx
├── modules                             # redux 的 store
│   ├── store.ts
│   ├── global
│   ├── list
│   └── user
├── pages                               # 路由组件
│   ├── Dashboard
│   ├── Detail
│   ├── Form
│   ├── List
│   ├── Login
│   ├── Result
├── router                              # 路由器
│   ├── index.ts
│   └── modules
│       ├── dashboard.ts
│       ├── detail.ts
│       ├── form.ts
│       ├── list.ts
│       ├── login.ts
│       ├── others.ts
│       ├── result.ts
│       └── user.ts
├── services                            # API 请求
│   ├── contract.ts
│   └── product.ts
├── styles                              # 公共样式
├── types                               # TS 类型定义
├── utils                               # 工具箱
│   ├── chart.ts
│   ├── color.ts
│   ├── path.ts
│   └── request.ts
├── global.d.ts                         # TS 声明文件，定义全局变量和类型
└── main.tsx                            # 入口文件
```
