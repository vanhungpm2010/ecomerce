import React from 'react';
import { Icon } from 'antd';
import { formatLang } from '@/common/constants/const.define';

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
    title: formatLang('component.brand.label'),
    dataIndex: 'BrandName',
    key: 'BrandName',
    width: '20%',
    ...getColumnSearchProps('ProductCode'),
    sorter: true,
  },
  {
    title: formatLang('component.title.label'),
    dataIndex: 'Title',
    key: 'Title',
    width: '20%',
    sorter: true,
    render: true,
  },
  {
    title: formatLang('component.content.label'),
    dataIndex: 'Content',
    key: 'Content',
    sorter: true,
    render: true,
  },
  {
    title: formatLang('component.description.label'),
    dataIndex: 'Description',
    key: 'Description',
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
