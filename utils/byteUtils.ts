export function strToBytes(str: string): Uint8Array {
	return Uint8Array.from(str.split('').map(i => i.charCodeAt(0)));
}

export function renderByte(byte: number): string {
	let hex = byte.toString(16);
	if (hex.length === 1) {
		return `0${ hex }`;
	}
	return hex;
}

export function renderByteArray(bytes: number[] | Uint8Array): string[] {
	return Array.from(bytes)
		.map(i => renderByte(i));
}

export function renderBytes(bytes: number[] | Uint8Array): string {
	return renderByteArray(bytes).join(' ');
}
