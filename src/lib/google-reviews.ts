export async function getGoogleReviews() {
    const placeId = 'ChIJex9rHEAddkgRxjKjbi4RwOY';
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

    // We add 'rating' and 'user_ratings_total' for the Rich Schema
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&key=${apiKey}`;

    try {
        const res = await fetch(url, { next: { revalidate: 86400 } }); // Cache for 24 hours
        const data = await res.json();
        return data.result;
    } catch (error) {
        console.error("Failed to fetch Google Reviews", error);
        return null;
    }
}