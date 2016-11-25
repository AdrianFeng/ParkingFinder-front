'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  ProgressViewIOS,
  StyleSheet,
  View,
} = ReactNative;
var TimerMixin = require('react-timer-mixin');

var ProgressBar = React.createClass({
  mixins: [TimerMixin],

  getInitialState() {
    return {
      progress: 0,
    };
  },

  componentDidMount() {
    this.updateProgress();
  },

  updateProgress() {
    console.log(this.state.progress % Math.PI);
    if(this.state.progress % Math.PI >= (Math.PI /2)) {
      this.setState({ progress: 0 });
      this.props.callback();
    } else {
      this.setState({ progress: this.state.progress + 0.1 });
    }
    this.requestAnimationFrame(() => this.updateProgress());
  },

  getProgress() {
    return Math.sin(this.state.progress % Math.PI);
  },

  render() {
    return (
        <ProgressViewIOS style={this.props.style} progress={this.getProgress()}/>
    );
  },
});


var styles = StyleSheet.create({
  progressView: {
    marginTop: 20,
  }
});
export default ProgressBar;
