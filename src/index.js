wp.blocks.registerBlockType("ourplugin/uni-block-react", {
	title: "Uni Block React",
	icon: "smiley",
	category: "common",
	attributes: {
		sky: { type: "string" },
	},
	edit: (props) => {
		return (
			<>
				<input
					type="text"
					placeholder="sky color"
					value={props.attributes.sky}
					onChange={(e) => props.setAttributes({ sky: e.target.value })}
				/>
			</>
		);
	},
	save: (props) => {
		return null;
	},
});
