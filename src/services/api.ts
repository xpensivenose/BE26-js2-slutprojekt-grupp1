// Hjälpfunktion för alla API-anrop
// Tar emot URL och options och returnerar svaret som JSON
export async function request<Type>(url: string, options?: RequestInit): Promise<Type> {
	try {
		const response = await fetch(url, options);

		// Hantera HTTP-fel från servern
		if (!response.ok) {
			throw new Error(`HTTP-fel: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		// Logga nätverksfel och andra fel för felsökning
		console.error("Fel vid API-anrop:", error);
		throw error;
	}
}
