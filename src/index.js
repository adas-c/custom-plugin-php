import "./index.scss";
import {
	TextControl,
	Flex,
	FlexBlock,
	FlexItem,
	Button,
	Icon,
	PanelBody,
	PanelRow,
	ColorPicker,
} from "@wordpress/components";
import {
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	useBlockProps,
} from "@wordpress/block-editor";

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
		bgColor: { type: "string", default: "#ebebeb" },
		theAlignment: { type: "string", default: "left" },
	},
	example: {
		attributes: {
			question: "What your name?",
			answers: ["Adam", "Krzyś", "Kacper", "Mateusz"],
			correctAnswer: 1,
			theAlignment: "center",
			bgColor: "#c4c4c4",
		},
	},
	edit: EditComponent,
	save: (props) => {
		return null;
	},
});

function EditComponent(props) {
	const blockProps = useBlockProps({
		className: "uni-block-react",
		style: { backgroundColor: props.attributes.bgColor },
	});

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
		<div {...blockProps}>
			<BlockControls>
				<AlignmentToolbar
					value={props.attributes.theAlignment}
					onChange={(e) => props.setAttributes({ theAlignment: e })}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title="Background Color" initialOpen={true}>
					<PanelRow>
						<ColorPicker
							color={props.attributes.bgColor}
							onChangeComplete={(e) => props.setAttributes({ bgColor: e.hex })}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
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
