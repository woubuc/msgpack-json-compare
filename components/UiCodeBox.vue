<template>
	<div class="px-4 py-2 bg-gray-50 border border-gray-200 text-sm text-gray-700 font-mono leading-6 whitespace-pre-wrap overflow-y-auto">
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
	name: 'UiCodeBox',
})
export default class UiCodeBox extends Vue {

}
</script>
