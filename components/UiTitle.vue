<template>
	<div
		class="px-4 py-2 border border-b-0 border-gray-200 bg-gray-100 text-gray-600 text-xs uppercase font-semibold"
		:class="classes">
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component({
	name: 'UiTitle',
})
export default class UiTitle extends Vue {

	@Prop({ default: 'top' })
	public readonly position: 'top' | 'middle';

	private get classes(): string {
		if (this.position === 'top') {
			return 'rounded-t';
		} else {
			return 'border-t-0';
		}
	}
}
</script>
