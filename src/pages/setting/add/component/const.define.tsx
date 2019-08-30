import React from 'react';
import { Icon, Button } from 'antd';

export const docColumns = ({ editAction, deleteAction, preview }: any) => [
  {
    title: 'Action',
    dataIndex: 'id',
    key: 'id',
    render: (dataIndex: string, rowValue: any) => (
      <div>
        {/* <Icon type="edit" style={{ color: 'blue' }} onClick={() => editAction(rowValue)} />
          <br /> */}
        <Icon type="delete" style={{ color: 'blue' }} onClick={() => deleteAction(dataIndex)} />
      </div>
    ),
  },
  {
    title: 'Document Type',
    dataIndex: 'DocumentType',
    key: 'DocumentType',
  },
  {
    title: 'Document Name',
    dataIndex: 'DocumentName',
    key: 'DocumentName',
  },
  {
    title: 'Preview',
    dataIndex: 'FileName',
    key: 'FileName',
    render: (dataIndex: string, rowValue: any) => (
      <Button onClick={() => preview(rowValue)}>Preview</Button>
    ),
  },
];
