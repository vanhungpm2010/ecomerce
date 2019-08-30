import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { accountLogin, getFakeCaptcha } from './service';
import { setAuthority, setToken } from './utils/utils';
import { reloadAuthorized } from '../../../utils/Authorized';
import { initialize } from '@/common/services/CMRequest';
import { setLangId } from '@/utils/utils';

export interface StateType {
  status?: 'ok' | string;
  type?: string;
  currentAuthority?: 'User' | 'Provider' | 'Admin';
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    getCaptcha: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'userLogin',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);

      reloadAuthorized();
      // Login successfully
      if (response.status === 'ok') {
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        setLangId('vi');
        window.location.href = '/product/list';
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      setToken(payload.token);
      initialize(payload.token);
      return {
        ...state,
        info: payload.data,
        status: payload.status,
        type: 'account',
      };
    },
  },
};

export default Model;
