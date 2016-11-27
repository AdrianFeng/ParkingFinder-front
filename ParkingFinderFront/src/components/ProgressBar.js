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
      const start = new Date();
      const end = new Date(start);
      end.setSeconds(end.getSeconds() + 15);
      return {
          progress: -1,
          start,
          end,
          stop: false
      };
  },

  componentDidMount() {
    this.updateProgress();
  },

  updateProgress() {

    if (this.props.isLoading || this.state.progress >= 1) {
      if (this.state.progress != -1) {
          this.props.callback();
          this.setState({
              progress: -1,
          });
      }
      else {
          this.setState({});
      }
    } else {
        const now = new Date();
      if (this.state.progress == -1) {
          const start = new Date();
          const end = new Date(start);
          end.setSeconds(end.getSeconds() + 15);
          this.setState({
              progress: 0,
              start,
              end
          })
      }
      else {
          const progress = 1 - (this.state.end - now) / (this.state.end - this.state.start);
          this.setState({
              progress,
          })

      }
    }
    this.requestAnimationFrame(() => this.updateProgress());
  },

  getProgress() {
    return this.state.progress < 0? 0: this.state.progress;
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
