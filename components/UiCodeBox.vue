<template>
	<div
		ref="scrollBox"
		class="px-4 py-2 bg-gray-50 border border-gray-200 text-sm text-gray-700 font-mono leading-6 whitespace-pre-wrap break-all overflow-y-auto"
		@scroll.passive="onScroll">
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, InjectReactive, mixins, Vue, Watch } from 'nuxt-property-decorator';
import TypedRefMixin from '../mixins/TypedRefMixin';
import { BytesDisplayData } from '../models/BytesDisplayData';

@Component({
	name: 'UiCodeBox',
})
export default class UiCodeBox extends mixins(TypedRefMixin) {

	@InjectReactive()
	private bytesDisplayData: BytesDisplayData;

	private scrolling: boolean = false;

	private get linkedScroll(): number {
		return this.bytesDisplayData.linkedScroll;
	}

	@Watch('linkedScroll')
	private async onLinkedScrollChanged() {
		this.scrolling = true;
		let el = this.$ref<HTMLDivElement>('scrollBox');
		el.scrollTop = (el.scrollHeight - el.clientHeight) * this.linkedScroll;
	}

	private onScroll(evt: Event) {
		if (this.scrolling) {
			this.scrolling = false;
			return;
		}

		let el = this.$ref<HTMLDivElement>('scrollBox');
		let pct = el.scrollTop / (el.scrollHeight - el.clientHeight);
		this.bytesDisplayData.linkedScroll = pct;
	}
}
</script>
