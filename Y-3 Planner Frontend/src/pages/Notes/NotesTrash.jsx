import React, { useContext, useEffect } from "react";
import Empty from "../../components/Empty/Empty";
import GlobalContext from "../../context/GlobalContext";
import { Masonry, MasonryBox } from "../../layout/Masonry/Masonry";
import { nullTrash } from "../../utils/images";
import { notesNavLinks } from "../../utils/navigation";
import Note from "./Note";
import "./notes.css";

export default function NotesTrash() {

	const { setSideBarLinks, getAllNotes, notes } = useContext(GlobalContext);

	useEffect(() => {
		setSideBarLinks(notesNavLinks);
		window.scrollTo(0, 0);
		getAllNotes();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setSideBarLinks]);

	return (
		<main className="notes">
			<section className="notes-body">
				{notes.some( n => n.trashed) ? (
					<Masonry>
						{notes.map(
							(note, index) =>
								note.trashed && (
									<MasonryBox key={index}>
										<Note {...note} />
									</MasonryBox>
								)
						)}
					</Masonry>
				) : (
					<Empty
						img={nullTrash}
						text={
							<>
								<h3
									style={{
										fontSize: "3rem",
										lineHeight: "4rem",
										margin: "0 0 1rem 0",
									}}
								>
									Bin is Empty
								</h3>
								<span
									style={{
										fontSize: "2rem",
										lineHeight: "3rem",
									}}
								>
									Items in bin will be deleted forever after
									30 days
								</span>
							</>
						}
					/>
				)}
			</section>
		</main>
	);
};

