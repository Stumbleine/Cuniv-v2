import { AppRegistration } from '@mui/icons-material';
import {
	Box,
	Button,
	Chip,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	MenuItem,
	OutlinedInput,
	Select,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { green } from '@mui/material/colors';
import API from '../../conection';
import CheckFrequency from '../forms/CheckFrequency';
import { useTheme } from '@emotion/react';
import { updateOfferAsync } from '../../store/offersSlice';
import { Transition } from '../../Utils/Transitions';

/**
 * Dialogo con formulario para editar los productos incluidos y sucursales donde se encuentra disponible la oferta
 * @component EditOfferPB
 * @property {Object} offer datos de la oferta a modificar.
 * @property {Function} handleSnack function que llama al componente snackbar (alerta)
 * @exports EditOfferPB
 */
export default function EditOfferPB({ offer, handleSnack }) {
	const dispatch = useDispatch();
	const { accessToken } = useSelector(state => state.login);
	const [open, setOpen] = useState(false);
	const [products, setProducts] = useState(null);
	const [branchOffices, setBranchOffices] = useState(null);
	const [prdInclude, setPrdInclude] = useState([]);
	const [branchSelected, setBranchSelected] = useState([]);

	const [changeBranchs, setChangeBranchs] = useState(false);
	const [changeProducts, setChangeProducts] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	/**
	 * Hace una llamada a funciones asincronas que hacen peticion de productos y sucursales de la empresa
	 * y cambia el estado open a true (abre el dialogo),
	 * @function handleClickOpen
	 */
	const handleClickOpen = () => {
		fetchProducts(offer.companie.id_empresa);
		fetchBranchs(offer.companie.id_empresa);
		setOpen(true);
	};
	/**
	 * Cambia el estado open a false (cierra el dialogo)
	 * @function handleClose
	 */
	const handleClose = () => {
		setOpen(false);
	};

	const theme = useTheme();
	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	/**
	 * configuracion de propiedades con estilos para el component MenuItem
	 * @constant MenuProps
	 */
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
			},
		},
	};
	/**
	 * Otorga estilos para el item de un Item seleccionado en un componente Select
	 * @function getStyles
	 * @param {String} name
	 * @param {Object} item
	 * @param {Object} theme configuacion del tema MUI
	 */
	function getStyles(name, item, theme) {
		return {
			fontWeight:
				item.indexOf(name) === -1
					? theme.typography.fontWeightRegular
					: theme.typography.fontWeightMedium,
		};
	}
	/**
	 * Hace una peticion al servidor para conseguir la lista de productos de la empresa a la que pertenece la oferta actual
	 * @function {async} fetchProducts
	 * @param {Number} id identificador de la empresa
	 */
	async function fetchProducts(id) {
		const r = await API.get('select/products?empresa=' + id, {
			headers: { Authorization: `Bearer ${accessToken}` },
		});
		setProducts(r.data);
	}
	/**
	 * Hace una peticion al servidor para conseguir la lista de sucursales de la empresa a la que pertenece la oferta actual
	 * @function {async} fetchBranchs
	 * @param {Number} id identificador de la empresa
	 */
	async function fetchBranchs(id) {
		const r = await API.get('select/sucursales?empresa=' + id, {
			headers: { Authorization: `Bearer ${accessToken}` },
		});
		setBranchOffices(r.data);
	}
	/**
	 * Actualiza el estado de productos incluidos "prdInclude"
	 * @function handleChange
	 */
	const handleChange = event => {
		const {
			target: { value },
		} = event;
		setPrdInclude(typeof value === 'string' ? value.split(',') : value);
	};
	/**
	 * Actualiza el estado de sucursales disponibles "branchSelected"
	 * @function handleSelectBranch
	 */
	const handleSelectBranch = event => {
		const {
			target: { value },
		} = event;
		setBranchSelected(typeof value === 'string' ? value.split(',') : value);
	};

	const [frequency, setFrequency] = useState(offer.frequency_redeem);
	/**
	 * Actualiza el estado frequency, asigna una frecuencia de canje
	 * @function handleFrequency
	 * @param {Object} event evento de Check
	 */
	const handleFrequency = event => {
		setFrequency(event.target.value);
	};
	/**
	 * Configura el data para ser enviado atravez de una funcion POST para la edicion de la oferta
	 * @function handleFrequency
	 */
	const submit = () => {
		const branchsArray = [];
		const productsArray = [];
		branchSelected?.forEach(e => {
			branchsArray.push(e.id_branch);
		});
		prdInclude?.forEach(e => {
			productsArray.push(e.id_product);
		});

		const data = {
			id_beneficio: offer.id_offer,
			productos:
				prdInclude.length !== 0 ? { productos: productsArray } : { productos: null },
			sucursales_disp:
				branchSelected.length !== 0 ? { ids: branchsArray } : { ids: null },
			frequency_redeem: frequency,
		};
		/**
		 * Realiza el dispatch hacia la peticion updateOfferAsync con la data configurado.
		 * @function {async} update
		 */
		const update = async () => {
			setSubmitting(true);
			return await dispatch(updateOfferAsync(accessToken, data, null));
		};
		update()
			.then(r => {
				handleSnack('Oferta actualizada exitosamente.', 'success');
				setSubmitting(false);
				handleClose();
			})
			.catch(e => {
				handleSnack('Algo salió mal, vuelva a intentarlo.', 'error');
				setSubmitting(false);
				handleClose();
			});
	};

	return (
		<>
			<Tooltip title="Editar productos y sucursales">
				<IconButton size="small" onClick={handleClickOpen}>
					<AppRegistration
						sx={{
							color: 'text.icon',
							'&:hover': {
								color: 'warning.light',
							},
						}}
					/>
				</IconButton>
			</Tooltip>

			<Dialog
				PaperProps={{ style: { borderRadius: 15 } }}
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}>
				<DialogTitle>{'Editar ' + offer?.title}</DialogTitle>

				<DialogContent sx={{ minWidth: 400 }}>
					<Stack spacing={2}>
						<Stack spacing={2}>
							<Box>
								<Typography fontWeight="bold">Sucursales</Typography>
								<Typography color="textSecondary">
									Actualmente, la oferta está disponible en:
								</Typography>
								{changeBranchs && branchSelected.length === 0 && <Chip label={'Todas'} />}
								{!changeBranchs && (
									<Stack direction="row" spacing={1}>
										{offer.branch_offices?.map(b => (
											<Chip key={b.id_branch} label={b.name} />
										))}
									</Stack>
								)}
							</Box>
							{!changeBranchs && (
								<Button
									variant="outlined"
									onClick={() => {
										setChangeBranchs(!changeBranchs);
									}}
									size="small">
									Seleccionar
								</Button>
							)}
							{changeBranchs && (
								<>
									<Select
										multiple
										fullWidth
										size="small"
										value={branchSelected}
										onChange={handleSelectBranch}
										disabled={!branchOffices}
										input={<OutlinedInput />}
										renderValue={s => (
											<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
												{s?.map(value => (
													<Chip key={value.id_branch} label={value.name} />
												))}
											</Box>
										)}
										MenuProps={MenuProps}>
										{branchOffices?.map(branch => (
											<MenuItem
												key={branch.id_branch}
												value={branch}
												style={getStyles(branch.name, branchSelected, theme)}>
												{branch.name}
											</MenuItem>
										))}
									</Select>

									{!branchOffices && (
										<Typography color="textSecondary" variant="caption">
											Cargando..
										</Typography>
									)}
								</>
							)}
						</Stack>

						<Stack spacing={2}>
							<Box>
								<Typography sx={{ fontWeight: 'bold' }}>Productos</Typography>

								<Typography color="textSecondary">
									Actualmente, en la oferta están incluidos:
								</Typography>
								{changeProducts && prdInclude.length === 0 && <Chip label={'Todas'} />}
								{!changeProducts && (
									<Stack direction="row" spacing={1}>
										{offer.products?.map(p => (
											<Chip key={p.id_product} label={p.name} />
										))}
									</Stack>
								)}
							</Box>
							{!changeProducts && (
								<Button
									variant="outlined"
									onClick={() => {
										setChangeProducts(!changeProducts);
									}}
									size="small">
									Seleccionar
								</Button>
							)}
							{changeProducts && (
								<>
									<Select
										multiple
										fullWidth
										size="small"
										value={prdInclude}
										onChange={handleChange}
										disabled={!products}
										input={<OutlinedInput />}
										renderValue={selected => (
											<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
												{selected?.map(value => (
													<Chip key={value.id_product} label={value.name} />
												))}
											</Box>
										)}
										MenuProps={MenuProps}>
										{products?.map(p => (
											<MenuItem
												key={p.id_product}
												value={p}
												style={getStyles(p.name, prdInclude, theme)}>
												{p.name}
											</MenuItem>
										))}
									</Select>
									{!products && (
										<Typography color="textSecondary" variant="caption">
											Cargando.. o no tiene registros.
										</Typography>
									)}
								</>
							)}
						</Stack>

						<CheckFrequency
							handleFrequency={handleFrequency}
							fr={offer.frequency_redeem}
						/>
						<DialogActions sx={{ p: 0 }}>
							<Button onClick={handleClose}>Cancelar</Button>
							<Box sx={{ position: 'relative' }}>
								<Button fullWidth onClick={submit}>
									Guardar
								</Button>
								{submitting && (
									<CircularProgress
										size={24}
										sx={{
											color: green[500],
											position: 'absolute',
											top: '50%',
											left: '50%',
											marginTop: '-12px',
											marginLeft: '-12px',
										}}
									/>
								)}
							</Box>
						</DialogActions>
					</Stack>
					{/* </Form>
					</FormikProvider> */}
				</DialogContent>
			</Dialog>
		</>
	);
}
