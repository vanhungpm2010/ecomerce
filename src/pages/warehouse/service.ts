import CMRequest from '@/common/services/CMRequest';
import { getLangId } from '@/utils/utils';

const URL = '/ware-house/admin';
const LangId = getLangId();

export async function searchData({ searchField, sortField, currentPage }: any) {
  return CMRequest(URL, {
    params: { ...searchField, sortColumn: sortField, currentPage, LangId },
  });
}

export async function createData(data: any) {
  return CMRequest(`${URL}/add`, {
    method: 'POST',
    data,
  });
}

export async function readData(id: number) {
  return CMRequest(
    URL,
    {
      params: { id, LangId },
    },
    {
      method: 'GET',
    },
  );
}

export async function updateData(data: any) {
  const { id } = data;
  return CMRequest(`${URL}/update/${id}`, {
    method: 'PATCH',
    data,
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

export async function uploadFile(file: File) {
  const UPLOAD_URL = '/upload/single';

  const formData = new FormData();
  formData.append('filePost', file);
  formData.append('folderType', '1');

  return CMRequest(`${UPLOAD_URL}`, {
    method: 'POST',
    data: formData,
  });
}
