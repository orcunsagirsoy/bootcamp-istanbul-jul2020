
import "antd/dist/antd.css";
import {  Row} from "antd"
import { Skeleton, Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import React from "react"

const { Meta } = Card;

class App extends React.Component {
  state = {
    loading: true,
  };

  onChange = checked => {
    this.setState({ loading: !checked });
  };

  render() {
    const { loading } = this.state;

    return (
      <>
        <Row>
            <Card style={{ width: 300, marginTop: 16 }} loading={loading}>
            <Meta
                avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title="Card title"
                description="This is the description"
            />
            </Card>
            <Card style={{ width: 300, marginTop: 16 }} loading={loading}>
            <Meta
                avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title="Card title"
                description="This is the description"
            />
            </Card>
        </Row>
        <Row>
            <Card style={{ width: 300, marginTop: 16 }} loading={loading}>
                <Meta
                    avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title="Card title"
                    description="This is the description"
                />
            </Card>
            <Card
            style={{ width: 300, marginTop: 16 }}
            actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
            ]}
            >
            <Skeleton loading={loading} avatar active>
                <Meta
                avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title="Card title"
                description="This is the description"
                />
            </Skeleton>
            </Card>
        </Row>
      </>
    );
  }
}

export default App