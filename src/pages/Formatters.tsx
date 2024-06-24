import Placeholder from '@tiptap/extension-placeholder';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor } from '@mantine/tiptap';
import { Container, Title } from '@mantine/core';

const makeEditor = () => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Placeholder.configure({ placeholder: 'Paste here' }),
		],
		content: '',
	});
	return editor;
};

const Formatters = () => {
	return (
		<Container>
			<Title>File Formatters</Title>
			<RichTextEditor editor={makeEditor()}>
				<RichTextEditor.Toolbar
					sticky
					stickyOffset={60}
				></RichTextEditor.Toolbar>
				<RichTextEditor.Content />
			</RichTextEditor>
		</Container>
	);
};

export default Formatters;
