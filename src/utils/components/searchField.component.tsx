import { Form, Input, Button, Icon } from 'antd';
import React from 'react';

interface FilterDropdownInput {
  clearFilters: Function;
  confirm: Function;
  filters: any;
  getPopupContainer: Function; // getPopupContainer(triggerNode)
  prefixCls: string;
  selectedKeys: any[];
  setSelectedKeys: Function; // setSelectedKeys(selectedKeys)
}

export const getColumnSearchProps = (dataIndex: string, searchAction: any) => {
  let searchInput: Input;
  return {
    searchInput: {},
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: FilterDropdownInput) => (
      <Form style={{ padding: 8 }} onSubmit={searchAction}>
        <Input
          name={dataIndex}
          ref={node => {
            searchInput = node;
          }}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          placeholder={`Search ${dataIndex}`}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          icon="search"
          size="small"
          htmlType="submit"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          size="small"
          style={{ width: 90 }}
          onClick={() => {
            clearFilters();
            searchAction(null);
          }}
        >
          Reset
        </Button>
      </Form>
    ),
    filterIcon: (filtered: string) => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: (text: string) => (text ? text.toString() : ''),
  };
};
