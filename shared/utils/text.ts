export function deepTrip(str?: string): string {
	return str && str.trim().replace(/\s{2,}/gim, ' ');
}
