export default function drawRectangle(rx, ry, rw, rh, img, sketch) {
	if (img) {
		const rectRatio = rw / rh
		const imageRatio = img.width / img.height
		const sw = rectRatio > imageRatio ? img.width : img.height * rectRatio
		const sh = rectRatio > imageRatio ? img.width / rectRatio : img.height
		const sx = (img.width - sw) / 2
		const sy = (img.height - sh) / 2
		sketch.image(img, rx, ry, rw, rh, sx, sy, sw, sh)
	}
}
