import React from 'react';
import { Icon } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';

const formatLang = (id: string) => {
  return formatMessage({ id });
};

export const columns = ({ removeAction, getColumnSearchProps, printAction, editAction }: any) => [
  {
    title: '',
    key: 'id',
    render: (value: string, rowValue: any) => (
      <div>
        <Icon
          type="edit"
          style={{ color: 'blue' }}
          onClick={() => (editAction ? editAction(rowValue) : null)}
        />
      </div>
    ),
  },
  {
    title: 'Key page',
    dataIndex: 'key',
    key: 'key',
    width: '20%',
    ...getColumnSearchProps('key'),
    sorter: true,
  },
  {
    title: formatLang('component.title.label'),
    dataIndex: 'titleVi',
    key: 'titleVi',
    width: '20%',
    sorter: true,
  },
  {
    title: formatLang('component.description.label'),
    dataIndex: 'descriptionVi',
    key: 'descriptionVi',
    width: '20%',
    sorter: true,
  },
  {
    title: formatLang('component.image.label'),
    dataIndex: 'image',
    key: 'image',
    sorter: true,
    render: (img: string) => <img alt="SomeOne" src={img} style={{ width: '45px' }} />,
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
