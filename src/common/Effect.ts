import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';

export type Effect<NewType> = (
  action: AnyAction,
  effects: EffectsCommandMap & {
    select: <T>(func: (state: NewType) => T) => T;
  },
) => void;
