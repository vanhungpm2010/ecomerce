import { Button, Spin, Form, Row, Col, Input, Checkbox, Upload, Icon, Cascader } from 'antd';

import React, { Component } from 'react';
import Editor from './const.define';

import { connect } from 'dva';
import './index.less';
import styles from './style.less';

import 'antd/dist/antd.css';

import { getToken } from '@/utils/authority';
import { formItemLayout } from '@/common/constants/formItemLayout';
import { namespace } from '../model';
import { errorMsg, successMsg } from '@/common/services/highline.corner';
import { formatLang, UploadedFolderType, BASE_URL } from '@/common/constants/const.define';

const FormItem = Form.Item;
const { TextArea } = Input;

function removeUnicode(str: any) {
  // remove accents
  const from = 'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñç';
  const to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouunc';
  let tmpStr;
  for (let i = 0, l = from.length; i < l; i++) {
    tmpStr = str.replace(new RegExp(from[i], 'gi'), to[i]);
  }
  const slug = tmpStr
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-');

  return slug;
}

function flow12(data1: any, cateList: any) {
  let tmpData = data1;
  data1.map((item: any) => {
    let final = {};
    cateList.map((i: any) => {
      const trans = {
        id: i.id,
        CategoryName: i.CategoryTranslation.CategoryName,
        ParentId: i.ParentId,
        Level: i.Level,
      };
      if (item.id === i.ParentId && item.id !== i.id) {
        if (final.children) {
          final.children.push(trans);
        } else {
          final = { children: [{ ...trans }] };
        }
      }
      return final;
    });
    let transData1;

    if (item.CategoryTranslation) {
      transData1 = {
        id: item.id,
        CategoryName: item.CategoryTranslation.CategoryName,
        ParentId: item.ParentId,
        Level: item.Level,
      };
    } else {
      transData1 = {
        id: item.id,
        CategoryName: item.CategoryName,
        ParentId: item.ParentId,
        Level: item.Level,
      };
    }

    // if (Object.getOwnPropertyNames(final).length !== 0) {
    //   if()
    //   tmpData.push({ ...transData1, ...final });
    //   console.log('level', tmpData)
    // }

    if (final.children) {
      if (final.children[0].Level !== 4) {
        const x = flow12(final.children, cateList);
        tmpData = tmpData.filter((a: any) => a.id != item.id);
        tmpData.push({ ...transData1, children: [...x] });
      }
    } else {
      tmpData = tmpData.filter((a: any) => a.id != item.id);
      tmpData.push({ ...transData1 });
    }
    return tmpData;
  });
  return tmpData;
}
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
  return tmpState;
};
@connect(mapStateToProps)
class AddCategory extends Component<any, any> {
  state = {
    id: '',
    loading: false,
    imageUrl: '',
    errorUpload: false,
    contentVi: '',
    contentEn: '',
    cateList: [],
    dataFlow: [],
    ParentId: 0,
    Level: 1,
  };

  componentDidMount() {
    const { dispatch, form } = this.props;
    const { id } = this.props.location.query;
    this.fetch();

    if (id) {
      dispatch({
        type: `${namespace}/readData`,
        payload: { id },
      }).then((res: any) => {
        if (res) {
          const { MultiLangs } = res;
          // en
          const {
            CategoryName: CategoryNameEng,
            Content: contentEn,
            Description: DescriptionEng,
            Title: TitleEng,
            Slug: slugEng,
          } = MultiLangs[0] || '';
          // vi
          const { CategoryName, Content: contentVi, Description, Title, Slug: slugVi } =
            MultiLangs[1] || '';

          form.setFieldsValue({
            CategoryName,
            Description,
            Title,
            IsActive: res.IsActive,
            slugVi,
            // En
            CategoryNameEng,
            DescriptionEng,
            TitleEng,
            slugEng,
            contentEn,
          });
          this.setState({
            contentVi,
            contentEn,
            imageUrl: res.Image,
            ParentId: res.ParentId,
            Level: res.Level,
          });
        }
      });
    }
  }
  componentWillReceiveProps({ tableItems }: any) {
    const { cateList: oldState } = this.state;
    if (tableItems !== oldState) {
      const listParenNone = this.tableItems(tableItems);
      const dataFlow = flow12(listParenNone, tableItems);
      this.setState({ dataFlow, cateList: tableItems });
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
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { form, dispatch, addInfo } = this.props;
    const { contentVi, contentEn, ParentId, Level } = this.state;
    const { id } = this.props.location.query;

    form.validateFields({ force: true }, (err: any, values: any) => {
      if (!err) {
        if (!addInfo.Image) {
          this.setState({ errorUpload: true });
          return;
        }
        const VietNameLanguages = {
          CategoryName: values.CategoryName,
          Description: values.Description,
          Title: values.Title,
          Slug: values.slugVi,
          Content: contentVi,
        };

        const EnglishLanguages = {
          CategoryName: values.CategoryNameEng,
          Description: values.DescriptionEng,
          Title: values.TitleEng,
          Slug: values.slugEng,
          Content: contentEn,
        };

        const another = { ...values.IsActive, ParentId, Level };
        const data = { ...addInfo, ...another, VietNameLanguages, EnglishLanguages };

        dispatch({
          type: id ? `${namespace}/updateData` : `${namespace}/createData`,
          payload: { ...data },
        });
      }
    });
  };

  onChangeTitleVi = (e: any) => {
    const { form } = this.props;
    const slugVi = removeUnicode(e.target.value);
    form.setFieldsValue({ slugVi });
  };
  onChangeTitleEng = (e: any) => {
    const { form } = this.props;
    const slugEng = removeUnicode(e.target.value);
    form.setFieldsValue({ slugEng });
  };

  handleChangeEditorVi = (contentVi: any) => this.setState({ contentVi });
  handleChangeEditorEng = (contentEn: any) => this.setState({ contentEn });

  renderCategoryName = (cateName: string) => {
    const { form } = this.props;
    return form.getFieldDecorator(cateName, {
      rules: [
        {
          required: true,
          message: 'Please enter your CategoryName!',
        },
      ],
    })(
      <Input
        size="large"
        placeholder={
          cateName == 'CategoryName'
            ? formatLang('component.categoryVi.input')
            : formatLang('component.categoryEng.input')
        }
        className="input-bottom"
      />,
    );
  };

  renderTitle = () => {
    const { form } = this.props;
    return form.getFieldDecorator('Title', {
      rules: [
        {
          required: true,
          message: 'Please enter your Title!',
        },
      ],
    })(
      <Input
        size="large"
        placeholder={formatLang('component.titleVi.input')}
        onChange={this.onChangeTitleVi}
      />,
    );
  };

  renderEngTitle = () => {
    const { form } = this.props;
    const { id } = this.props.location.query;

    return form.getFieldDecorator('TitleEng', {
      rules: [
        {
          required: !id,
          message: 'Please enter your Title in english!',
        },
      ],
    })(
      <Input
        size="large"
        placeholder={formatLang('component.titleEng.input')}
        className="input-bottom"
        onChange={this.onChangeTitleEng}
      />,
    );
  };

  renderIsActive = () => {
    const { form } = this.props;
    return form.getFieldDecorator('IsActive', {
      valuePropName: 'checked',
      rules: [
        {
          required: false,
        },
      ],
    })(<Checkbox />);
  };

  renderDescription = (descName: string) => {
    const { form } = this.props;
    return form.getFieldDecorator(descName, {
      rules: [
        {
          required: false,
        },
      ],
    })(
      <TextArea
        rows={4}
        placeholder={
          descName == 'Description'
            ? formatLang('component.descriptionVi.input')
            : formatLang('component.descriptionEng.input')
        }
        className="input-bottom"
      />,
    );
  };

  renderSlug = (name: string) => {
    const { form } = this.props;
    return form.getFieldDecorator(name, {
      rules: [
        {
          required: false,
        },
      ],
    })(
      <Input
        size="large"
        placeholder={formatLang('component.titleVi.input')}
        className="input-bottom"
      />,
    );
  };
  handleCancel = () => this.setState({ previewVisible: false });
  updateModel = (payload: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'updateModel',
      payload,
    });
  };
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
  onChangeCascader = (e: any) => {
    this.setState({
      ParentId: e[e.length - 1],
      Level: e.length + 1,
    });
  };

  render() {
    const { submitting, loading, addInfo } = this.props;
    const { errorUpload, contentVi, contentEn, dataFlow } = this.state;
    const { id } = this.props.location.query;
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
    };
    return (
      <Spin spinning={loading !== undefined && loading} tip="Loading...">
        <div className={styles.main}>
          <h2>
            {id
              ? formatLang('component.submit-update.button')
              : formatLang('component.submit-add.button')}
          </h2>
          <Form {...formItemLayout} onSubmit={this.handleSubmit} className="setting-boder">
            <FormItem label={formatLang('component.category.label')}>
              {this.renderCategoryName('CategoryName')}
            </FormItem>
            <FormItem label="In English">{this.renderCategoryName('CategoryNameEng')}</FormItem>
            <FormItem label={formatLang('component.parentName.label')}>
              <Cascader
                options={...dataFlow}
                placeholder="Please select"
                changeOnSelect
                filedNames={{ value: 'id', label: 'CategoryName', children: 'children' }}
                onChange={this.onChangeCascader}
                defaultValue={['3']}
              />
            </FormItem>
            <FormItem label={formatLang('component.title.label')}>{this.renderTitle()}</FormItem>
            <FormItem label="In English">{this.renderEngTitle()}</FormItem>
            <Form.Item label="Slug">
              {this.renderSlug('slugVi')}
              {this.renderSlug('slugEng')}
            </Form.Item>
            <Form.Item label={formatLang('component.isActive.label')} style={{ textAlign: 'left' }}>
              {this.renderIsActive()}
            </Form.Item>
            <FormItem label={formatLang('component.description.label')}>
              {this.renderDescription('Description')}
              {this.renderDescription('DescriptionEng')}
            </FormItem>
            <FormItem label={formatLang('component.content.label')}>
              <Editor
                style={{ minHeight: '10em' }}
                value={contentVi}
                handleChange={this.handleChangeEditorVi}
                placeholder="Viết gì đó...."
                className="input-bottom"
              />

              <Editor
                style={{ minHeight: '10em' }}
                value={contentEn}
                handleChange={this.handleChangeEditorEng}
                placeholder="Write something..."
              />
            </FormItem>
            <Row>
              <Col xs={24} sm={6} md={12} lg={6} xl={6}>
                <p style={{ textAlign: 'left', color: '#000' }}>
                  {formatLang('component.image.label')}
                </p>
              </Col>
              <Col xs={24} sm={18} md={12} lg={6} xl={18}>
                <Upload
                  name="filePost"
                  listType="picture-card"
                  className="avatar-uploader"
                  {...uploadProps}
                >
                  {addInfo.Image ? (
                    <img src={addInfo.Image} alt="avatar" style={{ width: '100%' }} />
                  ) : (
                    uploadButton
                  )}
                </Upload>
                {errorUpload ? (
                  <p style={{ color: 'red', textAlign: 'left' }}>Pls, upload your image</p>
                ) : (
                  ''
                )}
              </Col>
            </Row>
            <FormItem label=" ">
              <Button
                size="large"
                loading={submitting}
                className={styles.submit}
                type="primary"
                htmlType="submit"
              >
                {id
                  ? formatLang('component.submit-update.button')
                  : formatLang('component.submit-add.button')}
              </Button>
            </FormItem>
          </Form>
        </div>
      </Spin>
    );
  }
}

export default Form.create()(AddCategory);
