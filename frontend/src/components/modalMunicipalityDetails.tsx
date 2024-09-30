import { useEffect, useState } from "react";
import { axiosInstace } from "../lib/axios";

interface Municipality {
  id: string;
  name: string;
  present: boolean;
  stateId: string;
}

interface MunicipalityDetailsProps {
  handleShowModalMunicipalityDetails: () => void;
  municipalitySelected: Municipality | null;
}

export function ModalMunicipalityDetails({
  handleShowModalMunicipalityDetails,
  municipalitySelected,
}: MunicipalityDetailsProps) {
  const [municipalityDetails, setMunicipalityDetails] = useState<Municipality | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (municipalitySelected) {
      const fetchMunicipalityDetails = async () => {
        setLoading(true);
        try {
          // Faz a requisição GET para obter os detalhes do município
          const response = await axiosInstace.get(`/api/municipality/${municipalitySelected.id}`);
          setMunicipalityDetails(response.data); // Armazena os detalhes do município no estado
        } catch (error) {
          console.error("Error fetching municipality details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchMunicipalityDetails();
    }
  }, [municipalitySelected]);

  if (!municipalitySelected) {
    return null; // Se não houver município selecionado, não renderiza nada
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[400px] bg-white p-6 rounded-xl">
        {loading ? (
          <p>Carregando...</p> // Exibe um indicador de carregamento enquanto busca os dados
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">{municipalityDetails?.name}</h2>
            <p className="mb-2">
              Status: {municipalityDetails?.present ? "Presente" : "Ausente"}
            </p>
          </>
        )}
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleShowModalMunicipalityDetails}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
