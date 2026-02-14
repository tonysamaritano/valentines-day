import itineraryYaml from '$lib/config/itinerary.yaml?raw';
import { parseItineraryYaml } from '$lib/config/parseItineraryYaml';

export const load = () => {
	return {
		itineraryItems: parseItineraryYaml(itineraryYaml)
	};
};
