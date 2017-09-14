"use strict";
import { View, Modal, Dimensions } from "react-native";
import React, { Component } from "react";
import Panel from "./Panel";

const { height, width } = Dimensions.get("window");
const modalHeight = height / 2;
const titleHeight = 30;
const itemHeight = (modalHeight - titleHeight) / 7;

export default class Cascade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data || [],
      value: props.value || [0, 0, 0],
      cols: props.cols || 3,
      okText: props.okText || "取消",
      dismissText: props.dismissText || "确定",
      title: props.title || ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.setState({
        value: nextProps.value || this.state.value
      });
    }
  }

  changeValue(row, column) {
    let array = this.state.value;
    if (row == 0) {
      array = [0, 0, 0];
      this.refs.panel.refs["item-" + row].refs.scrollview.scrollTo({
        x: 0,
        y: column * itemHeight
      });
      this.refs.panel.refs["item-" + (row + 1)] &&
        this.refs.panel.refs["item-" + (row + 1)].refs.scrollview.scrollTo({
          x: 0,
          y: 0
        });
      this.refs.panel.refs["item-" + (row + 2)] &&
        this.refs.panel.refs["item-" + (row + 2)].refs.scrollview.scrollTo({
          x: 0,
          y: 0
        });
    } else if (row == 1) {
      if (this.state.value.length == 3) {
        array[row + 1] = 0;
      }
      this.refs.panel.refs["item-" + row].refs.scrollview.scrollTo({
        x: 0,
        y: column * itemHeight
      });
      this.refs.panel.refs["item-" + (row + 1)] &&
        this.refs.panel.refs["item-" + (row + 1)].refs.scrollview.scrollTo({
          x: 0,
          y: 0
        });
    } else if (row == 2) {
      this.refs.panel.refs["item-" + row].refs.scrollview.scrollTo({
        x: 0,
        y: column * itemHeight
      });
    }
    array[row] = column;
    this.valueList = array;
    this.setState({ value: this.valueList });
    this.props.onChange(array);
    this.props.onSelectChange(row, column);
  }

  onOk(e) {
    this.props.onOk && this.props.onOk(e, this.state.value);
  }

  onDismiss(e) {
    this.props.onDismiss && this.props.onDismiss(e);
  }

  render() {
    return (
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => {
          console.log();
        }}
      >
        <Panel
          ref="panel"
          data={this.state.data}
          cols={this.state.cols}
          value={this.state.value}
          okText={this.state.okText}
          title={this.state.title}
          dismissText={this.state.dismissText}
          onOk={e => this.onOk(e)}
          onDismiss={e => this.onDismiss(e)}
          modalHeight={modalHeight}
          titleHeight={titleHeight}
          itemHeight={itemHeight}
          changeValue={(row, column) => this.changeValue(row, column)}
        />
      </Modal>
    );
  }
}
