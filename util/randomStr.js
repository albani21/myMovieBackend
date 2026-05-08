module.exports = function randomStr(length) {
	const alphabet = "abcdefghijklmnopqrstuvwxyz";
	let result = "";
	for (let i = 0; i < length; i++) {
		// Pick a random index from the alphabet string
		const randomIndex = Math.floor(Math.random() * alphabet.length);
		result += alphabet[randomIndex];
	}
	return result;
}
