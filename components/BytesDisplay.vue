<template>
	<span><bytes-display-byte v-for="(byte, i) of bytes" :key="i" :byte="byte" /></span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

import BytesDisplayByte from './BytesDisplayByte.vue';

@Component({
	name: 'BytesDisplay',
	components: { BytesDisplayByte },
})
export default class BytesDisplay extends Vue {

	@Prop({ required: true })
	public readonly bytes: BytesDisplay;
}
</script>
