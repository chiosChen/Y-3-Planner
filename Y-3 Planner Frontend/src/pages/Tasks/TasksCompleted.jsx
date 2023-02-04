import React, { useContext, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";
import { Masonry, MasonryBox } from "../../layout/Masonry/Masonry";
import { tasksNavLinks } from "../../utils/navigation";
import Task from "./Task";
import "./tasks.css";
import Empty from "../../components/Empty/Empty";
import "./tasks.css";
import { nullTasks } from "../../utils/images";

export default function TasksCompleted() {
	const { setSideBarLinks, getAllTasks, tasks } = useContext(GlobalContext);

	useEffect(() => {
		setSideBarLinks(tasksNavLinks);
		window.scrollTo(0, 0);
		getAllTasks();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setSideBarLinks]);

	return (
		<main className="tasks">
			{tasks?.length > 0 && tasks.some( e => e.done) ? (
				<>
					<section className="tasks-head">
						<span>Completed Tasks</span>
					</section>
					<section className="tasks-body">
						<div className="tasks-body-section">
							<span className="tasks-body-section__head">
								These are your achievements
							</span>
							<div className="tasks-body-section__body">
								<Masonry lg={4} md={3} sm={2}>
									{tasks.map(
										(task, index) =>
											task.done &&
											!task.trashed && (
												<MasonryBox key={index}>
													<Task {...task} />
												</MasonryBox>
											)
									)}
								</Masonry>
							</div>
						</div>
					</section>
				</>
			) : (
				<Empty img={nullTasks} text="Never too late to start" />
			)}
		</main>
	);
};

