import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Simple editor component that takes placeholder text as a prop
export default class Editor extends React.Component<any, any> {
  /*
   * Quill modules to attach to editor
   * See https://quilljs.com/docs/modules/ for complete options
   */
  static modules = {
    toolbar: [[{ header: '1' }, { header: '2' }, { font: [] }]],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  static formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ];

  onChange = (value: any) => {
    const { handleChange } = this.props;
    if (handleChange) handleChange(value);
  };

  // handleThemeChange(newTheme: any) {
  //   if (newTheme === 'core') newTheme = null;
  //   this.setState({ theme: newTheme });
  // }

  render() {
    return (
      <div>
        <ReactQuill
          theme="snow"
          onChange={this.onChange}
          value={this.props.value || ''}
          modules={Editor.modules}
          formats={Editor.formats}
          // bounds={'.app'}
          placeholder={this.props.placeholder}
          className="input-bottom"
        />
      </div>
    );
  }
}
