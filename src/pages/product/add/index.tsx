import React from 'react';
import { Form, Row, Tabs, Progress, Col, Spin, Input, Cascader, Select } from 'antd';
import { connect } from 'dva';

import { TabGeneralDeailsForm as TmpTabGeneralDeailsForm } from './components/TabGeneralDetails/index';
import { TabBasicInformationForm as TmpTabBasicInformationForm } from './components/TabBasicInformation';
import Tab1Main from './components/TabMainInfomation';

import TabProductDetails from './components/TabProductDetails';
import { namespace } from '../model';
import './index.less';
import { saveMsg } from '@/common/services/highline.corner';

const { TabPane } = Tabs;

const TabBasicInformationForm: any = TmpTabBasicInformationForm;
const TabGeneralDeailsForm: any = TmpTabGeneralDeailsForm;

const mapStateToProps = (state: any) => {
  const { loading } = state;
  const tmpState = {
    ...state[namespace],
    ...{ loading: loading.effects[`${namespace}/readData`] || false },
    ...{
      submiting:
        loading.effects[`${namespace}/createData`] || loading.effects[`${namespace}/updateData`],
    },
    currentCompany: state['company'] ? state['company'].currentCompany : '',
  };
  return tmpState;
};

@connect(mapStateToProps)
class AddProduct extends React.Component<any, any> {
  public state: any = {
    activeTab: '1',
    progressPercent: 25,
    dataInfo: {},
    data: [],
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

  changeValue = ({ key, value }: any) => {
    const { dataInfo } = this.state;
    const tmpDataInfo = { ...dataInfo };

    tmpDataInfo[key] = value;

    this.setState({ ...this.state, dataInfo: tmpDataInfo });
  };

  private updateModel(payload: any) {
    this.callDispatch('actionUpdateField', payload);
  }

  private callDispatch(action: string, payload?: any) {
    const { dispatch } = this.props;
    return dispatch({ type: `${namespace}/${action}`, payload });
  }

  changeTabsNum(activeKey: string) {
    this.setState({ activeTab: activeKey });

    const tabNum = 4;
    this.setState({ progressPercent: (100 / tabNum) * Number.parseInt(activeKey, 10) });
  }
  onChangeValue = (e: any) => {};
  changeSelectValue = (value: any) => {};
  handleSearchCategory = (value: any) => {};
  handleChangeCategory = (value: any) => {};
  onChangeCategory = (value: any) => {
    console.log(value);
  };
  render() {
    const { addInfo, loading } = this.props;

    const tabProps = {
      addInfo,
      changeValue: this.changeValue,
      changeTabs: this.changeTabs,
    };
    const residences = [
      {
        value: 'zhejiang',
        label: 'Giày dép & Quần áo nữ',
        children: [
          {
            value: 'hangzhou',
            label: 'Tivi & Viddeo',
            children: [
              {
                value: 'xihu',
                label: 'Tivi & Viddeo',
              },
            ],
          },
        ],
      },
      {
        value: 'jiangsu',
        label: 'Máy vi tính & Laptop',
        children: [
          {
            value: 'nanjing',
            label: 'Máy ảnh & Máy bay camera',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Máy ảnh & Máy bay camera',
              },
            ],
          },
        ],
      },
      {
        value: 'jiangsu1',
        label: 'Điện thoại & Máy tính bảng',
        children: [
          {
            value: 'nanjing1',
            label: 'Đồ chơi',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Đồ chơi',
              },
            ],
          },
        ],
      },
    ];
    const options = this.state.data.map((d: any) => (
      <Select.Option key={d.value}>{d.text}</Select.Option>
    ));
    return (
      <Spin tip="Loading..." spinning={loading}>
        <h1 style={{ textAlign: 'center', fontWeight: 700, fontSize: '18px' }}>
          Thêm sản phẩm mới
        </h1>
        <Progress percent={Math.round(this.state.progressPercent)} />
        <Form className="setting-boder">
          <Row>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item required label="Tên sản phẩm: ">
                <Input name="Brand" onChange={this.onChangeValue} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item required label="Thương hiệu:">
                <Select
                  showSearch
                  value={this.state.value}
                  placeholder={this.props.placeholder}
                  style={this.props.style}
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  onSearch={this.handleSearchCategory}
                  onChange={this.handleChangeCategory}
                  notFoundContent={null}
                >
                  {options}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Form.Item required label="Danh mục hàng:">
              <Cascader options={residences} onChange={this.onChangeCategory} />
            </Form.Item>
          </Row>

          <Row>
            <Tabs activeKey={this.state.activeTab} onChange={this.changeTabs}>
              <TabPane tab="Thông tin chung" key="1">
                <TabGeneralDeailsForm {...tabProps} />
              </TabPane>

              <TabPane tab="Thông tin cơ bản" key="2">
                <TabBasicInformationForm {...tabProps} />
              </TabPane>

              <TabPane tab="Thuộc tính chính" key="3">
                <Tab1Main {...tabProps} />
              </TabPane>

              <TabPane tab="Thông tin sản phẩm" key="4">
                <TabProductDetails {...tabProps} />
              </TabPane>
            </Tabs>
          </Row>
        </Form>
      </Spin>
    );
  }
}

export default Form.create()(AddProduct);
