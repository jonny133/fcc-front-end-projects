var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var Display = function Display(props) {
    return React.createElement('div', { id: 'display' }, props.displayText);
};

var Button = function Button(props) {
    return (
        React.createElement('button', { id: props.id,
                onClick: function onClick(e) {return props.handleClick(props.repr, e);} },
            props.repr));

};var

Calculator = function (_React$Component) {_inherits(Calculator, _React$Component);
    function Calculator(props) {_classCallCheck(this, Calculator);var _this = _possibleConstructorReturn(this, (Calculator.__proto__ || Object.getPrototypeOf(Calculator)).call(this,
        props));

        _this.state = {
            displayText: '',
            pendingOperation: null,
            storedNum: null };


        _this.handleNumClick = _this.handleNumClick.bind(_this);
        _this.clearCalc = _this.clearCalc.bind(_this);
        _this.totalUp = _this.totalUp.bind(_this);
        _this.calculate = _this.calculate.bind(_this);return _this;

    }_createClass(Calculator, [{ key: 'clearCalc', value: function clearCalc()

        {
            this.setState(
            {
                displayText: '0',
                storedNum: null,
                pendingOperation: null });


        } }, { key: 'totalUp', value: function totalUp()

        {
            if (!!this.state.pendingOperation && !isNaN(Number(this.state.displayText) && this.state.storedNum)) {
                var result = this.state.pendingOperation ? this.state.pendingOperation(Number(this.state.displayText)) : this.state.storedNum; //will fail if display text not a number..

                this.setState({
                    displayText: result,
                    storedNum: result,
                    pendingOperation: null });

            }
        } }, { key: 'calculate', value: function calculate(

        operationType) {var _this2 = this;



            var rsltIsNaN = isNaN(Number(this.state.displayText));
            if (rsltIsNaN) {
                this.setState({
                    pendingOperation: null });

            } else
            {
                if (!isNaN(Number(this.state.displayText)) && !!this.state.pendingOperation) {
                    this.setState({ storedNum: this.state.pendingOperation ? this.state.pendingOperation(Number(this.state.displayText)) : this.state.storedNum });
                } else
                {
                    this.setState({ storedNum: Number(this.state.displayText) });
                }
            }

            switch (operationType) {
                case 'multiply':
                    this.setState({
                        pendingOperation: function pendingOperation(newNum) {return _this2.state.storedNum * newNum;},
                        displayText: '×' });

                    break;
                case 'divide':
                    this.setState({
                        pendingOperation: function pendingOperation(newNum) {return _this2.state.storedNum / newNum;},
                        displayText: '÷' });

                    break;
                case 'add':
                    this.setState({
                        pendingOperation: function pendingOperation(newNum) {return _this2.state.storedNum + newNum;},
                        displayText: '+' });

                    break;
                case 'subtract':
                    this.setState({
                        pendingOperation: function pendingOperation(newNum) {return _this2.state.storedNum - newNum;},
                        displayText: '−' });

                    break;}


        } }, { key: 'handleNumClick', value: function handleNumClick(


        repr, e) {/*bugged */
            if (isNaN(this.state.displayText)) {
                this.setState({ displayText: repr });
            } //catch NaNs
            else {
                    var newRepr = repr;
                    if (this.state.displayText.includes('.') && newRepr == '.') {
                        newRepr = ''; //prevent multiple decimal points
                    }
                    var newNum = (this.state.displayText + newRepr).replace(/^(0+)((?=\d))/, '$2'); //remove leading zeros
                    if (null) {
                        this.setState({
                            storedNum: this.state.pendingOperation ? this.state.pendingOperation(Number(this.state.displayText)) : this.state.storedNum, //TODO
                            pendingOperation: null,
                            displayText: newNum });
                    } else
                    {
                        this.setState({
                            displayText: newNum });

                    }
                }
        } }, { key: 'render', value: function render()

        {var _this3 = this;

            var operationButtons = [
            { id: 'equals', repr: '=', operation: this.totalUp },
            { id: 'subtract', repr: '−', operation: function operation() {_this3.calculate('subtract');} },
            { id: 'add', repr: '+', operation: function operation() {_this3.calculate('add');} },
            { id: 'multiply', repr: '×', operation: function operation() {_this3.calculate('multiply');} },
            { id: 'divide', repr: '÷', operation: function operation() {_this3.calculate('divide');} },
            { id: 'clear', repr: 'C', operation: this.clearCalc }];

            var numberButtons = [
            { id: 'decimal', repr: '.' },
            { id: 'zero', repr: '0' },
            { id: 'one', repr: '1' },
            { id: 'two', repr: '2' },
            { id: 'three', repr: '3' },
            { id: 'four', repr: '4' },
            { id: 'five', repr: '5' },
            { id: 'six', repr: '6' },
            { id: 'seven', repr: '7' },
            { id: 'eight', repr: '8' },
            { id: 'nine', repr: '9' }];


            return (
                React.createElement('div', null,
                    React.createElement('div', { id: 'debug-panel' },
                        Object.keys(this.state).map(function (x) {return React.createElement('p', null, x + ": " + _this3.state[x] + "\n");})),


                    React.createElement('div', { id: 'calculator' },
                        React.createElement(Display, { displayText: this.state.displayText }),

                        numberButtons.map(function (button) {return React.createElement(Button, { id: button.id, repr: button.repr, handleClick: _this3.handleNumClick });}),

                        operationButtons.map(function (button) {return React.createElement(Button, { id: button.id, repr: button.repr, handleClick: button.operation });}))));



        } }]);return Calculator;}(React.Component);


ReactDOM.render(React.createElement(Calculator, null), document.getElementById('root'));