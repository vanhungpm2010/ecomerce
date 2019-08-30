import { IConfig, IPlugin } from 'umi-types';

import defaultSettings from './defaultSettings';
// https://umijs.org/config/
import os from 'os';
import slash from 'slash2';
import webpackPlugin from './plugin.config';

const { pwa, primaryColor } = defaultSettings;

// preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION, TEST, NODE_ENV } = process.env;
const plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default vi-VN
        default: 'vi-VN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false,
      ...(!TEST && os.platform() === 'darwin'
        ? {
            dll: {
              include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
              exclude: ['@babel/runtime', 'netlify-lambda'],
            },
            hardSource: false,
          }
        : {}),
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
]; // 针对 preview.pro.ant.design 的 GA 统计代码
// preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
}

const uglifyJSOptions =
  NODE_ENV === 'production'
    ? {
        uglifyOptions: {
          // remove console.* except console.error
          compress: {
            drop_console: true,
            pure_funcs: ['console.error'],
          },
        },
      }
    : {};
export default {
  // add for transfer to umi
  plugins,
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  base: '/admin',
  publicPath: '/admin/',
  // history: 'hash',
  hash: false,
  block: {
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  treeShaking: true,
  targets: {
    ie: 11,
  },
  devtool: ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION ? 'source-map' : false,
  // 路由配置
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          name: 'result',
          icon: 'check-circle-o',
          path: '/result',
          hideInMenu: true,
          routes: [
            {
              name: 'success',
              path: '/result/success',
              component: './result/success',
            },
            {
              name: 'fail',
              path: '/result/fail',
              component: './result/fail',
            },
          ],
        },
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'login',
              path: '/user/login',
              component: './user/login',
            },
            {
              name: 'forgot',
              path: '/user/forgot',
              component: './user/forgot',
            },
            {
              name: 'user-activation',
              path: '/user/user-activation',
              component: './userManage/user-activation',
              hideInMenu: true,
            },
          ],
        },

        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['Admin', 'Provider'],
          routes: [
            {
              path: '/dashboard',
              name: 'Dashboard',
              icon: 'dashboard',
              Routes: ['src/pages/Authorized'],
              authority: ['Admin', 'Provider'],
              routes: [
                {
                  name: 'Generality',
                  path: '/dashboard/generality',
                  component: './dashboard/generality',
                  icon: 'ordered-list',
                  Routes: ['src/pages/Authorized'],
                  authority: ['Admin', 'Provider'],
                },
              ],
            },
            {
              path: '/product',
              name: 'Products',
              icon: 'dropbox',
              Routes: ['src/pages/Authorized'],
              authority: ['Admin', 'Provider'],
              routes: [
                {
                  name: 'Manage Products',
                  path: '/product/list',
                  component: './product/list',
                  icon: 'ordered-list',
                  Routes: ['src/pages/Authorized'],
                  authority: ['Admin', 'Provider'],
                },
                {
                  name: 'Add Product',
                  path: '/product/add',
                  component: './product/add',
                  icon: 'plus',
                  Routes: ['src/pages/Authorized'],
                  authority: ['Admin', 'Provider'],
                },
              ],
            },
            {
              path: '/order',
              name: 'Orders',
              icon: 'snippets',
              Routes: ['src/pages/Authorized'],
              authority: ['Admin', 'Provider'],
              routes: [
                {
                  name: 'Manage Orders',
                  path: '/order/list',
                  component: './order/list',
                  icon: 'ordered-list',
                  Routes: ['src/pages/Authorized'],
                  authority: ['Admin', 'Provider'],
                },
                {
                  name: 'Manage Return Orders',
                  path: '/order/reverse',
                  component: './order/reverse',
                  icon: 'plus',
                  Routes: ['src/pages/Authorized'],
                  authority: ['Admin', 'Provider'],
                },
              ],
            },
            {
              path: '/reCommend',
              name: 'Re-Commend',
              icon: 'inbox',
              Routes: ['src/pages/Authorized'],
              authority: ['Admin', 'Provider'],
              routes: [
                {
                  name: 'Manage Re-Commend',
                  path: '/reCommend/list',
                  component: './reCommend/list',
                  icon: 'ordered-list',
                  Routes: ['src/pages/Authorized'],
                  authority: ['Admin', 'Provider'],
                },
              ],
            },
            {
              path: '/category',
              name: 'Categories',
              icon: 'profile',
              Routes: ['src/pages/Authorized'],
              authority: ['Admin'],
              routes: [
                {
                  name: 'Manage Categogies',
                  path: '/category/list',
                  component: './category/list',
                  icon: 'ordered-list',
                  Routes: ['src/pages/Authorized'],
                  authority: ['Admin'],
                },
                {
                  name: 'Add Category',
                  path: '/category/add',
                  component: './category/add',
                  icon: 'plus',
                  Routes: ['src/pages/Authorized'],
                  authority: ['Admin'],
                },
              ],
            },
            {
              path: '/discount',
              name: 'Discounts',
              icon: 'dollar',
              Routes: ['src/pages/Authorized'],
              authority: ['Admin', 'Provider'],
              routes: [
                {
                  name: 'Manage Discounts',
                  path: '/discount/list',
                  component: './discount/list',
                  icon: 'ordered-list',
                  Routes: ['src/pages/Authorized'],
                  authority: ['Admin', 'Provider'],
                },
                {
                  name: 'Add Discount',
                  path: '/discount/add',
                  component: './discount/add',
                  icon: 'plus',
                  Routes: ['src/pages/Authorized'],
                  authority: ['Admin', 'Provider'],
                },
              ],
            },
            {
              path: '/brand',
              name: 'Brands',
              icon: 'shopping-cart',
              Routes: ['src/pages/Authorized'],
              authority: ['Admin'],
              routes: [
                {
                  name: 'Manage Brands',
                  path: '/brand/list',
                  component: './brand/list',
                  icon: 'ordered-list',
                  Routes: ['src/pages/Authorized'],
                  authority: ['Admin'],
                },
                {
                  name: 'Add Brand',
                  path: '/brand/add',
                  component: './brand/add',
                  icon: 'plus',
                  Routes: ['src/pages/Authorized'],
                  authority: ['Admin'],
                },
              ],
            },
            {
              path: '/news',
              name: 'News',
              icon: 'file-text',
              Routes: ['src/pages/Authorized'],
              authority: ['Admin'],
              routes: [
                {
                  name: 'Manage News',
                  path: '/news/list',
                  component: './news/list',
                  icon: 'ordered-list',
                  Routes: ['src/pages/Authorized'],
                  authority: ['Admin'],
                },
                {
                  name: 'Add News',
                  path: '/news/add',
                  component: './news/add',
                  icon: 'ordered-list',
                  Routes: ['src/pages/Authorized'],
                  authority: ['Admin'],
                },
              ],
            },
            {
              path: '/warehouse',
              name: 'Warehouse',
              icon: 'shop',
              Routes: ['src/pages/Authorized'],
              authority: ['Provider'],
              routes: [
                {
                  name: 'Warehouse Information',
                  path: '/Warehouse/add',
                  component: './Warehouse/add',
                  icon: 'plus',
                  Routes: ['src/pages/Authorized'],
                  authority: ['Provider'],
                },
              ],
            },
            {
              path: '/store',
              name: 'Store',
              icon: 'shop',
              Routes: ['src/pages/Authorized'],
              authority: ['Provider'],
              routes: [
                {
                  name: 'Manage Store',
                  path: '/store/list',
                  component: './store/list',
                  icon: 'ordered-list',
                  Routes: ['src/pages/Authorized'],
                  authority: ['Provider'],
                },
              ],
            },
            {
              path: '/userManage',
              name: 'User',
              icon: 'setting',
              Routes: ['src/pages/Authorized'],
              authority: ['Admin'],
              routes: [
                {
                  name: 'User Manage',
                  path: '/userManage/list',
                  component: './userManage/list',
                  icon: 'ordered-list',
                  Routes: ['src/pages/Authorized'],
                  authority: ['Admin'],
                },
                {
                  name: 'Add User',
                  path: '/userManage/add',
                  component: './userManage/add',
                  icon: 'plus',
                  Routes: ['src/pages/Authorized'],
                  authority: ['Admin'],
                },
                {
                  name: 'Register Result',
                  path: '/userManage/register-result',
                  component: './userManage/register-result',
                  Routes: ['src/pages/Authorized'],
                  authority: ['Admin'],
                  hideInMenu: true,
                },
              ],
            },
            {
              path: '/setting',
              name: 'Setting',
              icon: 'setting',
              Routes: ['src/pages/Authorized'],
              authority: ['Admin'],
              routes: [
                {
                  name: 'Manage Setting',
                  path: '/setting/list',
                  component: './setting/list',
                  icon: 'ordered-list',
                  Routes: ['src/pages/Authorized'],
                  authority: ['Admin'],
                },
                {
                  name: 'Add Setting',
                  path: '/setting/add',
                  component: './setting/add',
                  icon: 'plus',
                  Routes: ['src/pages/Authorized'],
                  authority: ['Admin'],
                },
              ],
            },
            {
              name: 'exception',
              icon: 'warning',
              path: '/exception',
              hideInMenu: true,
              routes: [
                {
                  name: '403',
                  path: '/exception/403',
                  component: './exception/403',
                },
                {
                  name: '404',
                  path: '/exception/404',
                  component: './exception/404',
                },
                {
                  name: '500',
                  path: '/exception/500',
                  component: './exception/500',
                },
              ],
            },
            {
              path: '/404',
              redirect: '/exception/404',
              // authority: ['Admin', 'user'],
            },
            {
              path: '/',
              redirect: '/product/list',
              // authority: ['Admin', 'user'],
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  // proxy: {
  //   '/server/api/': {
  //     target: 'https://preview.pro.ant.design/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/server': '' },
  //   },
  // },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      localIdentName: string,
      localName: string,
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/admin',
  },
  uglifyJSOptions,
  chainWebpack: webpackPlugin,
} as IConfig;
