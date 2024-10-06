import { FormEvent, useEffect, useState } from "react";
import { axiosInstace } from "../lib/axios";
import { Plus, X } from "lucide-react";
import 'react-toastify/dist/ReactToastify.css';
import { MunicipalityDetailsInterface } from "../interfaces/municipalityDetails";

interface MunicipalityDetailsProps {
  handleShowModalMunicipalityDetails: () => void;
  municipalitySelected: MunicipalityDetailsInterface | null;
}

export function ModalMunicipalityDetails({
  handleShowModalMunicipalityDetails,
  municipalitySelected,
}: MunicipalityDetailsProps) {

  // const [municipalityDetails, setMunicipalityDetails] = useState<MunicipalityDetails | null>(null);

  const [municipalityDetails, setMunicipalityDetails] = useState({
    ubsQuantity: 0,
    populationQuantity: 0,
    secretaryName: '',
    secretaryContact: '',
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (municipalitySelected) {
      const fetchMunicipalityDetails = async () => {
        setLoading(true);
        try {
          const response = await axiosInstace.get(`/api/municipalitydetails/${municipalitySelected.id}`);
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

  const createMunicipalityDetails = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const ubsQuantity = data.get('ubsQuantity')?.toString()
    const populationQuantity = data.get('populationQuantity')?.toString()
    const secretaryName = data.get('secretaryName')?.toString()
    const secretaryContact = data.get('secretaryContact')?.toString()

    if (municipalitySelected) {
      try {

        await axiosInstace.post(`/api/municipalitydetails`, {
          municipalityId: municipalitySelected.id,
          ubsQuantity: Number(ubsQuantity),
          populationQuantity: Number(populationQuantity),
          secretaryName: secretaryName,
          secretaryContact: Number(secretaryContact)
        });

        handleShowModalMunicipalityDetails()

      } catch (error) {
        console.error("Error registering municipalities:", error);
      }
    }
  }

  if (!municipalitySelected) {
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Atualiza o estado com base no campo editado
    setMunicipalityDetails((prevDetails) => ({
      ...prevDetails,
      [name]: name === 'ubsQuantity' || name === 'populationQuantity' ? Number(value) : value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[600px] bg-white p-6 rounded-xl">

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>

            {municipalityDetails ? (
              <div>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-normal text-gray-700">
                      Detalhes de <span className="font-semibold">{municipalitySelected?.name}</span>
                    </h2>

                    <button
                      className="p-2 rounded hover:bg-gray-400 cursor-pointer text-gray-700 hover:text-white"
                      onClick={handleShowModalMunicipalityDetails}
                    >
                      <X className="size-5" />
                    </button>

                  </div>

                  <p className="text-gray-500">
                    Você pode editar os detalhes do município pelo formulário abaixo!
                  </p>

                </div>


                <ul className="space-y-2 text-gray-600 mb-4">
                  <li>
                    <strong>População:</strong> {municipalityDetails?.populationQuantity}
                  </li>
                  <li>
                    <strong>Nome do Secretário:</strong> {municipalityDetails?.secretaryName}
                  </li>
                  <li>
                    <strong>Contato do Secretário:</strong> {municipalityDetails?.secretaryContact}
                  </li>
                  <li>
                    <strong>Quantidade de UBS:</strong> {municipalityDetails?.ubsQuantity}
                  </li>
                </ul>

                <hr className="mb-4" />

                <form onSubmit={createMunicipalityDetails} className="w-full space-y-2">
                  <input
                    type="number"
                    className="border w-full text-gray-500 rounded p-4 focus:outline-none focus:ring focus:ring-primary-color"
                    placeholder="Quantidade de UBS's"
                    name="ubsQuantity"
                    value={municipalityDetails.ubsQuantity || ''}
                    onChange={handleInputChange}
                    required
                  />

                  <input
                    type="number"
                    className="border w-full text-gray-500 rounded p-4 focus:outline-none focus:ring focus:ring-primary-color"
                    placeholder="Quantidade de populacao"
                    name="populationQuantity"
                    value={municipalityDetails.populationQuantity || ''}
                    onChange={handleInputChange}
                    required
                  />

                  <input
                    type="text"
                    className="border w-full text-gray-500 rounded p-4 focus:outline-none focus:ring focus:ring-primary-color"
                    placeholder="Nome do secretario(a)"
                    name="secretaryName"
                    value={municipalityDetails.secretaryName || ''}
                    onChange={handleInputChange}
                    required
                  />

                  <input
                    type="text"
                    className="border w-full text-gray-500 rounded p-4 focus:outline-none focus:ring focus:ring-primary-color"
                    placeholder="Contato do secretario(a)"
                    name="secretaryContact"
                    value={municipalityDetails.secretaryContact || ''}
                    onChange={handleInputChange}
                    maxLength={11}
                    required
                  />

                  <button className="flex items-center gap-2 rounded-md justify-center bg-primary-color hover:bg-secondary-color text-white font-semibold h-14 w-full">
                    <Plus />
                    Registrar detalhes do municipio
                  </button>
                </form>

              </div>
            ) : (
              <div className="">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-normal text-gray-700">
                      Detalhes de <span className="font-semibold">{municipalitySelected?.name}</span> não encontrados.
                    </h2>

                    <button
                      className="p-2 rounded hover:bg-gray-400 cursor-pointer text-gray-700 hover:text-white"
                      onClick={handleShowModalMunicipalityDetails}
                    >
                      <X className="size-5" />
                    </button>
                  </div>

                  <p className="text-gray-500">
                    Não existe detalhes registrados para esse município, você pode preencher o formulário e adicionar agora mesmo!
                  </p>

                </div>

                <form onSubmit={createMunicipalityDetails} className="w-full space-y-2">
                  <input
                    type="number"
                    className="border w-full text-gray-500 rounded p-4 focus:outline-none focus:ring focus:ring-primary-color"
                    placeholder="Quantidade de UBS's"
                    name="ubsQuantity"
                    required
                  />

                  <input
                    type="number"
                    className="border w-full text-gray-500 rounded p-4 focus:outline-none focus:ring focus:ring-primary-color"
                    placeholder="Quantidade de populacao"
                    name="populationQuantity"
                    required
                  />

                  <input
                    type="text"
                    className="border w-full text-gray-500 rounded p-4 focus:outline-none focus:ring focus:ring-primary-color"
                    placeholder="Nome do secreatario(a)"
                    name="secretaryName"
                    required
                  />

                  <input
                    type="text"
                    className="border w-full text-gray-500 rounded p-4 focus:outline-none focus:ring focus:ring-primary-color"
                    placeholder="Contato do secreatario(a)"
                    name="secretaryContact"
                    max={11}
                    required
                  />

                  <button className="flex items-center gap-2 rounded-md justify-center bg-primary-color hover:bg-secondary-color text-white font-semibold h-14 w-full">
                    <Plus />
                    Registrar detalhes do municipio
                  </button>
                </form>

              </div>
            )}

          </>
        )}
      </div>
    </div>
  );
}
