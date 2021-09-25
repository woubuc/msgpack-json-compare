<template>
	<div class="flex flex-col">
		<ui-title>{{ title }}</ui-title>
		<template v-if="hasValue">
			<ui-code-box class="flex-none max-h-48">{{ value }}</ui-code-box>
			<ui-title position="middle"><span class="text-gray-400">{{ $t('binary') }}</span></ui-title>
			<ui-code-box class="flex-grow"><bytes-display :bytes="bytes" /></ui-code-box>
			<div class="px-2.5 py-1 bg-gray-100 border border-t-0 rounded-b">
				<span class="inline-block px-1.5 bg-white border border-purple-300 rounded text-purple-900 text-sm font-semibold font-mono">{{ size }}</span>
			</div>
		</template>
		<ui-code-box v-else class="flex-grow rounded-b"></ui-code-box>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import prettyBytes from 'pretty-bytes';

import { DisplayBytes } from '~/models/DisplayBytes';

import BytesDisplay from './BytesDisplay.vue';
import UiCodeBox from './UiCodeBox.vue';
import UiTitle from './UiTitle.vue';

@Component({
	name: 'OutputField',
	components: { BytesDisplay, UiCodeBox, UiTitle },
})
export default class OutputField extends Vue {

	@Prop({ required: true })
	public readonly title: string;

	@Prop({ required: true })
	public readonly value: string;

	@Prop({ required: true })
	public readonly bytes: DisplayBytes;

	private get hasValue(): boolean {
		return this.value != null;
	}

	private get size(): string {
		if (this.value == null) {
			return '';
		}

		return prettyBytes(this.value.length);
	}
}
</script>
