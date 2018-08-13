var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;} /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           import React, { Component} from 'react';
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           import ReactDOM from 'react'; 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           */

var SOUNDS = [
{ id: "Kick",
  src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
  letter: 'Q',
  keyCode: 81 },

{ id: "Closed Hi-hat",
  src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
  letter: 'W',
  keyCode: 87 },

{ id: "Shaker",
  src: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3',
  letter: 'E',
  keyCode: 69 },

{ id: "Open Hi-hat",
  src: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3',
  letter: 'A',
  keyCode: 65 },

{ id: "Closed Hi-hat",
  src: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3',
  letter: 'S',
  keyCode: 83 },

{ id: "Side-stick",
  src: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3',
  letter: 'D',
  keyCode: 68 },

{ id: "Punchy Kick",
  src: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3',
  letter: 'Z',
  keyCode: 90 },

{ id: "Snare",
  src: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3',
  letter: 'X',
  keyCode: 88 },

{ id: "Kick & Hat",
  src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
  letter: 'C',
  keyCode: 67 }];


var Display = function Display(props) {
  return React.createElement('div', { id: 'display' }, props.displayText);
};var

Pad = function (_React$Component) {_inherits(Pad, _React$Component);
  function Pad(props) {_classCallCheck(this, Pad);var _this = _possibleConstructorReturn(this, (Pad.__proto__ || Object.getPrototypeOf(Pad)).call(this,
    props));

    _this.playSound = _this.playSound.bind(_this);
    _this.activatePad = _this.activatePad.bind(_this);
    _this.handleKeyPress = _this.handleKeyPress.bind(_this);return _this;
  }_createClass(Pad, [{ key: 'handleKeyPress', value: function handleKeyPress(

    e) {
      if (e.keyCode === this.props.keyCode) {
        this.activatePad(e);
      }
    } }, { key: 'activatePad', value: function activatePad(

    e) {
      //set display text
      this.props.setDisplayText(this.props.id);
      //play sound
      this.playSound(e);
    } }, { key: 'playSound', value: function playSound(

    e) {
      var sound = document.getElementById(this.props.letter);
      sound.currentTime = 0;
      sound.play();
    } }, { key: 'componentDidMount', value: function componentDidMount()

    {
      document.addEventListener('keydown', this.handleKeyPress);
    } }, { key: 'componentWillUnmount', value: function componentWillUnmount()
    {
      document.removeEventListener('keydown', this.handleKeyPress);
    } }, { key: 'render', value: function render()

    {

      var button =
      React.createElement('button', { className: 'drum-pad', id: this.props.id, onClick: this.activatePad },
        React.createElement('audio', { src: this.props.src, className: 'clip', id: this.props.letter }, this.props.id),
        this.props.letter);

      return button;
    } }]);return Pad;}(React.Component);var


Pads = function (_React$Component2) {_inherits(Pads, _React$Component2);

  function Pads(props) {_classCallCheck(this, Pads);return _possibleConstructorReturn(this, (Pads.__proto__ || Object.getPrototypeOf(Pads)).call(this,
    props));
    //this.handleKeyPress = this.handleKeyPress.bind(this);
    //this.handleClick = this.handleClick.bind(this);
  }_createClass(Pads, [{ key: 'render', value: function render()

    {var _this3 = this;
      var soundBank = this.props.soundBank;
      var buttons = soundBank.map(function (sound)
      {return React.createElement(Pad, { id: sound.id, src: sound.src, letter: sound.letter, keyCode: sound.keyCode, setDisplayText: _this3.props.setDisplayText });});

      return React.createElement('div', { id: 'buttons' }, buttons);
    } }]);return Pads;}(React.Component);var



App = function (_React$Component3) {_inherits(App, _React$Component3);
  function App(props) {_classCallCheck(this, App);var _this4 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this,
    props));
    _this4.state = {
      displayText: '' };

    _this4.setDisplayText = _this4.setDisplayText.bind(_this4);return _this4;
  }_createClass(App, [{ key: 'setDisplayText', value: function setDisplayText(

    text) {
      this.setState(
      { displayText: text });

    } }, { key: 'render', value: function render()

    {
      return (
        React.createElement('div', { className: 'container' },
          React.createElement('h1', null, 'Drum Machine'),
          React.createElement(Display, { displayText: this.state.displayText }),
          React.createElement(Pads, { soundBank: SOUNDS, setDisplayText: this.setDisplayText })));


    } }]);return App;}(React.Component);


ReactDOM.render(React.createElement(App, null), document.getElementById('drum-machine'));