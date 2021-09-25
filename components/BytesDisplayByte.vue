<template>
	<span v-if="isPlainByte" class="whitespace-pre-wrap">{{ byte }} </span>
	<bytes-display-match v-else :match="byte" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

import { DisplayByte } from '~/models/DisplayBytes';

import BytesDisplayMatch from './BytesDisplayMatch';

@Component({
	name: 'BytesDisplayByte',
	components: { BytesDisplayMatch },
})
export default class BytesDisplayByte extends Vue {

	@Prop({ required: true })
	public readonly byte: DisplayByte;

	private get isPlainByte(): boolean {
		return typeof this.byte === 'string';
	}
}
</script>
