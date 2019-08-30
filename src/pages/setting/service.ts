import CMRequest from '@/common/services/CMRequest';
import { UploadedFolderType } from '@/common/constants/const.define';

const URL = '/setting/admin';

export async function searchData({ searchField, sortField, currentPage }: any) {
  return CMRequest(URL, { params: { ...searchField, sortColumn: sortField, currentPage } });
}

export async function createData({ body }: any) {
  return CMRequest(`${URL}/add`, {
    method: 'POST',
    data: body,
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

export async function uploadFile(file: File) {
  const UPLOAD_URL = '/upload/single';

  const formData = new FormData();
  formData.append('filePost', file);
  formData.append('folderName', UploadedFolderType);

  return CMRequest(`${UPLOAD_URL}`, {
    method: 'POST',
    data: formData,
  });
}
