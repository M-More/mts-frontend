import React from "react";
import {Table, Button, Input} from "antd";
import {actions} from "../../../redux/actions";
import {connect} from "react-redux";
import './Origin.scss';
import AutofitWrap from "../../common/AutofitWrap/AutofitWrap";

class Origin extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '站点',
        key: 'name',
      },
      {
        title: '选项',
        key: 'age',
        render: (text, record, index) => (
          <Button type="primary" danger>删除</Button>
        ),
        width: 100,
      },
    ];
    this.state = {
      data: [],
    };
  };

  componentDidMount() {
    this.setState({
      data: [
        'https://ant.design/components/table-cn/',
        'https://ant.design/components/table-cn/',
        'https://ant.design/components/table-cn/',
        'https://ant.design/components/table-cn/',
        'https://ant.design/components/table-cn/',
        'https://ant.design/components/table-cn/',
        'https://ant.design/components/table-cn/',
        'https://ant.design/components/table-cn/',
        'https://ant.design/components/table-cn/',
        'https://ant.design/components/table-cn/',
        'https://ant.design/components/table-cn/',
        'https://ant.design/components/table-cn/',
        'https://ant.design/components/table-cn/',
        'https://ant.design/components/table-cn/',
        'https://ant.design/components/table-cn/',
        'https://ant.design/components/table-cn/',
        'https://ant.design/components/table-cn/',
        'https://ant.design/components/table-cn/',
        'https://ant.design/components/table-cn/',
      ],
    });
  }

  render() {
    const { data } = this.state;
    const { columns } = this;
    const { curProgramme } = this.props;
    return (
      <AutofitWrap
        minHeight={550}
        padding={200}
        className="origin-wrap"
      >
        <div className="origin-form">
          <div className="origin-new">
            <Input />
            <Button type="primary">添加站点</Button>
          </div>
          <Table
            className="origin-table"
            columns={this.columns}
            dataSource={data}
            pagination={false}
            size="small"
          />
        </div>
      </AutofitWrap>
    );
  }
}

const mapStateToProps = (state) => ({
  curProgramme: state.curProgramme,
});
const mapDispatchToProps = {
  onProgrammeChange: actions.onProgrammeChange,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Origin);