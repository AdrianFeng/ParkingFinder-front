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
          progress: 0,
          start,
          end,
          stop: false
      };
  },

  componentDidMount() {
    this.updateProgress();
  },

  updateProgress() {
    const now = new Date();

    const progress = 1 - (this.state.end - now) / (this.state.end - this.state.start);
    if (progress >= 1 && !this.state.stop) {
      this.props.callback();
      if (this.props.isLoading) {
          const start = new Date();
          const end = new Date(start);
          end.setSeconds(end.getSeconds() + 15);
          this.setState({
              progress: 0,
              start,
              end,
              stop: false
          });
          return;
      }

      if (this.props.reload) {
          const start = new Date();
          const end = new Date(start);
          this.setState({ end, start, stop: false , progress: 0});
      }
      else {
          this.setState({ stop: true });
      }
    } else {
      this.setState({ progress: progress });
      this.requestAnimationFrame(() => this.updateProgress());
    }
  },

  getProgress() {
    return this.state.progress;
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
