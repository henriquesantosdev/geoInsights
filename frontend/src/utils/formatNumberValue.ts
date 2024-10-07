export function formatNumberValue(num: number): string {
    return new Intl.NumberFormat('pt-BR').format(num);
}