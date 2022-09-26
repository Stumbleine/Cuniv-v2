import { Edit } from '@mui/icons-material';
import {
	Box,
	Button,
	Chip,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	Slide,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { edituserAsync } from '../../store/umssSlice';
import UploadImage from '../UploadImage';
import { green } from '@mui/material/colors';
import SnackCustom from '../SnackCustom';
import API from '../../conection';
import CheckFrequency from '../forms/CheckFrequency';
import { useTheme } from '@emotion/react';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditOffer({ offer, updateAsync }) {
	const dispatch = useDispatch();
	const { user, isAdmin } = useSelector(state => state.user);
	const { accessToken } = useSelector(state => state.login);
	const [open, setOpen] = useState(false);
	const [products, setProducts] = useState();
	const [branchOffices, setBranchOffices] = useState();
	const [prdInclude, setPrdInclude] = useState(offer.products);
	const [branchSelected, setBranchSelected] = useState(offer.branch_offices);

	const fetchPB = async () => {};
	const handleClickOpen = () => {
		setOpen(true);
		fetchPB();
	};
	const handleClose = () => {
		setOpen(false);
	};

	const theme = useTheme();
	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
			},
		},
	};
	const handleChange = event => {
		const {
			target: { value },
		} = event;
		setPrdInclude(typeof value === 'string' ? value.split(',') : value);
	};

	const handleSelectBranch = event => {
		const {
			target: { value },
		} = event;
		setBranchSelected(typeof value === 'string' ? value.split(',') : value);
	};

	function getStyles(name, personName, theme) {
		return {
			fontWeight:
				personName.indexOf(name) === -1
					? theme.typography.fontWeightRegular
					: theme.typography.fontWeightMedium,
		};
	}
	const [frequency, setFrequency] = useState('unlimited');

	const handleFrequency = event => {
		setFrequency(event.target.value);
	};

	const submit = async () => {
		const branchsArray = [];
		const productsArray = [];

		branchSelected?.forEach(e => {
			branchsArray.push(e.id_sucursal);
		});
		prdInclude?.forEach(e => {
			productsArray.push(e.id_producto);
		});

		const data = {
			productos: prdInclude.length !== 0 ? { productos: productsArray } : null,
			sucursales_disp: branchSelected.length !== 0 ? { ids: branchsArray } : null,
			frequency_redeem: frequency,
		};
		updateAsync(data);
	};

	return (
		<>
			<IconButton size="small" onClick={handleClickOpen}>
				<Edit
					sx={{
						color: 'text.icon',
						'&:hover': {
							color: 'warning.light',
						},
					}}
				/>
			</IconButton>

			<Dialog
				PaperProps={{ style: { borderRadius: 2 } }}
				open={open}
				disableEscapeKeyDown={true}
				TransitionComponent={Transition}>
				<DialogTitle>{'Editar ' + offer?.title}</DialogTitle>

				<DialogContent sx={{ minWidth: 400 }}>
					<Stack spacing={2}>
						<Box>
							<Typography fontWeight="bold">Sucursales</Typography>
							<Typography color="textSecondary">
								Seleccione sucursales donde aplica la oferta
							</Typography>
							<Typography sx={{ color: 'warning.main', mb: 1 }}>
								Por defecto se mostrara en todas las sucursales
							</Typography>
							{/* Aqui checks de sucursales */}

							<Select
								labelId="branch-select-label"
								multiple
								defaultValue={{ id: 0, name: 'Todas' }}
								fullWidth
								size="small"
								value={branchSelected}
								onChange={handleSelectBranch}
								disabled={!branchOffices}
								input={<OutlinedInput />}
								renderValue={s => (
									<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
										{s?.map(value => (
											<Chip key={value.id_sucursal} label={value.nombre} />
										))}
									</Box>
								)}
								MenuProps={MenuProps}>
								{branchOffices?.map(branch => (
									<MenuItem
										key={branch.id_sucursal}
										value={branch}
										style={getStyles(branch.nombre, branchSelected, theme)}>
										{branch.nombre}
									</MenuItem>
								))}
							</Select>
							{!branchOffices && (
								<Typography color="textSecondary" variant="caption">
									cargando..
								</Typography>
							)}
						</Box>

						<Box sx={{ width: '100%' }}>
							<Typography sx={{ fontWeight: 'bold' }}>Productos</Typography>
							<InputLabel>
								Seleccione los productos que incluye la oferta (opcional)
							</InputLabel>
							<Typography sx={{ color: 'warning.main', mb: 1 }}>
								Por defecto se incluiran todos
							</Typography>
							<Select
								labelId="prd-select-label"
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
											<Chip key={value.id_producto} label={value.nombre} />
										))}
									</Box>
								)}
								MenuProps={MenuProps}>
								{products?.map(p => (
									<MenuItem
										key={p.id_producto}
										value={p}
										style={getStyles(p.nombre, prdInclude, theme)}>
										{p.nombre}
									</MenuItem>
								))}
							</Select>
							{!products && (
								<Typography color="textSecondary" variant="caption">
									cargando.. o puede no tener registros.
								</Typography>
							)}
						</Box>

						<CheckFrequency handleFrequency={handleFrequency} />
						<DialogActions sx={{ p: 0 }}>
							<Button onClick={handleClose}>Cancelar</Button>
							<Box sx={{ position: 'relative' }}>
								<Button fullWidth type="submit">
									Guardar
								</Button>
								{/* {isSubmitting && (
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
										)} */}
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
