import randomList from '../../utils/random-list'
import minmax from '../../utils/minmax'
import drawRectangle from '../../utils/responsive-image'
import { colorPalettes } from '../../utils/palettes'

export const handler = ({ inputs, mechanic, sketch }) => {
	const { width, height, title, text, textWidth, image, imageX, imageY, stripes, colorPalette } = inputs

	let ctx, grd, img, titleHeight

	const padding = width < height ? 0.05 * width : 0.05 * height

	const paletteIndex = colorPalettes.findIndex((p) => p.name === colorPalette)
	const palette = colorPalettes[paletteIndex]

	function stripesGradient() {
		ctx = sketch.drawingContext
		grd = ctx.createLinearGradient(0, height, width, 0)

		const arr = randomList(stripes, 100)
		let arrSum = 0
		for (let i = 0; i < stripes; i++) {
			grd.addColorStop(arrSum / 100, palette.stripes[i % palette.stripes.length])
			arrSum += arr[i]
			grd.addColorStop(arrSum / 100, palette.stripes[i % palette.stripes.length])
		}
	}

	function createTitle(title, color) {
		sketch.fill(color)
		sketch.textStyle(sketch.BOLD)
		sketch.textSize(minmax(title.length, padding, padding * 1.5, sketch))
		sketch.textLeading(sketch.textSize() * 1.5)
		sketch.text(title, padding * 2, padding * 2, width - padding * 4)
		titleHeight = (Math.floor(sketch.textWidth(title) / (width - padding * 4)) + 1) * sketch.textLeading()
	}

	function createText(text, color) {
		sketch.fill(color)
		sketch.textStyle(sketch.NORMAL)
		sketch.textSize(minmax(text.length, padding * 0.9, padding * 1.5, sketch))
		sketch.textLeading(sketch.textSize() * 1.3)
		sketch.text(text, padding * 2, padding * 2 + titleHeight, 0.01 * textWidth * (width - padding * 4))
	}

	sketch.preload = () => {
		if (image) {
			img = sketch.loadImage(URL.createObjectURL(image))
		}
	}

	sketch.setup = () => {
		sketch.createCanvas(width, height)
		stripesGradient()
	}

	sketch.draw = () => {
		sketch.background('#F4F4F4')
		sketch.noStroke()
		sketch.angleMode(sketch.DEGREES)

		// Create Stripes
		ctx.fillStyle = grd
		ctx.fillRect(0, 0, width, height)

		//Create Rectangle
		sketch.fill(palette.background)
		sketch.rect(padding, padding, width - padding * 2, height - padding * 2)

		drawRectangle(
			imageX * 0.01 * width,
			imageY * 0.01 * height,
			(1 - imageX * 0.01) * width,
			(1 - imageY * 0.01) * height,
			img,
			sketch
		)

		createTitle(title, palette.title)

		createText(text, palette.text)

		mechanic.done()
	}
}

export const inputs = {
	title: {
		type: 'text',
		default: 'रियल लाइफ के सांता',
	},
	text: {
		type: 'text',
		default:
			'जे हर सुख-दुःख में साथ निभावेला, उहे जीवन के असली सांता कहाएला! रउआ भी शेयर करीं हमनी के साथ आपन जीवन के #रियल लाइफ के सांता के फ़ोटो अउर उनकरा खातिर एगो ख़ास मैसेज, साथ में कहीं उनकर शुक्रिया अउर जीतीं शानदार इनाम',
	},
	image: {
		type: 'image',
	},
	colorPalette: {
		type: 'text',
		default: colorPalettes[0].name,
		options: colorPalettes.map((p) => p.name),
	},
	textWidth: {
		type: 'number',
		default: 100,
		min: 1,
		max: 100,
		slider: true,
	},
	imageX: {
		type: 'number',
		default: 0,
		min: 0,
		max: 100,
		slider: true,
	},
	imageY: {
		type: 'number',
		default: 20,
		min: 0,
		max: 100,
		slider: true,
	},
	stripes: {
		type: 'number',
		default: 4,
		min: 4,
		max: 20,
		slider: true,
	},
	width: {
		type: 'number',
		default: 1080,
	},
	height: {
		type: 'number',
		default: 1080,
	},
}

export const presets = {
	'3w:4h': {
		width: 1080,
		height: 1440,
	},
}

export const settings = {
	engine: require('@mechanic-design/engine-p5'),
}
