<template>
	<div
		ref="tooltip"
		class="absolute px-2 py-0.5 bg-white rounded text-sm whitespace-nowrap font-mono font-bold shadow pointer-events-none"
		:class="classes"
		:style="styles">
		{{ value }}
	</div>
</template>

<script lang="ts">
import { Component, InjectReactive, mixins } from 'nuxt-property-decorator';

import TypedRefMixin from '~/mixins/TypedRefMixin';
import { BytesDisplayData } from '~/models/BytesDisplayData';

@Component({
	name: 'MatchTooltip',
})
export default class MatchTooltip extends mixins(TypedRefMixin) {

	@InjectReactive()
	private bytesDisplayData: BytesDisplayData;

	private styles: Record<string, string> = {};

	public mounted() {
		window.addEventListener('mousemove', this.onMouseMove, { passive: true });
	}

	public beforeDestroy() {
		window.removeEventListener('mousemove', this.onMouseMove);
	}

	private get classes(): string {
		if (this.bytesDisplayData.activeMatch == null) {
			return 'hidden';
		} else {
			return '';
		}
	}

	private get value(): string {
		if (this.bytesDisplayData.activeMatch == null) {
			return '';
		} else {
			return String.fromCharCode(...this.bytesDisplayData.activeMatch.bytes);
		}
	}

	private async onMouseMove(evt: MouseEvent) {
		this.styles = {
			left: `${ evt.clientX + 5 }px`,
			right: 'auto',
			top: `${ evt.clientY + 5 }px`,
		};
		await this.$nextTick();

		if (this.$ref<HTMLDivElement>('tooltip').getBoundingClientRect().right > window.innerWidth - 5) {
			this.styles.left = 'auto';
			this.styles.right = '5px';
		}
	}
}
</script>
