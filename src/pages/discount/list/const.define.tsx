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
    title: 'Code',
    dataIndex: 'ProductCode',
    key: 'ProductCode',
    width: '20%',
    ...getColumnSearchProps('ProductCode'),
    sorter: true,
  },
  {
    title: 'Tên sản phẩm',
    dataIndex: 'ProductName',
    key: 'ProductName',
    width: '20%',
    ...getColumnSearchProps('ProductName'),
    sorter: true,
    render: (value: any) => (value ? value.ProductName : ''),
  },
  {
    title: 'Giảm giá',
    dataIndex: 'discountRate',
    key: 'discountRate',
    sorter: true,
    render: true,
  },
  {
    title: 'Thời gian',
    dataIndex: 'date',
    key: 'date',
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
