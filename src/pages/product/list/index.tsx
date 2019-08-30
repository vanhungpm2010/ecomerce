import React, { Component } from 'react';
import { connect } from 'dva';
import { router, Link } from 'umi';
import { Table, Icon } from 'antd';
import { columns } from './const.define';
import { namespace } from '../model';
import { getColumnSearchProps } from '@/utils/components/searchField.component';

const mapStateToProps = (state: any) => {
  const tmpState = { ...state[namespace] };
  return tmpState;
};

@connect(mapStateToProps)
class AddProduct extends Component<any, any> {
  state = {
    searchText: '',
    paginData: {},
  };

  componentDidMount() {
    this.fetch();
  }

  fetch = (params = {}) => {
    this.updateModel({ tableLoading: true });
    const { dispatch } = this.props;

    dispatch({
      type: `${namespace}/searchData`,
      payload: {
        ...params, // send data to model
      },
    });
  };

  handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const { paginData } = this.state;
    paginData['sortField'] = {};
    paginData['sortField'] = sorter.field
      ? `${sorter.field}-${sorter.order === 'ascend' ? 'ASC' : 'DESC'}`
      : '';
    paginData['pageSize'] = pagination.pageSize;
    paginData['current'] = pagination.current;

    this.setState({ ...this.state, paginData }, () => this.fetch(this.state.paginData));
  };

  searchData = (event: any) => {
    const { paginData } = this.state;
    if (!paginData['searchField']) {
      paginData['searchField'] = {};
    }

    if (!event) {
      paginData['searchField'] = {};
    } else {
      event.preventDefault();

      for (let i = 0; i < event.target.length; i++) {
        if (event.target[i].name) {
          const { name, value } = event.target[i];
          paginData['searchField'][name] = value;
        }
      }
    }

    this.setState({ ...this.state, paginData }, () => this.fetch(this.state.paginData));
    return false;
  };

  undoAction = (id: number) => {
    this.callDispatch('undoDeleteAction', { id }).then(() => this.refreshTable());
  };

  refreshTable = () => {
    this.fetch(this.state.paginData);
  };

  removeAction = (rowValue: any) => {
    const { id } = rowValue;
    this.callDispatch('deleteData', {
      id,
      undoAction: () => this.undoAction(id),
    }).then(() => this.refreshTable());
  };

  editAction = (rowValue: any) => {
    const { id } = rowValue;

    const navData: any = {
      pathname: '/product/add',
      query: { id },
    };
    router.push(navData);
  };

  private updateModel(payload: any) {
    this.callDispatch('actionUpdateField', payload);
  }

  private callDispatch(action: string, payload?: any) {
    const { dispatch } = this.props;
    return dispatch({ type: `${namespace}/${action}`, payload });
  }

  render() {
    const columnProps = {
      getColumnSearchProps: (value: any) => getColumnSearchProps(value, this.searchData),
      removeAction: this.removeAction,
      editAction: this.editAction,
    };

    const { tableItems, tableLoading, pagination } = this.props;

    return (
      <React.Fragment>
        <h1 style={{ textAlign: 'center', fontWeight: 700, fontSize: '18px' }}>
          Danh sách sản phẩm
        </h1>

        <Link to="/product/add">
          <Icon type="plus" /> Thêm sản phẩm
        </Link>

        <Table
          columns={columns(columnProps)}
          dataSource={tableItems}
          pagination={pagination || {}}
          loading={tableLoading}
          onChange={this.handleTableChange}
        />
      </React.Fragment>
    );
  }
}

export default AddProduct;
