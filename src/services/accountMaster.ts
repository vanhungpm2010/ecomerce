import CMRequest from '@/common/services/CMRequest';

const URL = '/account';

export async function fetchAll(): Promise<any> {
  return CMRequest(URL, { params: {} });
}

export async function readData(id: number) {
  return CMRequest(`${URL}?id=${id}`, {
    method: 'GET',
  });
}
