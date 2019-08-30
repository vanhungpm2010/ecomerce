import React from 'react';
import { Icon } from 'antd';
import { formatLang } from '@/common/constants/const.define';

export const columns = ({ removeAction, getColumnSearchProps, printAction, editAction }: any) => [
  {
    title: '',
    key: 'id',
    render: (
      value: string,
      rowValue: any, // account-master/add
    ) => (
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
    title: 'Thẻ cha',
    dataIndex: 'ParentName',
    key: 'ParentName',
    width: '20%',
    ...getColumnSearchProps('ParentName'),
    sorter: (a: any, b: any) => a.ParentName.trim() < b.ParentName.trim(),
  },
  {
    title: 'Level',
    dataIndex: 'Level',
    key: 'Level',
    width: '20%',
    sorter: (a: any, b: any) => a.Level - b.Level,
  },
  {
    title: formatLang('component.category.label'),
    dataIndex: 'CategoryTranslation.CategoryName',
    key: 'CategoryName',
    width: '20%',
    ...getColumnSearchProps('CategoryName'),
    sorter: (a: any, b: any) => (a.CategoryTranslation.CategoryName).trim() > (b.CategoryTranslation.CategoryName).trim(),
  },
  {
    title: formatLang('component.title.label'),
    dataIndex: 'CategoryTranslation.Title',
    key: 'Title',
    width: '20%',
    sorter: (a: any, b: any) => (a.CategoryTranslation.Title).trim() > (b.CategoryTranslation.Title).trim(),
  },
  {
    title: formatLang('component.description.label'),
    dataIndex: 'CategoryTranslation.Description',
    key: 'Description',
    width: '20%',
    sorter: (a: any, b: any) => (a.CategoryTranslation.Description).trim() > (b.CategoryTranslation.Description).trim(),
  },
  {
    title: formatLang('component.isActive.label'),
    dataIndex: 'IsActive',
    key: 'IsActive',
    sorter: (a: any, b: any) => a.IsActive - b.IsActive,
    render: (value: string) => <p style={{ margin: 0 }}>{value ? 'Yes' : 'No'}</p>,
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
