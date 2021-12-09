export default function minmax(value, min, max, sketch) {
	return sketch.min(sketch.max(sketch.map(value, 0, 60, max, min), min), max)
}
