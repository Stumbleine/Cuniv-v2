// const [posData, setPosData] = useState(5);
// useEffect(() => {
// 	const max = 5;
// 	const min = 0;
// 	let lastMR = [0, 0];
// 	let posData = 5;
// 	setInterval(() => {
// 		let mr = Math.floor(Math.random() * (max - min) + min);

// 		if (lastMR.find((element) => element === mr) === undefined) {
// 			// console.log('rnadom', mr, lastMR);
// 			lastMR.unshift(mr);
// 			lastMR.pop();
// 		} else {
// 			replace();
// 			if (mr >= 4) {
// 				mr--;
// 			} else {
// 				mr++;
// 			}
// 			// console.log('rnadoModificado', mr, lastMR);
// 			lastMR.unshift(mr);
// 			lastMR.pop();
// 		}
// 		console.log(lastMR);
// 		// setMuestra(muestra[mr] Data[posData + 1]);
// 		console.log('nextData', Data[posData]);
// 		console.log(Data.length);
// 		if (posData < Data.length) {
// 			posData++;
// 			console.log(posData);
// 		} else {
// 			posData = 0;
// 		}
// 		// setMuestra([...muestra, (muestra[mr] = Data[posData + 1])]);
// 		// setPosData((prevPos) => prevPos + 1);
// 	}, 5000);
// }, []);
// useEffect(() => {
// 	console.log(Data);
// }, []);
