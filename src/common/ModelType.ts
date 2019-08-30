export interface ModelType<S, E, R> {
  namespace: string;
  state: S;
  effects: E;
  reducers: R;
}
