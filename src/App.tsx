import { useState, useEffect, useCallback } from "react";
import { TimerDisplay } from "./components/TimerDisplay";
import { TimerSet } from "./components/TimerSet";

function App() {
	const [pomodoroLength, setPomodoroLength] = useState(25);
	const [breakLength, setBreakLength] = useState(5);
	const [isRunning, setIsRunning] = useState(false);
	const [mode, setMode] = useState("Session"); // 'Session' or 'Break'
	const [time, setTime] = useState(pomodoroLength * 60);

	const stopAlarm = () => {
		const sound = document.getElementById("beep") as HTMLAudioElement;
		sound.pause();
		sound.currentTime = 0;
	};
	const playAlarm = () => {
		const sound = document.getElementById("beep") as HTMLAudioElement;
		sound.play();
	};

	const toggleTimer = () => {
		stopAlarm();
		setIsRunning((prevIsRunning) => !prevIsRunning);
	};

	const resetTimer = () => {
		stopAlarm();
		setIsRunning(false);
		setMode("Session");
		setPomodoroLength(25);
		setBreakLength(5);
		setTime(pomodoroLength * 60);
	};

	const nextSession = useCallback(() => {
		if (mode === "Session") {
			setMode("Break");
			setTime(breakLength * 60);
		} else {
			setMode("Session");
			setTime(pomodoroLength * 60);
		}
	}, [mode, pomodoroLength, breakLength]);

	useEffect(() => {
		let timerInterval = 0;
		if (isRunning) {
			timerInterval = setInterval(() => {
				if (time > 0) {
					setTime((prevTime) => prevTime - 1);
				} else {
					nextSession();
				}
			}, 1000);
		}
		return () => clearInterval(timerInterval);
	}, [isRunning, time, nextSession]);

	useEffect(() => {
		if (time === 0) {
			playAlarm();
		}
	}, [time]);

	useEffect(() => {
		setIsRunning(false);
		if (mode === "Session") {
			setTime(pomodoroLength * 60);
		} else {
			setTime(breakLength * 60);
		}
	}, [pomodoroLength, breakLength, mode]);

	return (
		<div
			className={
				isRunning && time <= 30
					? "app__container pomodoro--warning"
					: isRunning
					? "app__container pomodoro--light"
					: "app__container"
			}
		>
			<div className="app">
				<h1>Pomodoro Timer</h1>
				<TimerDisplay title={mode} time={time} />
				<div className="btn-container">
					<button id="start_stop" className="pomodoro__btn" onClick={toggleTimer}>
						<span className="front">{isRunning ? "Pause" : "Start"} </span>
					</button>
					<button id="nextSession" className="pomodoro__btn" onClick={nextSession}>
						<span className="front"> Next </span>
					</button>
					<button id="reset" className="pomodoro__btn" onClick={resetTimer}>
						<span className="front"> Reset </span>
					</button>
				</div>
				<div className="timer-set-container">
					<TimerSet title="Session" type="session" length={pomodoroLength} setLength={setPomodoroLength} />
					<TimerSet title="Break" type="break" length={breakLength} setLength={setBreakLength} />
				</div>
				<audio
					id="beep"
					preload="auto"
					src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
				></audio>
			</div>
		</div>
	);
}

export default App;
