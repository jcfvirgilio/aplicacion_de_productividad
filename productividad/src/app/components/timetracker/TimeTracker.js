import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
// const TimeTracker = () => {

//   const TimeTracker = (props) => {
//     _classCallCheck(this, TimeTracker);

//     var _this = _possibleConstructorReturn(this, (TimeTracker.__proto__ || Object.getPrototypeOf(TimeTracker)).call(this, props));

//     _this.start = 0;
//     _this.end = 0;
//     _this.total = 0;
//     _this.onPause = _this.onPause.bind(_this);
//     _this.onResume = _this.onResume.bind(_this);
//     return _this;
//   }

//   _createClass(TimeTracker, [{
//     key: 'componentWillReceiveProps',
//     value: function componentWillReceiveProps(nextProps) {
//       if (this.props.pause != nextProps.pause) {
//         console.log('nextProps.pause', nextProps.pause);
//         if (nextProps.pause === true) {
//           this.onPause();
//         } else if (nextProps.pause === false) {
//           this.onResume();
//         }
//       }
//     }
//   }, {
//     key: 'componentWillMount',
//     value: function componentWillMount() {
//       this.start = this.getCurrentTime();
//       // console.warn(`[TimeTracker] starting time - `, this.start);
//       // add event listeners
//       document.addEventListener("pause", this.onPause, false);
//       document.addEventListener("resume", this.onResume, false);
//     }
//   }, {
//     key: 'render',
//     value: function render() {
//       return null;
//     }
//   }, {
//     key: 'componentWillUnmount',
//     value: function componentWillUnmount() {
//       // remove event listeners
//       document.removeEventListener("pause", this.onPause, false);
//       document.removeEventListener("resume", this.onResume, false);
//       this.end = this.getCurrentTime();
//       // console.warn(`[TimeTracker] end time - `, this.end);
//       this.calculateDiff();
//       if (this.props.onSave) {
//         this.props.onSave(this.total);
//       }
//     }
//   }, {
//     key: 'onPause',
//     value: function onPause() {
//       this.end = this.getCurrentTime();
//       // console.warn(`[TimeTracker] pausing time - `, this.end);
//       this.calculateDiff();
//       // console.warn(`[TimeTracker] pausing time TOTAL - `, this.total);
//     }
//   }, {
//     key: 'onResume',
//     value: function onResume() {
//       this.start = this.getCurrentTime();
//       // console.warn(`[TimeTracker] resuming time - `, this.start);
//     }
//   }, {
//     key: 'calculateDiff',
//     value: function calculateDiff() {
//       this.total += this.end - this.start;
//       // console.warn(`[TimeTracker] total time - `, this.total);
//     }
//   }, {
//     key: 'getCurrentTime',
//     value: function getCurrentTime() {
//       if (typeof performance !== 'undefined') {
//         return performance.now();
//       }
//       return Date.now();
//     }
//   }]);

//   return TimeTracker;
// }(_react2.default.Component);



const TimeTracker = ({ config, onChange }) => {

  let startTime = config.startTime
  let start = moment().add(startTime, 's')

  return (
    <label >
      <Moment date={start} format="hh:mm:ss" durationFromNow interval={1000} onChange={onChange} />
    </label>
  );

};

export default TimeTracker;