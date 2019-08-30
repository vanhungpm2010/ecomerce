import { Button, Spin, Form, Row, Col, Input, Checkbox, Upload, Icon, Cascader, Tabs } from 'antd';

import React, { Component } from 'react';
import Editor from './const.define';
import TabGeneral from './component/tabGeneral';
import { saveMsg } from '@/common/services/highline.corner';
import { connect } from 'dva';
import './index.less';
import styles from './style.less';

import 'antd/dist/antd.css';
import { TabAccountBankForm as tmpTabAccountBankForm } from './component/tabAccountBankForm';
import { TabAddressForm as tmpTabAddressForm} from './component/tabAddressForm';
import { TabStallInformationForm as tmpTabStallInformationForm } from './component/tabStallInformationForm';


import { formItemLayout } from '@/common/constants/formItemLayout';
import { namespace } from '../model';
import { errorMsg, successMsg } from '@/common/services/highline.corner';
import { formatLang, UploadedFolderType, BASE_URL } from '@/common/constants/const.define';

const { TabPane } = Tabs;
const TabAccountBankForm: any = tmpTabAccountBankForm;
const TabAddressForm: any = tmpTabAddressForm;
const TabStallInformationForm: any = tmpTabStallInformationForm;

const mapStateToProps = (state: any) => {
  const { loading } = state;
  const tmpState = {
    ...state[namespace],
    ...{
      loading:
        loading.effects[`${namespace}/readData`] ||
        loading.effects[`${namespace}/searchData`] ||
        false,
    },
    ...{
      submiting:
        loading.effects[`${namespace}/createData`] || loading.effects[`${namespace}/updateData`],
    },
  };
  console.log('state', state);
  return tmpState;
};
@connect(mapStateToProps)
class AddCategory extends Component<any, any> {
  state = {
    id: '',
    loading: false,
    activeTab: '1',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { id } = this.props.location.query;
    this.fetch();

    if (id) {
      dispatch({
        type: `${namespace}/readData`,
        payload: { id },
      })
    }
  }

  tableItems = (tableItems: any) => {
    return tableItems.filter((value: any) => value.ParentId === 0);
  };
  fetch = (params = {}) => {
    const { dispatch } = this.props;

    dispatch({
      type: `${namespace}/searchData`,
      payload: {
        ...params, // send data to model
      },
    });
  };

  handleCancel = () => this.setState({ previewVisible: false });
  updateModel = (payload: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'updateModel',
      payload,
    });
  };
  
  changeTabs = (activeKey: string, saveData?: any) => {
    const { addInfo } = this.props;

    if (saveData) {
      const tmp = { ...addInfo, ...saveData };
      this.updateModel({ addInfo: tmp });
      saveMsg({});
    }

    this.changeTabsNum(activeKey);
  };
  changeTabsNum(activeKey: string) {
    this.setState({ activeTab: activeKey });

    const tabNum = 4;
    this.setState({ progressPercent: (100 / tabNum) * Number.parseInt(activeKey, 10) });
  }
  render() {
    const { submitting, loading, addInfo } = this.props;
    const { errorUpload } = this.state;
    const { id } = this.props.location.query;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    //const Authorization = getToken();
    // const uploadProps = {
    //   name: 'filePost',
    //   action: `${BASE_URL}/upload/single`,
    //   headers: {
    //     Authorization,
    //   },
    //   data: { folderType: UploadedFolderType.Category },
    //   onChange: this.handleChange,
    //   showUploadList: false,
    //   beforeUpload: this.beforeUpload,
    // };
    return (
      <Spin spinning={loading !== undefined && loading} tip="Loading...">
          <h2>
            {id
              ? formatLang('component.submit-update.button')
              : formatLang('component.submit-add.button')}
          </h2>

          <TabGeneral {...this.props}/>

          <Tabs activeKey={this.state.activeTab} onChange={this.changeTabs}>
            <TabPane tab="Thông tin gian hàng" key="1">
              <TabStallInformationForm />
            </TabPane>

            <TabPane tab="Địa chỉ kho" key="2">
              <TabAddressForm />
            </TabPane>

            <TabPane tab="Tài khoản ngân hàng" key="3">
              <TabAccountBankForm />
            </TabPane>

              {/* <TabPane tab="Hỗ trợ khác hàng" key="4">
                <TabSupportCustomer />
              </TabPane> */}
          </Tabs>
      </Spin>
    );
  }
}

export default Form.create()(AddCategory);
