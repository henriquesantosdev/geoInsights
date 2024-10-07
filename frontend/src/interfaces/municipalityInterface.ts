export interface MunicipalityInterface {
    id: string;
    name: string;
    present: boolean;
    concorrencePresent: boolean;
    stateId: string;
    municipalityDetails: {
        populationQuantity: string;
        secretaryContact: string;
        secretaryName: string;
        ubsQuantity: string;
    }
    concorrence: {
        id: string
        name: string;
        contractStarted: string;
        contractEnd: string;
        value: number
        service: string
    }
}