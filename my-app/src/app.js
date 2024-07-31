import styles from './app.module.css';
import data from './data.json';
import { useState } from 'react';

export const App = () => {
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);
	let isFirstStep = true;

	const handleClickForward = () => {
		if (activeIndex < 6) setActiveIndex((prev) => prev + 1);
		if (activeIndex === 6) handleClickFirst();
	};
	const handleClickBack = () => {
		if (activeIndex > 0) setActiveIndex((prev) => prev - 1);
	};
	const handleClickFirst = () => {
		setActiveIndex(0);
	};

	if (activeIndex === 0) {
		isFirstStep = true;
	} else {
		isFirstStep = false;
	}

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map(({ id, title }, index) => {
							return (
								<li
									className={
										styles['steps-item'] +
										(activeIndex === index
											? ' ' + styles.active
											: activeIndex > index
												? ' ' + styles.done
												: '')
									}
									key={id}
								>
									<button
										className={styles['steps-item-button']}
										onClick={() => setActiveIndex(index)}
									>
										{parseInt(id)}
									</button>
									{title}
								</li>
							);
						})}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={handleClickBack}
							disabled={isFirstStep}
						>
							Назад
						</button>
						<button className={styles.button} onClick={handleClickForward}>
							{activeIndex === 6 ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
