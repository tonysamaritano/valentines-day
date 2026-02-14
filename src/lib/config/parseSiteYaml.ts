export type SiteConfig = {
	eventDate: string;
	showPostponementAlert: boolean;
	postponedFromDate: string | null;
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

const parseBoolean = (value: string): boolean => {
	const normalized = normalizeValue(value).toLowerCase();
	return normalized === 'true' || normalized === 'yes' || normalized === '1';
};

export const parseSiteYaml = (content: string): SiteConfig => {
	const lines = content.split('\n');

	let eventDate = '2026-02-14';
	let showPostponementAlert = false;
	let postponedFromDate: string | null = null;

	for (const rawLine of lines) {
		const line = rawLine.trim();
		if (line === '' || line.startsWith('#') || !line.includes(':')) continue;

		const [rawKey, ...rest] = line.split(':');
		const key = rawKey.trim();
		const value = rest.join(':').trim();

		if (key === 'event_date') eventDate = normalizeValue(value);
		if (key === 'show_postponement_alert') showPostponementAlert = parseBoolean(value);
		if (key === 'postponed_from_date') postponedFromDate = normalizeValue(value);
	}

	return {
		eventDate,
		showPostponementAlert,
		postponedFromDate
	};
};
