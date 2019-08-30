import CMRequest from '@/common/services/CMRequest';

const URL = '/brand';

export async function searchData({ searchField, sortField, currentPage }: any) {
  return CMRequest(URL, { params: { ...searchField, sortColumn: sortField, currentPage } });
}

export async function createData(data: any) {
  return CMRequest(`${URL}/add`, {
    method: 'POST',
    data,
  });
}

export async function readData(id: number) {
  return CMRequest(`${URL}?id=${id}`, {
    method: 'GET',
  });
}

export async function updateData({ id, body }: any) {
  return CMRequest(`${URL}/update/${id}`, {
    method: 'PATCH',
    data: body,
  });
}

export async function deleteData(id: any) {
  return CMRequest(`${URL}/delete/${id}`, {
    method: 'DELETE',
  });
}
export async function undoDeleteData(id: any) {
  return CMRequest(`${URL}/restore/${id}`, {
    method: 'DELETE',
  });
}
