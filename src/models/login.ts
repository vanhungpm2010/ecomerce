import { AnyAction, Reducer } from 'redux';
import { parse, stringify } from 'qs';

import { EffectsCommandMap } from 'dva';
import { routerRedux } from 'dva/router';

import { setAuthority, setToken } from '../utils/authority';

export function getPageQuery(): string {
  return parse(window.location.href.split('?')[1]);
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: {};
  effects: {
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<{}>;
  };
}

const Model: ModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *logout(_, { put }) {
      const { redirect } = getPageQuery();
      yield put({
        type: 'changeLoginStatus',
        payload: { currentAuthority: 'guest', token: '' },
      });
      // redirect
      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      } else {
        window.location.href = '/user/login';
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      setToken(payload.token);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
