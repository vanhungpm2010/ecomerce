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
    title: 'Tiêu đề',
    dataIndex: 'Title',
    key: 'Title',
    width: '20%',
    ...getColumnSearchProps('Title'),
    sorter: true,
  },
  {
    title: 'Miêu tả',
    dataIndex: 'Description',
    key: 'Description',
    sorter: true,
    render: true,
  },
  {
    title: 'Nội dung',
    dataIndex: 'Content',
    key: 'Content',
    width: '20%',
    sorter: true,
    render: true,
  },
  {
    title: 'Khu vực hiển thị',
    dataIndex: 'CategoryId',
    key: 'CategoryId',
    ...getColumnSearchProps('CategoryId'),
    sorter: true,
  },
  {
    title: 'Hiển thị',
    dataIndex: 'isActive',
    key: 'isActive',
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
