<template>
	<div class="flex flex-col h-screen w-screen">
		<div class="border-t-2 border-purple-500" />
		<div class="flex-grow overflow-hidden md:grid grid-cols-2 2xl:grid-cols-3 grid-rows-2 space-y-6 md:space-y-0 md:gap-6 px-6 pt-6">
			<input-field class="row-span-2" @data="onDataChanged" />
			<output-field class="2xl:row-span-2" title="JSON" :value="json" :bytes="jsonBytes" />
			<output-field class="2xl:row-span-2" title="Msgpack" :value="packed" :bytes="packedBytes" />
		</div>
		<footer class="flex items-center justify-center space-x-6 px-6 py-2 text-xs text-gray-500">
			<p>Made by <a href="https://www.woubuc.be" target="_blank">@woubuc</a></p>
			<p>Source code on <a href="https://www.github.com/woubuc/msgpack-json-compare" target="_blank">Github</a>
			</p>
		</footer>
		<match-tooltip />
	</div>
</template>

<script lang="ts">
import msgpack from 'msgpack-lite';
import { Component, ProvideReactive, Vue } from 'nuxt-property-decorator';
import { JsonObject } from 'type-fest';

import { BytesDisplayData } from '~/models/BytesDisplayData';
import { DisplayBytes } from '~/models/DisplayBytes';
import { renderByteArray, strToBytes } from '~/utils/byteUtils';

import MatchTooltip from '~/components/BytesDisplayMatchTooltip.vue';
import InputField from '~/components/InputField.vue';
import OutputField from '~/components/OutputField.vue';
import UiTitle from '~/components/UiTitle.vue';

@Component({
	name: 'IndexPage',
	components: { MatchTooltip, OutputField, UiTitle, InputField },
})
export default class IndexPage extends Vue {

	@ProvideReactive()
	private bytesDisplayData: BytesDisplayData = {
		activeMatch: null,
		linkedScroll: 0,
	};

	private json: string | null = null;
	private jsonBytes: DisplayBytes = [];

	private packed: string | null = null;
	private packedBytes: DisplayBytes = [];

	private onDataChanged(data: JsonObject | null) {
		this.bytesDisplayData.activeMatch = null;

		if (data == null) {
			this.json = null;
			this.jsonBytes = [];
			this.packed = null;
			this.packedBytes = [];
			return;
		}

		this.json = JSON.stringify(data);
		let jsonBytes = strToBytes(this.json);

		let packedBuffer = msgpack.encode(data);
		let packedBytes = Uint8Array.from(packedBuffer);
		this.packed = packedBuffer.toString();

		let matches = [];
		let valuesToMatch = deepEntries(data);

		let jsonIndex = 0;
		let packedIndex = 0;
		for (let value of valuesToMatch) {
			let bytes = strToBytes(value);

			let jsonMatch = matchIn(jsonBytes, jsonIndex, bytes);
			if (jsonMatch === false) {
				continue;
			}

			let packedMatch = matchIn(packedBytes, packedIndex, bytes);
			if (packedMatch === false) {
				continue;
			}

			matches.push({ json: jsonIndex + jsonMatch, packed: packedIndex + packedMatch, bytes });
			jsonIndex = jsonMatch + value.length;
			packedIndex = packedMatch + value.length;
		}

		let jsonDisplayBytes: DisplayBytes = renderByteArray(jsonBytes);
		let packedDisplayBytes: DisplayBytes = renderByteArray(packedBytes);

		for (let match of matches.reverse()) {
			let matchId = `${ Math.round(Math.random() * 1_000_000) }.${ (Math.random() * 10_000).toFixed(8) }`;
			jsonDisplayBytes.splice(match.json, match.bytes.length, { id: matchId, bytes: match.bytes });
			packedDisplayBytes.splice(match.packed, match.bytes.length, { id: matchId, bytes: match.bytes });
		}

		this.jsonBytes = jsonDisplayBytes;
		this.packedBytes = packedDisplayBytes;
	}
}

function matchIn(bytes: Uint8Array, startIndex: number, matchBytes: Uint8Array): number | false {
	let matchArr = bytes.subarray(startIndex, bytes.length);

	let start = matchArr.indexOf(matchBytes[0]);
	if (start === -1) {
		return false;
	}

	let length = 1;
	while (true) {
		let nextByte = matchBytes[length];
		if (Number.isNaN(nextByte)) {
			return false;
		}

		if (matchArr[start + length] !== nextByte) {
			return false;
		}

		length++;
		if (length === matchBytes.length) {
			return start;
		}
	}
}

function deepEntries(obj: object): string[] {
	let entries: string[] = [];
	for (let key in obj) {
		entries.push(key);
		entries.push(...deepEntriesValue(obj[key]));
	}
	return entries;
}

function deepEntriesValue(value: any): string[] {
	if (Array.isArray(value)) {
		return value.map(i => deepEntriesValue(i)).flat();
	}

	switch (typeof value) {
		case 'object': return deepEntries(value);
		case 'string': return [value];
		default: return [];
	}
}
</script>
