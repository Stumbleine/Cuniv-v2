/**
 * Convierte un archivo file a Base 64, usado para imagenes principalmente
 * @function convertToB64
 */
export const convertToB64 = file => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file[0]);
		reader.onload = () => {
			resolve(reader.result);
		};
		reader.onerror = error => {
			reject(error);
		};
	});
};
