<template>
	<div v-if="properties && properties.gencaptchaUri" class="ondigo-captcha-container">
		<div class="ondigo-captcha-img-container">
			<img ref="img" :src="data" alt="Captcha" @load="imgLoaded" />
			<div ref="imgOverlay" :class="{ show: loading }" class="ondigo-captcha-img-overlay">
				<v-progress-circular v-if="loading" color="primary" indeterminate size="40" />
			</div>
		</div>
		<div class="ondigo-captcha-refresh-container">
			<button v-if="true" :aria-disabled="loading" :class="{ disabled: loading }" class="ondigo-captcha-refresh-text"
				@click="refresh">
				{{ properties.refreshText }}
			</button>
		</div>
		<div v-if="error" class="ondigo-captch-error">
			<p>
				{{ error }}
			</p>
		</div>
		<text-field ref="input" type="text" v-bind="{ ...$props, ...$attrs }" v-on="$listeners" />
	</div>
	<div v-else class="ondigo-captch-error">
		<p>could not load Captcha try refreshing the page</p>
	</div>
</template>

<script>
import TextField from '../composed/textfield.vue';

export default {
	name: 'OnCaptcha',
	components: {
		TextField,
	},
	data: () => ({
		loading: false,
		error: null,
		data: null,
		resizeListener: null,
		refreshTime: 0,
	}),
	created: function () {
		this.preloadImage()
			.then((dataUrl) => this.changeImg(dataUrl))
			.catch((err) => {
				console.error(err);
				this.error = 'Failed to fetch image.';
			});

		window.addEventListener(
			'resize',
			(this.resizeListener = () => this.onResize()),
			true
		);
	},
	mounted() {
		/** @type HTMLElement */
		const inputContainer = this.$refs.input.$el;
		if (inputContainer) {
			inputContainer.querySelectorAll('input')
				.forEach(input => input.setAttribute('autocomplete', 'off'));
		}
	},
	destroyed() {
		if (this.resizeListener) {
			window.removeEventListener('resize', this.resizeListener);
		}
	},
	methods: {
		refresh(event) {
			event.preventDefault();
			if (this.loading) return;

			this.loading = true;
			this.refreshTime = new Date().getTime();
			this.preloadImage()
				.then((dataUrl) => this.changeImg(dataUrl))
				.catch(() => {
					this.error = 'Failed to fetch image.';
					this.loading = false;
				});
		},
		async preloadImage() {
			const response = await fetch(this.properties.gencaptchaUri);
			return URL.createObjectURL(await response.blob());
		},
		changeImg(src) {
			if (this.data) {
				// on refresh image
				// temporarily make image dimensions fixed, to prevent flickering when replacing
				/** @type HTMLElement */
				const img = this.$refs.img;
				img.style.width = img.getBoundingClientRect().width;
				img.style.height = img.getBoundingClientRect().height;

				const loadingTime = new Date().getTime() - this.refreshTime;
				if (loadingTime < 500) {
					// The loading time was very fast. Delay the change to make the transition smoother
					setTimeout(() => this.data = src, 500 - loadingTime);
					return;
				}
			}

			// Dispatch image change
			this.data = src;
		},
		imgLoaded(event) {
			// Remove fixed image dimensions caused by image refresh
			/** @type HTMLElement */
			const target = event.target;
			if (target.style.width) target.style.width = '';
			if (target.style.height) target.style.height = '';

			// image dimensions should be recalculated now, so that the new overlay dimensions can be calculated
			this.recalculateOverlayDimensions();

			this.loading = false;
		},
		recalculateOverlayDimensions() {
			/** @type HTMLElement */
			const img = this.$refs.img;
			/** @type HTMLElement */
			const overlay = this.$refs.imgOverlay;
			overlay.style.height = `${img.getBoundingClientRect().height}px`;
		},
		onResize() {
			this.recalculateOverlayDimensions();
		},
	},
	props: {
		properties: {
			type: Object | Array,
			required: false,
		},
	},
};
</script>
