<template>
	<div class="flex flex-col">
		<ui-title>{{ $t('input') }}</ui-title>
		<div class="flex-grow relative flex flex-col">
			<textarea
				ref="input"
				v-model="value"
				class="flex-grow block min-h-[30vh] p-4 border resize-none text-sm font-mono outline-none focus:ring-1"
				:class="classes"
				@focus="onFocus"
				@keydown="onKeyDown" />
			<div
				v-if="isInvalid"
				class="absolute z-10 left-2 right-2 bottom-2 px-2.5 pt-1 pb-1.5 bg-red-500 rounded text-white text-sm font-semibold">{{ error }}
			</div>
		</div>

		<div class="flex items-center px-4 py-2 bg-gray-50 border border-t-0 border-gray-200 rounded-b">
			<p class="flex-grow text-xs text-gray-500">{{ $t('parsed_with') }}
				<a href="https://json5.org/" target="_blank">JSON5</a>
			</p>
			<button
				@click="reset"
				class="px-2 py-0.5 bg-purple-500 text-white hover:bg-purple-700 focus:bg-purple-700 rounded text-xs uppercase font-semibold">
				{{ $t('reset') }}
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, mixins, Watch } from 'nuxt-property-decorator';
import JSON5 from 'json5';

import TypedRefMixin from '~/mixins/TypedRefMixin';

import UiTitle from './UiTitle.vue';

const LOCALSTORAGE_KEY = 'msgpack_json_input';

@Component({
	name: 'InputField',
	components: { UiTitle },
})
export default class InputField extends mixins(TypedRefMixin) {

	private error: string | null = null;

	private value: string = localStorage.getItem(LOCALSTORAGE_KEY) ?? this.$t('default_data') as string;

	private get isInvalid(): boolean {
		return this.error != null;
	}

	private get classes(): string {
		if (this.isInvalid) {
			return 'ring-red-500 border-red-500 bg-red-50 text-red-900';
		} else {
			return 'ring-purple-500 border-gray-200 focus:border-purple-500 text-gray-900';
		}
	}

	@Watch('value', { immediate: true })
	private onValueChanged(evt: InputEvent): void {
		localStorage.setItem(LOCALSTORAGE_KEY, this.value);

		try {
			let parsed = JSON5.parse(this.value);
			this.error = null;
			this.$emit('data', parsed);
		} catch (err) {
			this.error = err.message ?? err.toString();
			this.$emit('data', null);
			return;
		}
	}

	private reset(): void {
		this.value = this.$t('default_data') as string;
	}

	private onFocus() {
		this.$ref<HTMLTextAreaElement>('input').select();
	}

	private onKeyDown(evt: KeyboardEvent) {
		if (evt.code === 'Tab') {
			evt.preventDefault();

			let input = this.$ref<HTMLTextAreaElement>('input');
			let value = input.value;
			let end = input.selectionEnd;
			input.value = value.slice(0, input.selectionStart) + '\t' + value.slice(input.selectionEnd);
			input.selectionEnd = end + 1;
		}
	}
}
</script>
