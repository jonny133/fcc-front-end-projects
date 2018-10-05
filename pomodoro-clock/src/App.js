import React from 'react';
import PropTypes from 'prop-types';
// import logo from './logo.svg';
// import './App.css';

const Controls = ({
  breakLength,
  sessionLength,
  decrementBreak,
  decrementSession,
  incrementBreak,
  incrementSession,
  resetClock,
  startStop,
}) => (
  <div id="control-container" className="container">
    <div id="break-controls" className="control-set">
      <button type="button" id="break-decrement" onClick={decrementBreak}>
        -
      </button>
      <span id="break-label">Break length</span>
      <span id="break-length">{breakLength}</span>
      <button type="button" id="break-increment" onClick={incrementBreak}>
        +
      </button>
    </div>
    <div id="session-controls" className="control-set">
      <button type="button" id="session-decrement" onClick={decrementSession}>
        -
      </button>
      <span id="session-label">Session length</span>
      <span id="session-length">{sessionLength}</span>
      <button type="button" id="session-increment" onClick={incrementSession}>
        +
      </button>
    </div>

    <div id="main-controls">
      {/* <div id="time-left">{`${minutes}:${seconds}`}</div> */}
      <button type="button" id="start_stop" onClick={startStop}>
        Start/Stop
      </button>
      <button type="button" id="reset" onClick={resetClock}>
        reset
      </button>
    </div>
  </div>
);

Controls.propTypes = {
  sessionLength: PropTypes.number,
  breakLength: PropTypes.number,
  decrementBreak: PropTypes.func.isRequired,
  decrementSession: PropTypes.func.isRequired,
  incrementBreak: PropTypes.func.isRequired,
  incrementSession: PropTypes.func.isRequired,
  resetClock: PropTypes.func.isRequired,
  startStop: PropTypes.func.isRequired,
};

Controls.defaultProps = {
  timeLeft: 25,
  sessionLength: 25,
  breakLength: 5,
};

const Display = props => {
  const { timeLeft, running, mode, sessionNo } = props;
  let minutes = Math.floor(timeLeft / 60);
  if (minutes.toString().length === 1) {
    minutes = `0${minutes}`;
  }
  // swap next line to debug
  // let seconds = timeLeft % 60;
  let seconds = Math.ceil(timeLeft % 60);
  if (seconds.toString().length === 1) {
    seconds = `0${seconds}`;
  }

  return (
    <div id="display" className="container">
      <div id="timer-label">
        {(running && <div className="circle__green" />) || (
          <div className="circle__red" />
        )}
        {(mode || 'session').toUpperCase()}
        {` ${Math.ceil(sessionNo / 2)}`}
      </div>
      <div id="time-left">{`${minutes}:${seconds}`}</div>
      {/* <p>Running:</p> */}
    </div>
  );
};

Display.propTypes = {
  timeLeft: PropTypes.number.isRequired,
  running: PropTypes.bool.isRequired,
  // sessionNo: PropTypes.number.isRequired,
  // mode: PropTypes.any.isRequired,
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionNo: 1,
      breakLength: 5,
      sessionLength: 25,
      timeLeft: 25 * 60,
      running: false,
      mode: false,
      intervalStart: null,
      intervalID: null,
    };

    this.resetClock = this.resetClock.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.incrementBreak = this.incrementBreak.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.startStop = this.startStop.bind(this);
    this.update = this.update.bind(this);
  }

  decrementBreak() {
    this.setState(prevState => ({
      breakLength: Math.max(1, prevState.breakLength - 1),
    }));
  }

  incrementBreak() {
    this.setState(prevState => ({
      breakLength: Math.min(60, prevState.breakLength + 1),
    }));
  }

  decrementSession() {
    this.setState(prevState => ({
      sessionLength: Math.max(1, prevState.sessionLength - 1),
    }));
  }

  incrementSession() {
    this.setState(prevState => ({
      sessionLength: Math.min(60, prevState.sessionLength + 1),
    }));
  }

  resetClock() {
    // Stop & rewind any beep audio to start
    const beep = document.getElementById('beep');
    beep.pause();
    beep.currentTime = 0;

    const { intervalID } = this.state;
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
      sessionNo: 1,
    });
  }

  startStop() {
    const {
      running,
      intervalID,
      mode,
      sessionLength,
      breakLength,
    } = this.state;

    // START

    if (!running) {
      const newStateObj = {
        intervalStart: Date.now(),
        running: true,
        intervalID: setInterval(this.update, 1000),
      };

      // start a new session if not running and not a previously paused mode (i.e. reset or just initialised)
      if (!mode) {
        this.setState({
          mode: 'session',
          timeLeft: sessionLength * 60,
          ...newStateObj,
        });
      } else {
        // this.toggleSessionBreak();

        this.setState({
          // timeLeft: sessionLength * 60,
          ...newStateObj,
        });
      }
    }

    // STOP
    else {
      this.intervalID = clearInterval(intervalID);

      this.setState(prevProps => ({
        timeLeft:
          prevProps.timeLeft - (Date.now() - prevProps.intervalStart) / 1000,
        intervalStart: null,
        running: false,
        intervalID: this.intervalID,
      }));
    }

    return null;
  }

  toggleSessionBreak() {
    const { intervalID } = this.state;
    this.intervalID = clearInterval(intervalID);
    this.setState(prevState => ({
      timeLeft: {
        session: prevState.breakLength * 60,
        break: prevState.sessionLength * 60,
        false: 25 * 60,
      }[prevState.mode],
      mode: { session: 'break', break: 'session', false: false }[
        prevState.mode
      ],
      running: true,
      intervalStart: Date.now(),
      intervalID: setInterval(this.update, 1000),
      sessionNo: prevState.sessionNo + 1,
    }));
  }

  update(refreshInterval = 1) {
    // IMPLEMENT IF TIMER 00:00, reset and increment session number

    const { timeLeft, intervalID } = this.state;
    if (timeLeft - refreshInterval < refreshInterval) {
      this.intervalID = clearInterval(intervalID);
      setTimeout(() => {
        this.setState({
          running: false,
          timeLeft: 0,
        });
        setTimeout(() => this.toggleSessionBreak(), 50);
        const beep = document.getElementById('beep');
        beep.play();
      }, timeLeft);
    } else {
      this.setState(prevProps => ({
        intervalStart: Date.now(),
        timeLeft: prevProps.timeLeft - refreshInterval,
      }));
    }
  }

  render() {
    const {
      timeLeft,
      breakLength,
      sessionLength,
      running,
      sessionNo,
      mode,
    } = this.state;

    return (
      <div>
        <Display
          timeLeft={timeLeft}
          running={running}
          sessionNo={sessionNo}
          mode={mode}
        />
        <Controls
          breakLength={breakLength}
          sessionLength={sessionLength}
          timeLeft={timeLeft}
          resetClock={this.resetClock}
          decrementBreak={this.decrementBreak}
          incrementBreak={this.incrementBreak}
          decrementSession={this.decrementSession}
          incrementSession={this.incrementSession}
          startStop={this.startStop}
        />

        {
          // Audio from http://soundbible.com/2197-Analog-Watch-Alarm.html;
          // License: Attribution 3.0
          // Recorded by Daniel Simion
        }
        <audio
          id="beep"
          preload="auto"
          src="http://soundbible.com/grab.php?id=2197&type=mp3"
        >
          <track default kind="subtitles" srcLang="en" src="./#" />
          Beep
        </audio>

        {/* <div className="debug-panel">
          {Object.keys(this.state).map(x => (
            <p>{`${x} : ${this.state[x]} \n`}</p>
          ))}
        </div> */}
      </div>
    );
  }
}

export default App;
