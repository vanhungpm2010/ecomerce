import React from 'react';
import { Row, Col, Button, Table, Form, Icon, Select, Input, Checkbox } from 'antd';
// import { columns } from './const.define';
// import { TabAddressDetailForm as TmpTabAddressDetailForm } from './TabAddressDetailForm';
import { warningMsg } from '@/common/services/highline.corner';
import { pattern } from '@/common/constants/const.define';

const { Option } = Select;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;
const { number } = pattern;

const dataWarranty = [
  'No Warranty',
  'Bằng Phiếu bảo hành và Hóa đơn',
  'Bằng Thẻ bảo hành và Hóa đơn',
  'Bằng Tem bảo hành',
  'Bằng hộp sản phẩm hoặc Số seri',
  'Bằng Hóa đơn mua hàng',
  'Bảo hành Toàn cầu',
  'Bảo hành bởi Nhà sản xuất trong nước',
  'Bảo hành bởi nhà cung cấp trong nước',
];
const dataDateWarranty = [
  '1 tháng',
  '2 tháng',
  '3 tháng',
  '5 tháng',
  '6 tháng',
  '7 tháng',
  '8 tháng',
  '9 tháng',
  '10 tháng',
  '11 tháng',
  '12 tháng',
  '14 tháng',
  '16 tháng',
  '2 năm',
  '3 năm',
  'Bảo hành trọn đời',
];
const plainOptions = ['Liquid', 'None', 'Pin', 'Chất dễ cháy'];

class TabBasicInformation extends React.Component<any, any> {
  state: any = {
    data: [],
    editingItem: {},
    isEditing: false,
    mass: '',
  };

  componentDidMount() {
    const { addInfo } = this.props;

    if (addInfo && addInfo.AddressDetails && addInfo.AddressDetails.length > 0) {
      this.setState({ data: addInfo.AddressDetails });
    }
  }

  addToList = (data: any) => {
    const tmp: any = { ...this.state };
    const tmpData = { ...data };

    if (!tmp.data) {
      tmp.data = [];
    }

    if (!tmpData.id) {
      const tmpId = new Date().getTime();
      tmpData.id = `tmp-${tmpId}`;
      tmp.data.push(tmpData);
    } else {
      tmp.data = tmp.data.map((item: any) => {
        if (item.id == tmpData.id) {
          return tmpData;
        }

        return item;
      });
    }

    this.setState({ data: tmp.data }, () => {
      // this.saveData(tmp.data);
    });
    this.setState({ editingItem: {} });
  };

  saveData = (listData: any) => {
    const { changeTabs } = this.props;

    const tmp = [];
    for (let i = 0; i < listData.length; i++) {
      const item = listData[i];

      if (item.id && typeof item.id === 'string' && item.id.match(/^tmp-/)) {
        item.id = undefined;
      }

      tmp.push(item);
    }

    changeTabs('2', { ListAddressDetails: tmp });
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { form } = this.props;

    form.validateFields({ force: true }, (err: any, values: any) => {
      console.log('values', values);
    });
  };
  onChangeValue = (value: any) => {};
  onChangeNumber = (e: any) => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!Number.isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.setState({ mass: value });
    }
  };
  renderTypeWarranty = () => {
    const { form } = this.props;
    return form.getFieldDecorator('type', {
      rules: [
        {
          required: false,
        },
      ],
    })(
      <Select>
        {dataWarranty.map((item: string, index: number) => {
          return (
            <Option key={index} value={item}>
              {item}
            </Option>
          );
        })}
      </Select>,
    );
  };
  renderTimeWarranty = () => {
    const { form } = this.props;
    return form.getFieldDecorator('time', {
      rules: [
        {
          required: false,
        },
      ],
    })(
      <Select>
        {dataDateWarranty.map((item: string, index: number) => {
          return (
            <Option key={index} value={index}>
              {item}
            </Option>
          );
        })}
      </Select>,
    );
  };
  renderRulesWarranty = () => {
    const { form } = this.props;
    return form.getFieldDecorator('rules', {
      rules: [
        {
          required: false,
        },
      ],
    })(<TextArea rows={4} onChange={this.onChangeValue} />);
  };
  renderDanger = () => {
    const { form } = this.props;
    return form.getFieldDecorator('danger', {
      rules: [
        {
          required: false,
        },
      ],
    })(
      <CheckboxGroup
        options={plainOptions}
        value={this.state.checkedList}
        // onChange={this.onChange}
      />,
    );
  };
  renderMass = () => {
    const { form } = this.props;
    return form.getFieldDecorator('mass', {
      rules: [
        {
          required: false,
        },
      ],
    })(
      <Input
        // value={this.state.mass}
        onChange={this.onChangeNumber}
        placeholder="Input a number"
        maxLength={10}
      />,
    );
  };
  renderSize = () => {
    const { form } = this.props;
    return form.getFieldDecorator('size', {
      rules: [
        {
          required: false,
        },
      ],
    })(
      <div>
        <Input
          name="dai"
          onChange={this.onChangeNumber}
          placeholder="Input a number"
          maxLength={10}
        />
        <Input
          name="rong"
          onChange={this.onChangeNumber}
          placeholder="Input a number"
          maxLength={10}
        />
        <Input
          name="cao"
          // value={this.state.mass}
          onChange={this.onChangeNumber}
          placeholder="Input a number"
          maxLength={10}
        />
      </div>,
    );
  };
  render() {
    const { changeTabs, currentTabNum: tmpCurrentTabNum } = this.props;
    const currentTabNum = tmpCurrentTabNum || '2';
    const { data } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="Loại bảo hành:">{this.renderTypeWarranty()}</Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="Thời gian bảo hành:">{this.renderTimeWarranty()}</Form.Item>
          </Col>
        </Row>
        <Row>
          <Form.Item label="Chính sách bảo hành:">{this.renderRulesWarranty()}</Form.Item>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="Chất liệu nguy hiểm:">{this.renderDanger()}</Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="Khối lượng gói hàng(kg):">{this.renderMass()}</Form.Item>
          </Col>
          {/* <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="Kích thước(cm):">
              {this.renderSize()}
            </Form.Item>
          </Col> */}
        </Row>
        <Row>
          <Col span={24} className="btn-move-right">
            <Button
              type="default"
              onClick={() =>
                changeTabs(String(Number(currentTabNum) - 1), { ListAddressDetails: data })
              }
            >
              <Icon type="left" /> Back
            </Button>
            <Button htmlType="submit" type="primary">
              <Icon type="save" /> Save & Next
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export const TabBasicInformationForm = Form.create({ name: 'form-info' })(TabBasicInformation);
