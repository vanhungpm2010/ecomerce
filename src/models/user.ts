import { queryCurrent, query as queryUsers, getUserList } from '@/services/user';

import { Effect } from 'dva';
import { Reducer } from 'redux';

export interface User {
  id: string;
  Avatar?: string;
  UserName?: string;
  FullName?: string;
  Address?: string;
  BirthDate?: string;
  Email?: string;
  Phone?: string;
  UserRoles?: any;
  PhoneNumber?: string;
}

export interface UserModelState {
  currentUser?: User;
}

export const namespace = 'user';

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;

    getUserList: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    setField: Reducer<any>;
    // changeNotifyCount: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace,

  state: {
    currentUser: { id: '0' },
  },

  effects: {
    *getUserList(_, { call, put }) {
      const response = yield call(getUserList);

      const userList = response && response.data ? response.data.result : [];
      yield put({ type: 'setField', payload: { userList } });

      return userList;
    },
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response.result,
      });
    },
  },

  reducers: {
    setField(state, { payload }) {
      const tmpState = { ...state };
      const keyNames = Object.keys(payload);

      // get key/value and update to state
      for (let i = 0; i < keyNames.length; i += 1) {
        const key = keyNames[i];
        const value = payload[key];
        tmpState[key] = value;
      }

      return tmpState;
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    // changeNotifyCount(
    //   state = {
    //     currentUser: {},
    //   },
    //   action,
    // ) {
    //   return {
    //     ...state,
    //     currentUser: {
    //       ...state.currentUser,
    //       notifyCount: action.payload.totalCount,
    //       unreadCount: action.payload.unreadCount,
    //     },
    //   };
    // },
  },
};

export default UserModel;
