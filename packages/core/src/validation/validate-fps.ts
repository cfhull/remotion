import type {Codec} from '../config';

export const validateFps = (
	fps: number,
	location: string,
	codec: Codec | null
) => {
	if (typeof fps !== 'number') {
		throw new Error(
			`"fps" must be a number, but you passed a value of type ${typeof fps} ${location}`
		);
	}

	if (!Number.isFinite(fps)) {
		throw new Error(
			`"fps" must be a finite, but you passed ${fps} ${location}`
		);
	}

	if (isNaN(fps)) {
		throw new Error(`"fps" must not be NaN, but got ${fps} ${location}`);
	}

	if (fps <= 0) {
		throw new TypeError(`"fps" must be positive, but got ${fps} ${location}`);
	}

	if (codec === 'gif' && fps > 50) {
		throw new TypeError(
			`The FPS for a GIF canot be higher than 50. Use the --skip-n-frames option to lower the FPS: https://remotion.dev/docs/render-as-gif`
		);
	}
};
