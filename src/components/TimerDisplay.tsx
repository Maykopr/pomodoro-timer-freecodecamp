type TimerDisplayProps = {
	title: string;
	time: number;
};
function TimerDisplay({ title, time }: TimerDisplayProps) {
	time = Math.abs(time || 0);
	const formatTime = () => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
		const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
		return `${displayMinutes}:${displaySeconds}`;
	};

	return (
		<div className="display">
			<div id="timer-label">{title}</div>
			<div id="time-left" className={time <= 30 ? "display__timer display__timer--alert" : "display__timer"}>
				{formatTime()}
			</div>
		</div>
	);
}

export { TimerDisplay };
