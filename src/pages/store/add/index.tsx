import React from 'react';
import { Form, Row, Tabs, Progress, Col, Spin, Icon } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import TabGeneralDetails from './components/TabGeneralDetails/index';
import TabAddressDetails from './components/TabAddressDetails';
import TabContactDetails from './components/TabContactDetails';
import TabBankingDetails from './components/TabBankingDetails';
import { namespace } from '../model';

import './index.less';
import Button from 'antd/es/button/button';
import { warningMsg, saveMsg } from '@/common/services/highline.corner';

const { TabPane } = Tabs;

interface StateType {
  dataInfo: any;
  progressPercent: number;
  activeTab: string;
}

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
class AddShop extends React.Component<any, StateType> {
  public state: any = {
    activeTab: '1',
    progressPercent: 25,
    dataInfo: {},
  };

  componentWillMount() {
    this.initData();
  }

  componentWillReceiveProps(nextProps: any) {
    const { addInfo } = nextProps;
    this.setState({ dataInfo: addInfo || {} });
  }

  initData = async () => {
    const { dispatch } = this.props;
    const { id } = this.props.location.query;

    if (!dispatch) {
      return;
    }

    await dispatch({ type: `${namespace}/resetModelData` });

    if (dispatch && id) {
      dispatch({ type: `${namespace}/readData`, payload: { id } });
    } else {
      this.setState({ dataInfo: {} });
    }
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

  saveAll = () => {
    const { currentCompany } = this.props;
    const { dataInfo } = this.state;

    if (!dataInfo || !dataInfo.AccountName) {
      warningMsg({ msg: 'Please to enter "Account Name"' });
      return;
    }

    if (dataInfo) {
      const { id } = this.props.location.query;

      const ListAddressDetails = (dataInfo.ListAddressDetails || []).map((item: any) => {
        const tmp = { ...item };
        if (tmp.id && typeof tmp.id === 'string' && tmp.id.match(/^tmp-/)) {
          tmp.id = undefined;
        }
        return tmp;
      });

      const ListContacts = (dataInfo.ListContacts || []).map((item: any) => {
        const tmp = { ...item };
        if (tmp.id && typeof tmp.id === 'string' && tmp.id.match(/^tmp-/)) {
          tmp.id = undefined;
        }
        return tmp;
      });

      const ListBankDetails = (dataInfo.ListBankDetails || []).map((item: any) => {
        const tmp = { ...item };
        if (tmp.id && typeof tmp.id === 'string' && tmp.id.match(/^tmp-/)) {
          tmp.id = undefined;
        }
        return tmp;
      });

      const tmp = {
        AccountType: dataInfo.AccountType,
        AccountName: dataInfo.AccountName,
        ReferenceCode: dataInfo.ReferenceCode,
        ListAddressDetails,
        ListContacts,
        ListBankDetails,
      };

      if (id) {
        this.callDispatch('updateData', { id, body: tmp }).then((res: any) => {
          router.push({ pathname: '/account-master/list' });
        });
      } else {
        this.callDispatch('createData', tmp).then((res: any) => {
          router.push({ pathname: '/account-master/list' });
        });
      }
    }
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

  render() {
    const { addInfo, loading, submiting } = this.props;

    const tabProps = {
      addInfo,
      changeValue: this.changeValue,
      changeTabs: this.changeTabs,
    };

    return (
      <Spin tip="Loading..." spinning={loading}>
        <h1 style={{ textAlign: 'center', fontWeight: 700, fontSize: '18px' }}>Account Master</h1>
        <Progress percent={Math.round(this.state.progressPercent)} />

        <Row style={{ marginTop: '5px' }} className="btn-move-right">
          <Button className="btn-green" loading={submiting} onClick={() => this.saveAll()}>
            <Icon type="cloud-upload" /> Finish
          </Button>
        </Row>

        <Row>
          <Tabs activeKey={this.state.activeTab} onChange={this.changeTabs}>
            <TabPane tab="General Details" key="1">
              <TabGeneralDetails {...tabProps} />
            </TabPane>

            <TabPane tab="Address Details" key="2">
              <TabAddressDetails {...tabProps} />
            </TabPane>

            <TabPane tab="Contact Details" key="3">
              <TabContactDetails {...tabProps} />
            </TabPane>

            <TabPane tab="Banking Details" key="4">
              <TabBankingDetails {...tabProps} />
            </TabPane>
          </Tabs>
        </Row>
      </Spin>
    );
  }
}

const WrappedStep2Form = Form.create({ name: 'register' })(AddShop);

export default (props: any) => <WrappedStep2Form {...props} />;
