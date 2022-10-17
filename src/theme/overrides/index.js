import { merge } from 'lodash';
import Card from './Card';
import Input from './Input';
import Tooltip from './Tooltip';
import Button from './Button';

// ----------------------------------------------------------------------
/**
 * Combina y exporta los componentes personalizados
 * @function ComponentsOverrides
 * @exports ComponentsOverrides
 */
export default function ComponentsOverrides(theme) {
	return merge(Card(theme), Input(theme), Tooltip(theme), Button(theme));
}
