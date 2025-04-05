type TimerSetProps = {
	title: string;
	type: string;
	length: number;
	setLength: React.Dispatch<React.SetStateAction<number>>;
};

function TimerSet({ title, type, length, setLength }: TimerSetProps) {
	const increaseTime = () => {
		if (length < 60) {
			setLength((value) => value + 1);
		}
	};

	const decreaseTime = () => {
		if (length >= 2) {
			setLength((value) => value - 1);
		}
	};

	return (
		<div className="timer-set">
			<div className="timer-set__display">
				<p id={type + "-label"}>{title}</p>
				<p id={type + "-length"} className="timer-set__timer">
					{length}
				</p>
			</div>
			<div className="timer-set__btn-container">
				<button id={type + "-increment"} className="pomodoro__btn" onClick={increaseTime}>
					<span className="front">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="10"
							height="10"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
							className="lucide lucide-arrow-up-icon lucide-arrow-up"
						>
							<path d="m5 12 7-7 7 7" />
							<path d="M12 19V5" />
						</svg>
					</span>
				</button>
				<button id={type + "-decrement"} className="pomodoro__btn" onClick={decreaseTime}>
					<span className="front">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="10"
							height="10"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
							className="lucide lucide-arrow-down-icon lucide-arrow-down"
						>
							<path d="M12 5v14" />
							<path d="m19 12-7 7-7-7" />
						</svg>
					</span>
				</button>
			</div>
		</div>
	);
}

export { TimerSet };
