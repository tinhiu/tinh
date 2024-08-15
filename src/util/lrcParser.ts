export type LyricLine = {
	time: number;
	text: string;
};

export type LrcLyrics = {
	lines: LyricLine[];
	numLines: number;
};

const tag2seconds = (tag: any) => {
	const mm = Number.parseInt(tag[1], 10);
	const ss = Number.parseFloat(tag[2].replace(':', '.'));
	return mm * 60 + ss;
};

export const parse = (lrcString: string): LrcLyrics => {
	const lines = lrcString.split(/\r\n|\n|\r/u);
	const timeTag = /\[\s*(\d{1,3}):(\d{1,2}(?:[:.]\d{1,3})?)\s*]/g;
	const lyricsLines: LyricLine[] = [];

	for (const line of lines) {
		if (line[0] !== '[') {
			continue;
		}
		timeTag.lastIndex = 0;
		const rTimeTag = timeTag.exec(line);
		if (rTimeTag !== null) {
			const text = line.slice(timeTag.lastIndex);
			lyricsLines.push({
				time: tag2seconds(rTimeTag),
				text: text,
			});

			continue;
		}
	}

	return {
		lines: lyricsLines,
		numLines: lyricsLines.length,
	};
};
// https://github.com/mikezzb/lrc-player/blob/main/src/utils/lrcParser.ts
