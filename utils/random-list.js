export default function randomList(m, n) {
	// Create an array of size m where
	// every element is initialized to 0
	let arr = new Array(m)
	for (let i = 0; i < arr.length; i++) {
		arr[i] = 0
	}

	// To make the sum of the final list as n
	for (let i = 0; i < n; i++) {
		// Increment any random element
		// from the array by 1
		arr[Math.floor(Math.random() * n) % m]++
	}

	return arr
}
