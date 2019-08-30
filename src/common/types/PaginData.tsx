export interface ResponePagin<T> {
  status: string;
  message: string;
  data: {
    result: T[];
    totalElement: number;
    currentPage: number;
  };
}

export interface PaginData<T> {
  current?: any;
  pageSize?: number;
  total: number;
  results: T[];
  info: {
    results: number;
    page: number;
  };
}
