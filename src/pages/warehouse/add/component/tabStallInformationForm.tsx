import React from 'react';
import { Form, Row, Col, Input, Select, Checkbox, Icon, Upload, Button } from 'antd';
import { errorMsg, successMsg } from '@/common/services/highline.corner';
import { namespace } from '../../model';
import { getToken } from '@/utils/authority';
import { formatLang, UploadedFolderType, BASE_URL } from '@/common/constants/const.define';

const { TextArea } = Input;
const { Option } = Select;

class TabStallInformation extends React.Component<any,any> {
    state = {
        loading: false,
    }
    updateModel = (payload: any) => {
        const { dispatch } = this.props;
        dispatch({
          type: 'updateModel',
          payload,
        });
    }
    handleChange = (info: any) => {
        const { addInfo } = this.props;
    
        if (info.file.status === 'done') {
          addInfo['Image'] = info.file.response.data.fileName;
          this.updateModel({ addInfo });
          successMsg({ msg: `uploaded successfully: ${info.file.name} file` });
        } else if (info.file.status === 'error') {
          errorMsg({ msg: `upload failed: ${info.file.name} file` });
        }
    };

    beforeUpload = (file: any) => {
        const { dispatch } = this.props;
    
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          errorMsg({ msg: 'You can only upload JPG/PNG file!' });
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          errorMsg({ msg: 'Image must smaller than 2MB!' });
        } else {
          dispatch({
            type: `${namespace}/uploadFile`,
            payload: file,
          });
        }
        return isJpgOrPng && isLt2M;
      };
    render(){
        const { form, addInfo, submitting } = this.props;
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
        const Authorization = getToken();
        const uploadProps = {
            name: 'filePost',
            action: `${BASE_URL}/upload/single`,
            headers: {
                Authorization,
            },
            data: { folderType: UploadedFolderType.Category },
            onChange: this.handleChange,
            showUploadList: false,
            beforeUpload: this.beforeUpload,
    }   ;

        return(
        <Form>
            <Row gutter={24}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label="Hình ảnh">
                        {form.getFieldDecorator('Image', {
                            rules: [
                                {
                                    required: false,
                                },
                            ],
                        })(<Upload
                                name="filePost"
                                listType="picture-card"
                                className="avatar-uploader"
                                {...uploadProps}
                            >
                                {uploadButton}
                            </Upload>
                        )}
                    </Form.Item>
                 </Col>
                 <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label="Họ tên chủ cửa hàng">
                        {form.getFieldDecorator('UserName', {
                            rules: [
                                {
                                    required: false,
                                },
                            ],
                        })(<Input size="large" disabled/>)}
                    </Form.Item>
                    <Form.Item label="Số điện thoại">
                        {form.getFieldDecorator('PhoneNumber', {
                            rules: [
                                {
                                    required: false,
                                },
                            ],
                        })(<Input size="large" placeholder="012346"/>)}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label="Loại cửa hàng">
                        {form.getFieldDecorator('Type', {
                            initialValue: 1,
                            rules: [
                                {
                                    required: false,
                                },
                            ],
                        })(<Select  style={{width: '100%'}}>
                                <Option value={1}>Cửa hàng bán lẻ</Option>
                                <Option value={2}>Nhà xuất bản(Có thương hiệu độc quyền)</Option>
                                <Option value={3}>Phân phối</Option>
                        </Select>)}
                    </Form.Item>
                    <Form.Item label="Wed liên kết">
                        {form.getFieldDecorator('WebURL', {
                            rules: [
                                {
                                    required: false,
                                },
                            ],
                        })(<Input size="large" placeholder="lazada/nhiii"/>)}
                    </Form.Item>
                    <Form.Item label="Xuất hoá đơn">
                        {form.getFieldDecorator('Bill', {
                            rules: [
                                {
                                    required: false,
                                },
                            ],
                        })(<Checkbox />)}
                    </Form.Item>
                    <Form.Item label="Mô tả gian hàng">
                        {form.getFieldDecorator('Description', {
                            rules: [
                                {
                                    required: false,
                                },
                            ],
                        })(<TextArea rows={4} placeholder="Có nhiều loại sản phẩm"/>)}
                    </Form.Item>          
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label="Địa chỉ email">
                        {form.getFieldDecorator('Email', {
                            rules: [
                                {
                                    required: false,
                                },
                            ],
                        })(<Input size="large" placeholder="example@gmail.com"/>)}
                    </Form.Item>
                    <Form.Item label="URL">
                        {form.getFieldDecorator('URL', {
                            rules: [
                                {
                                    required: false,
                                },
                            ],
                        })(<Input size="large" placeholder="goldtime/cua-hang/hannah-ciir"/>)}
                    </Form.Item>
                    <Form.Item label="Số loại hàng hóa">
                        {form.getFieldDecorator('TypeCommodities', {
                            rules: [
                                {
                                    required: false,
                                },
                            ],
                        })(<Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="select one country"
                            defaultValue={['1']}
                            optionLabelProp="label"
                          >
                            <Option value="1" label="Mẹ & bé">Mẹ & bé</Option>
                            <Option value="2" label="Thời trang nam, nữ">Thời trang nam, nữ)</Option>
                            <Option value="3" label="Điện thoại">Điện thoại</Option>
                            <Option value="4" label="Đồ gia dụng">Đồ gia dụng</Option>
                          </Select>)}
                    </Form.Item>
                </Col>
            </Row>
            <Button
                size="large"
                loading={submitting}
                type="primary"
                htmlType="submit"
              >
                {formatLang('component.submit-add.button')}
            </Button>
        </Form>
        )
    }
}
export const TabStallInformationForm = Form.create({
    name: 'tab-stall-information'
})(TabStallInformation);
