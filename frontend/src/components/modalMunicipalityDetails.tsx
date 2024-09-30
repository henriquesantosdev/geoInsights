import { useEffect, useState } from "react";
import { axiosInstace } from "../lib/axios";
import { Pencil } from "lucide-react";

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
          const response = await axiosInstace.get(`/api/municipality/${municipalitySelected.id}`);
          setMunicipalityDetails(response.data);
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
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[400px] bg-white p-6 rounded-xl">
        {loading ? (
          <p>Carregando...</p> // Exibe um indicador de carregamento enquanto busca os dados
        ) : (
          <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-700">{municipalityDetails?.name}</h2>
            <button className="p-2 rounded hover:bg-gray-400 cursor-pointer text-gray-700 hover:text-white">
              <Pencil className="size-5" />
            </button>
          </div>
            <p className="mb-2 text-gray-600">
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
