import { Client, PlaceData, TextSearchResponseData } from "@googlemaps/google-maps-services-js";
import { AppStateCityLawFirmTable } from "@/components/app-state-city-law-firm-table";

const client = new Client({});

// Revalidate the cache every 24 hours
export const revalidate = 86_400;

// Allow dynamic params for paths not generated at build time
export const dynamicParams = true;

interface Location {
    state: string;
    city: string;
}

async function getFirms(state: string, city: string): Promise<{ results: PlaceData[], error?: string }> {
    try {
        const response = await client.textSearch({
            params: {
                query: `law firms in ${city}, ${state}`,
                key: process.env.GOOGLE_MAPS_API_KEY as string,
            },
        });

        if (response.status !== 200) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = response.data as TextSearchResponseData;

        return { results: data.results as PlaceData[] };
    } catch (error) {
        console.error("Error fetching law firms:", error);
        return {
            results: [],
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        };
    }
}

export async function generateStaticParams(): Promise<Location[]> {
    // Replace this with your actual API call or data source
    // const locations: Location[] = await fetch('https://api.yourdomain.com/locations').then((res) => res.json());

    // Get all the states and cities from the locations
    // return locations.map((location) => ({
    //     state: location.state,
    //     city: location.city,
    // }));
    return [
        { state: "tn", city: "chattanooga" },
        { state: "tn", city: "knoxville" },
        { state: "tn", city: "memphis" },
        { state: "tn", city: "nashville" },
    ]
}

export default async function CityPage({
    params,
}: {
    params: { state: string; city: string };
}) {
    const { results, error } = await getFirms(params.state, params.city);

    if (error) {
        return <div>Error: {error}</div>;
    }

    const validLawFirms = results.filter((firm): firm is PlaceData => firm.name !== undefined);

    const lawFirmsData = validLawFirms.map(firm => ({
        name: firm.name,
        address: firm.formatted_address || 'N/A',
        phone: firm.formatted_phone_number || 'N/A',
        rating: firm.rating ? `${firm.rating.toFixed(1)} (${firm.user_ratings_total} reviews)` : 'N/A',
        placeId: firm.place_id || 'N/A',
    }));

    return (
        <AppStateCityLawFirmTable
            data={lawFirmsData}
            state={params.state}
            city={params.city}
        />
    );
}
