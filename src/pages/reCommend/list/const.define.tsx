import React from 'react';
import { Icon } from 'antd';

export const columns = ({ removeAction, getColumnSearchProps, printAction, editAction }: any) => [
  {
    title: '',
    key: 'id',
    render: (value: string, rowValue: any) => (
      <div>
        {/* <Icon
            type="printer"
            style={{ color: 'blue' }}
            onClick={() => (printAction ? printAction(rowValue) : null)}
          />
          <br /> */}
        <Icon
          type="edit"
          style={{ color: 'blue' }}
          onClick={() => (editAction ? editAction(rowValue) : null)}
        />
      </div>
    ),
  },
  {
    title: 'Sản phẩm',
    dataIndex: 'ProductId',
    key: 'ProductId',
    width: '20%',
    ...getColumnSearchProps('ProductId'),
    sorter: true,
  },
  {
    title: 'NCC',
    dataIndex: 'UserId',
    key: 'UserId',
    width: '20%',
    ...getColumnSearchProps('UserId'),
    sorter: true,
    render: true,
  },
  {
    title: 'Nội dung',
    dataIndex: 'Content',
    key: 'Content',
    sorter: true,
    render: true,
  },
  {
    title: 'Hiển thị',
    dataIndex: 'isActive',
    key: 'isActive',
    width: '20%',
    sorter: true,
  },
  {
    title: 'Delete',
    key: 'delete',
    render: (value: string, rowValue: any) => (
      <div style={{ textAlign: 'center' }}>
        <Icon
          type="delete"
          style={{ color: 'blue' }}
          onClick={() => (removeAction ? removeAction(rowValue) : null)}
        />
      </div>
    ),
  },
];
