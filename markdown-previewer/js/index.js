var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var initialMD = "# Markdown heading\n\n## This is a sub-heading.\n### and a sub-sub-heading\n  \nText styles: **bold** and _italic_.\nwhich can be  **_combined!_**\nand strikeout is ~~sorta~~ cool.\n\nHere is a [link](https://www.freecodecamp.com), and\n> a block quote.\n\nInline code looks like: `<div></div>`, input between 2 backticks.\n\n```\n// multi-line code:\n\nfunction exampleFunction(a, b) {\n  return (a**2 + b);\n}\n```\n  \n\nOther fun things include tables:\n\nheader 1 | header 2 | header 3\n------------ | ------------- | ------------- \n1 | 2 | 3\nI | II | III\n\n- Unordered lists\n  - bulleted\n     - with different indentation levels\n        - and one more.\n\n\n1. Numbered lists are easy\n1. List continues even using '1'\n2. etc. etc.\n- dashes or asterisks too\n* Here is an embedded image for fun\n\n![Doggy](https://bit.ly/2KyZYun)\n\ninline html: \n\n<small>some small text</small>\n";

















































marked.setOptions({
  gfm: true,
  breaks: true });


var renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return "<a target=\"_blank\" href=\"" + href + "\">" + text + '</a>';
};var

App = function (_React$Component) {_inherits(App, _React$Component);
  function App(props) {_classCallCheck(this, App);var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this,
    props));
    _this.state = {
      content: initialMD };

    _this.handleChange = _this.handleChange.bind(_this);return _this;
  }_createClass(App, [{ key: "handleChange", value: function handleChange(

    event) {
      this.setState({
        content: event.target.value });

    } }, { key: "render", value: function render()

    {
      return (
        React.createElement("div", { id: "overall" },
          React.createElement("div", { id: "header" },
            React.createElement("h1", null, "Markdown Previewer"),
            React.createElement("small", null, React.createElement("em", null, "Using React and marked.js"))),

          React.createElement("div", { "class": "container" },
            React.createElement("div", { id: "editor-pane" },
              React.createElement(Editor, { onChange: this.handleChange, content: this.state.content })),


            React.createElement("div", { id: "preview-pane" },
              React.createElement(Viewer, { content: this.state.content })))));




    } }]);return App;}(React.Component);


var Editor = function Editor(props) {
  return (
    React.createElement("textarea", { id: "editor", value: props.content, onChange: props.onChange, type: "text" }));

};

var Viewer = function Viewer(props) {
  return (
    React.createElement("div", { id: "preview", dangerouslySetInnerHTML: { __html: marked(props.content, { renderer: renderer }) } }));

};

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));