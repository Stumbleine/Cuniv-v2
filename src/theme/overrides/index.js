import { merge } from 'lodash';
import Card from './Card';
import Paper from './Paper';
import Input from './Input';
import Tooltip from './Tooltip';
import Button from './Button';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
	return merge(
		Card(theme),
		Paper(theme),
		Input(theme),
		Tooltip(theme),
		Button(theme)
	);
}
