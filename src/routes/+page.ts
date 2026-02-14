import itineraryYaml from '$lib/config/itinerary.yaml?raw';
import { parseItineraryYaml } from '$lib/config/parseItineraryYaml';
import siteYaml from '$lib/config/site.yaml?raw';
import { parseSiteYaml } from '$lib/config/parseSiteYaml';

export const load = () => {
	return {
		itineraryItems: parseItineraryYaml(itineraryYaml),
		siteConfig: parseSiteYaml(siteYaml)
	};
};
