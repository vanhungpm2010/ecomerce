import { Effect } from '@/common/Effect';

export interface BaseEffectType {
  searchData: Effect<any>;
  createData: Effect<any>;
  readData: Effect<any>;
  updateData: Effect<any>;
  deleteData: Effect<any>;
}
