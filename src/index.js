import "./index.scss";
import {
	TextControl,
	Flex,
	FlexBlock,
	FlexItem,
	Button,
	Icon,
} from "@wordpress/components";

(function () {
	let locked = false;

	wp.data.subscribe(function () {
		const results = wp.data
			.select("core/block-editor")
			.getBlocks()
			.filter((block) => {
				return (
					block.name == "ourplugin/uni-block-react" &&
					block.attributes.correctAnswer == undefined
				);
			});

		if (results.length && locked == false) {
			locked = true;
			wp.data.dispatch("core/editor").lockPostSaving("noanswer");
		}

		if (!results.length && locked) {
			locked = false;
			wp.data.dispatch("core/editor").unlockPostSaving("noanswer");
		}
	});
})();

wp.blocks.registerBlockType("ourplugin/uni-block-react", {
	title: "Uni Block React",
	icon: "smiley",
	category: "common",
	attributes: {
		question: { type: "string" },
		answers: { type: "array", default: [""] },
		correctAnswer: { type: "number", default: undefined },
	},
	edit: EditComponent,
	save: (props) => {
		return null;
	},
});

function EditComponent(props) {
	function deleteAnswer(index) {
		const newAnswer = props.attributes.answers.filter(
			(_, itemIndex) => index != itemIndex
		);
		props.setAttributes({ answers: newAnswer });

		if (props == props.attributes.correctAnswer) {
			props.setAttributes({ correctAnswer: undefined });
		}
	}

	function markAsCorrect(index) {
		props.setAttributes({ correctAnswer: index });
	}

	return (
		<div className="uni-block-react">
			<TextControl
				label="Question: "
				value={props.attributes.question}
				onChange={(value) => props.setAttributes({ question: value })}
			/>
			<p>Answers:</p>
			{props.attributes.answers.map((answer, index) => {
				return (
					<Flex>
						<FlexBlock>
							<TextControl
								value={answer}
								onChange={(value) => {
									const newAnswer = props.attributes.answers.concat([]);
									newAnswer[index] = value;
									props.setAttributes({ answers: newAnswer });
								}}
							/>
						</FlexBlock>
						<FlexItem>
							<Button onClick={() => markAsCorrect(index)}>
								<Icon
									className="mark-as-correct"
									icon={
										props.attributes.correctAnswer == index
											? "star-filled"
											: "star-empty"
									}
								/>
							</Button>
						</FlexItem>
						<FlexItem>
							<Button
								className="attention-delete"
								onClick={() => deleteAnswer(index)}
							>
								Delete
							</Button>
						</FlexItem>
					</Flex>
				);
			})}
			<Button
				isPrimary
				onClick={() => {
					props.setAttributes({
						answers: props.attributes.answers.concat([""]),
					});
				}}
			>
				Add another answer
			</Button>
		</div>
	);
}
