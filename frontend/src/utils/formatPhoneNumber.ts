export const formatPhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, "");

    if (cleaned.length === 10) {
        return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "($1) 9.$2-$3");
    } else if (cleaned.length === 11) {
        return cleaned.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2.$3-$4");
    }

    return phone;
};