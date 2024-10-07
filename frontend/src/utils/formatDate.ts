export function formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses são indexados a partir de 0
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}