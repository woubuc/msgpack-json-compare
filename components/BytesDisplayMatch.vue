<template>
	<span class="-mx-px"><span class="-mx-1 -my-px px-1 py-px border rounded" :class="classes" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">{{ displayBytes }}</span>&nbsp;</span>
</template>

<script lang="ts">
import { Component, InjectReactive, Prop, Vue } from 'nuxt-property-decorator';

import { BytesDisplayData } from '~/models/BytesDisplayData';
import { DisplayBytesMatch } from '~/models/DisplayBytes';
import { renderBytes } from '~/utils/byteUtils';

@Component({
	name: 'BytesDisplayMatch',
})
export default class BytesDisplayMatch extends Vue {

	@Prop({ required: true })
	public readonly match: DisplayBytesMatch;

	@InjectReactive()
	private bytesDisplayData: BytesDisplayData;

	private get displayBytes(): string {
		return renderBytes(this.match.bytes);
	}

	private get isActive(): boolean{
		return this.bytesDisplayData.activeMatch?.id === this.match.id;
	}

	private get classes(): string {
		if (this.isActive) {
			return 'bg-purple-50 border-purple-400 text-purple-800';
		} else {
			return 'bg-white border-gray-300 text-gray-700';
		}
	}

	private onMouseEnter() {
		this.bytesDisplayData.activeMatch = this.match;
	}

	private onMouseLeave() {
		this.bytesDisplayData.activeMatch = null;
	}
}
</script>
