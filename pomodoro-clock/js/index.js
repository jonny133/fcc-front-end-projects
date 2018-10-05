var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;} // import React, {Component} from 'react';
// import PropTypes from 'prop-types';
// import ReactDOM from 'react-dom';
// import {Component} from 'react';


var Controls = function Controls(_ref) {var
  breakLength = _ref.breakLength,
  sessionLength = _ref.sessionLength,
  decrementBreak = _ref.decrementBreak,
  decrementSession = _ref.decrementSession,
  incrementBreak = _ref.incrementBreak,
  incrementSession = _ref.incrementSession,
  resetClock = _ref.resetClock,
  startStop = _ref.startStop;return (

    React.createElement("div", { id: "control-container", className: "container" },
      React.createElement("div", { id: "break-controls", className: "control-set" },
        React.createElement("button", { type: "button", id: "break-decrement", onClick: decrementBreak }, "-"),


        React.createElement("span", { id: "break-label" }, "Break length"),
        React.createElement("span", { id: "break-length" }, breakLength),
        React.createElement("button", { type: "button", id: "break-increment", onClick: incrementBreak }, "+")),



      React.createElement("div", { id: "session-controls", className: "control-set" },
        React.createElement("button", { type: "button", id: "session-decrement", onClick: decrementSession }, "-"),


        React.createElement("span", { id: "session-label" }, "Session length"),
        React.createElement("span", { id: "session-length" }, sessionLength),
        React.createElement("button", { type: "button", id: "session-increment", onClick: incrementSession }, "+")),




      React.createElement("div", { id: "main-controls" },

        React.createElement("button", { type: "button", id: "start_stop", onClick: startStop }, "Start/Stop"),


        React.createElement("button", { type: "button", id: "reset", onClick: resetClock }, "reset"))));};






Controls.propTypes = {
  sessionLength: PropTypes.number,
  breakLength: PropTypes.number,
  decrementBreak: PropTypes.func.isRequired,
  decrementSession: PropTypes.func.isRequired,
  incrementBreak: PropTypes.func.isRequired,
  incrementSession: PropTypes.func.isRequired,
  resetClock: PropTypes.func.isRequired,
  startStop: PropTypes.func.isRequired };


Controls.defaultProps = {
  timeLeft: 25,
  sessionLength: 25,
  breakLength: 5 };


var Display = function Display(props) {var
  timeLeft = props.timeLeft,running = props.running,mode = props.mode,sessionNo = props.sessionNo;
  var minutes = Math.floor(timeLeft / 60);
  if (minutes.toString().length === 1) {
    minutes = "0" + minutes;
  }
  // swap next line to debug
  // let seconds = timeLeft % 60;
  var seconds = Math.ceil(timeLeft % 60);
  if (seconds.toString().length === 1) {
    seconds = "0" + seconds;
  }

  return (
    React.createElement("div", { id: "display", className: "container" },
      React.createElement("div", { id: "timer-label" },
        running && React.createElement("div", { className: "circle__green" }) ||
        React.createElement("div", { className: "circle__red" }),

        (mode || 'session').toUpperCase(), " " +
        Math.ceil(sessionNo / 2)),

      React.createElement("div", { id: "time-left" }, minutes + ":" + seconds)));



};

Display.propTypes = {
  timeLeft: PropTypes.number.isRequired,
  running: PropTypes.bool.isRequired
  // sessionNo: PropTypes.number.isRequired,
  // mode: PropTypes.any.isRequired,
};var

App = function (_React$Component) {_inherits(App, _React$Component);
  function App(props) {_classCallCheck(this, App);var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this,
    props));

    _this.state = {
      sessionNo: 1,
      breakLength: 5,
      sessionLength: 25,
      timeLeft: 25 * 60,
      running: false,
      mode: false,
      intervalStart: null,
      intervalID: null };


    _this.resetClock = _this.resetClock.bind(_this);
    _this.decrementBreak = _this.decrementBreak.bind(_this);
    _this.decrementSession = _this.decrementSession.bind(_this);
    _this.incrementBreak = _this.incrementBreak.bind(_this);
    _this.incrementSession = _this.incrementSession.bind(_this);
    _this.startStop = _this.startStop.bind(_this);
    _this.update = _this.update.bind(_this);return _this;
  }_createClass(App, [{ key: "decrementBreak", value: function decrementBreak()

    {
      this.setState(function (prevState) {return {
          breakLength: Math.max(1, prevState.breakLength - 1) };});

    } }, { key: "incrementBreak", value: function incrementBreak()

    {
      this.setState(function (prevState) {return {
          breakLength: Math.min(60, prevState.breakLength + 1) };});

    } }, { key: "decrementSession", value: function decrementSession()

    {
      this.setState(function (prevState) {return {
          sessionLength: Math.max(1, prevState.sessionLength - 1) };});

    } }, { key: "incrementSession", value: function incrementSession()

    {
      this.setState(function (prevState) {return {
          sessionLength: Math.min(60, prevState.sessionLength + 1) };});

    } }, { key: "resetClock", value: function resetClock()

    {
      // Stop & rewind any beep audio to start
      var beep = document.getElementById('beep');
      beep.pause();
      beep.currentTime = 0;var

      intervalID = this.state.intervalID;
      clearInterval(intervalID);

      // reset parameters
      this.setState({
        breakLength: 5,
        sessionLength: 25,
        running: false,
        timeLeft: 25 * 60,
        intervalStart: null,
        intervalID: null,
        mode: false,
        sessionNo: 1 });

    } }, { key: "startStop", value: function startStop()

    {var _this2 = this;var _state =






      this.state,running = _state.running,intervalID = _state.intervalID,mode = _state.mode,sessionLength = _state.sessionLength,breakLength = _state.breakLength;

      // START

      if (!running) {
        var newStateObj = {
          intervalStart: Date.now(),
          running: true,
          intervalID: setInterval(this.update, 1000) };


        // start a new session if not running and not a previously paused mode (i.e. reset or just initialised)
        if (!mode) {
          this.setState(_extends({
            mode: 'session',
            timeLeft: sessionLength * 60 },
          newStateObj));

        } else {
          // this.toggleSessionBreak();

          this.setState(_extends({},

          newStateObj));

        }
      }

      // STOP
      else {
          this.intervalID = clearInterval(intervalID);

          this.setState(function (prevProps) {return {
              timeLeft:
              prevProps.timeLeft - (Date.now() - prevProps.intervalStart) / 1000,
              intervalStart: null,
              running: false,
              intervalID: _this2.intervalID };});

        }

      return null;
    } }, { key: "toggleSessionBreak", value: function toggleSessionBreak()

    {var _this3 = this;var
      intervalID = this.state.intervalID;
      this.intervalID = clearInterval(intervalID);
      this.setState(function (prevState) {return {
          timeLeft: {
            session: prevState.breakLength * 60,
            break: prevState.sessionLength * 60,
            false: 25 * 60 }[
          prevState.mode],
          mode: { session: 'break', break: 'session', false: false }[
          prevState.mode],

          running: true,
          intervalStart: Date.now(),
          intervalID: setInterval(_this3.update, 1000),
          sessionNo: prevState.sessionNo + 1 };});

    } }, { key: "update", value: function update()

    {var _this4 = this;var refreshInterval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      // IMPLEMENT IF TIMER 00:00, reset and increment session number
      var _state2 =
      this.state,timeLeft = _state2.timeLeft,intervalID = _state2.intervalID;
      if (timeLeft - refreshInterval < refreshInterval) {
        this.intervalID = clearInterval(intervalID);
        setTimeout(function () {
          _this4.setState({
            running: false,
            timeLeft: 0 });

          setTimeout(function () {return _this4.toggleSessionBreak();}, 100);
          var beep = document.getElementById('beep');
          beep.play();
        }, timeLeft);
      } else {
        this.setState(function (prevProps) {return {
            intervalStart: Date.now(),
            timeLeft: prevProps.timeLeft - refreshInterval };});

      }
    } }, { key: "render", value: function render()

    {var _state3 =







      this.state,timeLeft = _state3.timeLeft,breakLength = _state3.breakLength,sessionLength = _state3.sessionLength,running = _state3.running,sessionNo = _state3.sessionNo,mode = _state3.mode;

      return (
        React.createElement("div", null,
          React.createElement(Display, {
            timeLeft: timeLeft,
            running: running,
            sessionNo: sessionNo,
            mode: mode }),

          React.createElement(Controls, {
            breakLength: breakLength,
            sessionLength: sessionLength,
            timeLeft: timeLeft,
            resetClock: this.resetClock,
            decrementBreak: this.decrementBreak,
            incrementBreak: this.incrementBreak,
            decrementSession: this.decrementSession,
            incrementSession: this.incrementSession,
            startStop: this.startStop }),



          React.createElement("audio", { id: "beep", preload: "auto", src: "http://soundbible.com/grab.php?id=2197&type=mp3" })));














    } }]);return App;}(React.Component);


ReactDOM.render(React.createElement(App, null), document.getElementById('root'));