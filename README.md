## 介绍
使用react native scrollView封装，在一组预设数据中进行选择，e.g. 省市区选择。
## 安装
```
npm install react-native-cascade-select
```
## API
属性|说明|类型|默认值
---|---|---|---
data | 数据源| Array<{name:string, sub: Array<{name:string, sub: Array}>}>|[]
value | 值, 格式是[value1, value2, value3], 对应数据源的相应级层value| Array|[0,0,0]
visible|是否显示面板|Boolean|false
cols | 列数	| number|3
onChange | 选中后的回调| (val:Array): void|无
onSelectChange | 每列数据选择变化后的回调函数| (row, column): void|无
okText | 确认文本| String|确定
dismissText | 取消文本| String|取消
onOk | 点击确认时执行的回调| (e, value): void|无
onDismiss | 点击取消时执行的回调| (e): void|无
title | 大标题| String|无
## 效果
![image](http://27.155.122.191:8080/uploads/gif/20170914/1505386397982.gif)
## 用法
```
import { AppRegistry, View, Button } from "react-native";
import React, { Component } from "react";
import Cascade from "react-native-cascade-select";

import city from "./city.json";
const cols = 3;

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value: [0, 0, 0]
    };
  }

  onChange(val) {
    console.log("array-------->", val);
  }

  onSelectChange(row, column) {
    console.log("第几列-------->", row);
    console.log("第几行-------->", column);
  }

  onOk(e, value) {
    this.setState({ visible: false, value: value });
    console.log("ok-------->", e);
  }

  onDismiss(e) {
    this.setState({ visible: false });
    console.log("dismiss-------->", e);
  }

  render() {
    return (
      <View>
        <Button
          onPress={() => this.setState({ visible: !this.state.visible })}
          title="点我"
        />
        <Cascade
          visible={this.state.visible}
          data={city}
          cols={cols}
          okText="确认"
          dismissText="取消"
          title="选择地区"
          value={this.state.value}
          onChange={val => this.onChange(val)}
          onSelectChange={(row, column) => this.onSelectChange(row, column)}
          onOk={(e, value) => this.onOk(e, value)}
          onDismiss={e => this.onDismiss(e)}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent("Test", () => Index);



```