export type ItineraryItem = {
	time: string;
	title: string;
	description: string;
};

const normalizeValue = (value: string): string => {
	const trimmed = value.trim();
	if (
		(trimmed.startsWith('"') && trimmed.endsWith('"')) ||
		(trimmed.startsWith("'") && trimmed.endsWith("'"))
	) {
		return trimmed.slice(1, -1);
	}
	return trimmed;
};

export const parseItineraryYaml = (content: string): ItineraryItem[] => {
	const lines = content.split('\n');
	const items: Array<Partial<ItineraryItem>> = [];
	let current: Partial<ItineraryItem> | null = null;

	for (const rawLine of lines) {
		const line = rawLine.trim();
		if (line === '' || line.startsWith('#') || line === 'itinerary:') {
			continue;
		}

		if (line.startsWith('- ')) {
			if (current) {
				items.push(current);
			}

			current = {};
			const inline = line.slice(2).trim();
			if (inline.includes(':')) {
				const [key, ...rest] = inline.split(':');
				current[key.trim() as keyof ItineraryItem] = normalizeValue(rest.join(':'));
			}
			continue;
		}

		if (!current || !line.includes(':')) {
			continue;
		}

		const [key, ...rest] = line.split(':');
		current[key.trim() as keyof ItineraryItem] = normalizeValue(rest.join(':'));
	}

	if (current) {
		items.push(current);
	}

	return items
		.filter((item): item is ItineraryItem =>
			typeof item.time === 'string' &&
			typeof item.title === 'string' &&
			typeof item.description === 'string'
		)
		.map((item) => ({
			time: item.time,
			title: item.title,
			description: item.description
		}));
};
