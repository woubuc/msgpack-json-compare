export type DisplayByte = string | DisplayBytesMatch;
export type DisplayBytes = DisplayByte[];

export interface DisplayBytesMatch {
	id: string;
	bytes: Uint8Array;
}
