<template>
	<span><template v-for="byte of bytes"><template v-if="typeof byte === 'string'">{{ byte }} </template><bytes-display-match v-else :match="byte" /></template></span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

import BytesDisplayMatch from './BytesDisplayMatch.vue';

@Component({
	name: 'BytesDisplay',
	components: { BytesDisplayMatch },
})
export default class BytesDisplay extends Vue {

	@Prop({ required: true })
	public readonly bytes: BytesDisplay;
}
</script>
