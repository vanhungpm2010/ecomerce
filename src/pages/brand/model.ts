import { Effect } from '@/common/Effect';
import { Reducer } from 'redux';
import { ModelType } from '@/common/ModelType';
import { BaseEffectType } from '@/common/types/BaseEffectType';
import { BaseReducerType } from '@/common/types/BaseReducerType';
import { successMsg, errorMsg } from '@/common/services/highline.corner';
import {
  deleteData,
  searchData,
  createData,
  readData,
  updateData,
  undoDeleteData,
} from './service';

interface StateType {
  tableItems: any[];
  pagination: any;
}

interface CustomEffectType extends BaseEffectType {
  actionUpdateField: Effect<any>;
  undoDeleteAction: Effect<any>;
  resetModelData: Effect<any>;
}

interface CustomReduceType extends BaseReducerType {
  setField: Reducer<any>;
  resetState: Reducer<any>;
}

export const namespace = 'brand';

const Model: ModelType<StateType, CustomEffectType, CustomReduceType> = {
  namespace,

  state: {
    tableItems: [],
    pagination: {},
  },

  effects: {
    *resetModelData({ payload }, { call, put }) {
      yield put({ type: 'resetState', payload: {} });
    },
    *actionUpdateField({ payload }, { call, put }) {
      yield put({ type: 'setField', payload });
    },
    *searchData({ payload }, { call, put }) {
      // send data to search function by payload parameter
      const respone = yield call(searchData, {
        searchField: payload.searchField,
        sortField: payload.sortField,
        currentPage: payload.current || 1,
      });

      if (respone && respone.data) {
        const { totalRecord, result } = respone.data;
        const updatedData = {
          tableItems: result,
          tableLoading: false,
          pagination: { total: totalRecord },
        };
        yield put({ type: 'setField', payload: updatedData });
      } else {
        yield put({ type: 'setField', payload: { tableLoading: false } });
      }
    },
    *createData({ payload }, { call, put }) {
      const response = yield call(createData, payload);

      if (response && response.status === 'ok') {
        successMsg({});
        return true;
      }

      errorMsg({});
      return false;
    },
    *readData({ payload }, { call, put }) {
      const { id } = payload;
      const response = yield call(readData, id);

      const updatedData = response ? response.data : null;

      yield put({ type: 'setField', payload: { addInfo: updatedData } });

      return updatedData;
    },
    *updateData({ payload }, { call, put }) {
      const response = yield call(updateData, payload);

      if (response && response.status === 'ok') {
        successMsg({});
        return true;
      }

      errorMsg({});
      return false;
    },
    *undoDeleteAction({ payload }, { call, put }) {
      const { id } = payload;
      yield call(undoDeleteData, id);
    },
    *deleteData({ payload }, { call, put }) {
      const { id, undoAction } = payload;
      const response = yield call(deleteData, id);

      if (response && response.status === 'ok') {
        successMsg({
          actionUndo: () => {
            undoAction();
          },
        });
      } else {
        errorMsg({});
      }
    },
  },

  reducers: {
    resetState(state) {
      return {};
    },
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
    setDeleteData(state, { payload }) {
      if (payload && payload.status === 'ok') {
        successMsg({
          actionUndo: () => {
            alert('undo action');
          },
        });
      } else {
        errorMsg({});
      }

      return state;
    },
  },
};

export default Model;
