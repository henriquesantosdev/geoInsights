import { FormEvent, useEffect, useState } from "react";
import { axiosInstace } from "../lib/axios";
import { ChevronDown, Pencil, PencilOff, Plus, Save, X } from "lucide-react";
import 'react-toastify/dist/ReactToastify.css';
import { formatPhoneNumber } from "../utils/formatPhoneNumber";
import { formatNumberValue } from "../utils/formatNumberValue";
import { formatDate } from "../utils/formatDate";
import { MunicipalityInterface } from "../interfaces/municipalityInterface";

interface MunicipalityDetailsProps {
  handleShowModalMunicipalityDetails: () => void;
  municipalitySelected: MunicipalityInterface | null;
}

export function ModalMunicipalityDetails({
  handleShowModalMunicipalityDetails,
  municipalitySelected,
}: MunicipalityDetailsProps) {

  const [municipalityDetails, setMunicipalityDetails] = useState({
    ubsQuantity: 0,
    populationQuantity: 0,
    secretaryName: '',
    secretaryContact: '',
  });

  const [loading, setLoading] = useState<boolean>(true)
  const [showEditMunicipalitySelectedForm, setShowEditMunicipalitySelectedForm] = useState<boolean>(false)
  const [showEditMunicipalitySelectedConcorrenceForm, setShowEditMunicipalitySelectedConcorrenceForm] = useState<boolean>(false)

  const handleShowEditMunicipalitySelectedForm = () => {
    if (showEditMunicipalitySelectedForm) {
      setShowEditMunicipalitySelectedForm(false)
    } else {
      setShowEditMunicipalitySelectedForm(true)
      setShowEditMunicipalitySelectedConcorrenceForm(false)
    }
  }

  const handleShowEditMunicipalitySelectedConcorrenceForm = () => {
    if (showEditMunicipalitySelectedConcorrenceForm) {
      setShowEditMunicipalitySelectedConcorrenceForm(false)
    } else {
      setShowEditMunicipalitySelectedConcorrenceForm(true)
      setShowEditMunicipalitySelectedForm(false)
    }
  }

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

  const createMunicipalityConcorrence = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const name = data.get('name')?.toString()
    const contractStarted = data.get('contractStarted')?.toString()
    const contractEnd = data.get('contractEnd')?.toString()
    const value = data.get('value')
    const service = data.get('service')?.toString()

    if (municipalitySelected) {
      try {

        await axiosInstace.post(`/api/concorrence`, {
          municipalityId: municipalitySelected.id,
          name: name,
          contractStarted: contractStarted,
          contractEnd: contractEnd,
          value: Number(value),
          service: service
        });

        location.reload()

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

  console.log(municipalitySelected)

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
                      Informações de <span className="font-semibold">{municipalitySelected?.name}</span>
                    </h2>

                    <button
                      className="p-2 rounded hover:bg-gray-400 cursor-pointer text-gray-700 hover:text-white"
                      onClick={handleShowModalMunicipalityDetails}
                    >
                      <X className="size-5" />
                    </button>

                  </div>
                </div>

                <div className="bg-slate-200 rounded">
                  <div className="flex items-center justify-between bg-primary-color p-2 mb-2 rounded">
                    <p className="text-white font-bold">
                      Informações do município
                    </p>

                    {showEditMunicipalitySelectedForm ? (

                      <button onClick={handleShowEditMunicipalitySelectedForm} className="text-white hover:bg-white hover:text-gray-600 rounded p-2">
                        <PencilOff />
                      </button>

                    ) : (

                      <button onClick={handleShowEditMunicipalitySelectedForm} className="text-white hover:bg-white hover:text-gray-600 rounded p-2">
                        <Pencil />
                      </button>

                    )}

                  </div>

                  <div className="p-2">

                    <ul className="space-y-2 text-gray-600">
                      <li>
                        <strong>População:</strong> {formatNumberValue(municipalityDetails?.populationQuantity)}
                      </li>
                      <li>
                        <strong>Nome do Secretário:</strong> {municipalityDetails?.secretaryName}
                      </li>
                      <li>
                        <strong>Contato do Secretário:</strong> {formatPhoneNumber(municipalityDetails?.secretaryContact)}
                      </li>
                      <li>
                        <strong>Quantidade de UBS:</strong> {formatNumberValue(municipalityDetails?.ubsQuantity)}
                      </li>
                    </ul>

                  </div>

                  {showEditMunicipalitySelectedForm && (

                    <div className="p-2">

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
                          <Save />
                          Salvar alterações
                        </button>
                      </form>
                    </div>
                  )}
                </div>

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

        {/* #################################################################################### */}

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>

            {municipalitySelected.concorrence ? (
              <div>
                <div className="bg-slate-200 rounded mt-4">

                  <div className="flex items-center justify-between bg-red-700 p-2 mb-2 rounded">
                    <p className="text-white font-bold">
                      Informações do concorrente
                    </p>

                    {showEditMunicipalitySelectedConcorrenceForm ? (

                      <button onClick={handleShowEditMunicipalitySelectedConcorrenceForm} className="text-white hover:bg-white hover:text-gray-600 rounded p-2">
                        <PencilOff />
                      </button>

                    ) : (

                      <button onClick={handleShowEditMunicipalitySelectedConcorrenceForm} className="text-white hover:bg-white hover:text-gray-600 rounded p-2">
                        <Pencil />
                      </button>

                    )}
                  </div>

                  <div className="p-2">

                    <ul className="space-y-2 text-gray-600">
                      <li>
                        <strong>Nome da empresa:</strong> {municipalitySelected?.concorrence.name}
                      </li>
                      <li>
                        <strong>Serviços associados:</strong> {municipalitySelected?.concorrence.service}
                      </li>
                      <li>
                        <strong>Valor do contrato:</strong> R$ {formatNumberValue(municipalitySelected?.concorrence.value)}
                      </li>
                      <li>
                        <strong>Data de início do contrato:</strong> {formatDate(municipalitySelected?.concorrence.contractStarted)}
                      </li>
                      <li>
                        <strong>Data de fim do contrato:</strong> {formatDate(municipalitySelected?.concorrence.contractEnd)}
                      </li>
                    </ul>

                  </div>

                  {showEditMunicipalitySelectedConcorrenceForm && (

                    <form onSubmit={createMunicipalityConcorrence} className="w-full space-y-2 p-2">

                      <div>
                        <label htmlFor="contractStarted" className="text-gray-500">Inicio do contrato</label>
                        <input
                          type="datetime-local"
                          className="border w-full text-gray-400 rounded p-2 focus:outline-none focus:ring focus:ring-primary-color"
                          placeholder="Inicio do contrato"
                          name="contractStarted"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="contractStarted" className="text-gray-500">Fim do contrato</label>
                        <input
                          type="datetime-local"
                          className="border w-full text-gray-400 rounded p-2 focus:outline-none focus:ring focus:ring-primary-color"
                          placeholder="Fim do contrato"
                          name="contractEnd"
                          required
                        />
                      </div>

                      <div className="relative">
                        <select name="name" className="appearance-none w-full bg-white border border-gray-200 text-gray-400 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-primary-color">
                          <option value={'MV Saúde'} selected>MV Saúde</option>
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <ChevronDown className='size-4' />
                        </div>
                      </div>

                      <div className="relative">
                        <select name="service" className="appearance-none w-full bg-white border border-gray-200 text-gray-400 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-primary-color">
                          <option value={'serviço 01'} selected>Serviço 01</option>
                          <option value={'serviço 02'}>Serviço 02</option>
                          <option value={'serviço 03'}>Serviço 03</option>
                          <option value={'serviço 04'}>Serviço 04</option>
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <ChevronDown className='size-4' />
                        </div>
                      </div>

                      <input
                        type="number"
                        className="border w-full text-gray-500 rounded p-2 focus:outline-none focus:ring focus:ring-primary-color"
                        placeholder="Valor"
                        name="value"
                        required
                      />

                      <button className="flex items-center gap-2 rounded-md justify-center bg-primary-color hover:bg-secondary-color text-white font-semibold h-14 w-full">
                        <Save />
                        Salvar alterações
                      </button>
                    </form>
                  )}
                </div>

              </div>
            ) : (

              <>
                {(municipalityDetails && municipalitySelected.concorrencePresent && !municipalitySelected.concorrence) && (

                  <div className="mt-6">
                    <div className="mb-4">

                      <p className="text-gray-500">
                        Não existe Informações registradas sobre o concorrente, preencha o formulário e adicione agora mesmo!
                      </p>

                    </div>

                    <form onSubmit={createMunicipalityConcorrence} className="w-full space-y-2">

                      <div>
                        <label htmlFor="contractStarted" className="text-gray-400">Inicio do contrato</label>
                        <input
                          type="datetime-local"
                          className="border w-full text-gray-400 rounded p-2 focus:outline-none focus:ring focus:ring-primary-color"
                          placeholder="Inicio do contrato"
                          name="contractStarted"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="contractStarted" className="text-gray-400">Fim do contrato</label>
                        <input
                          type="datetime-local"
                          className="border w-full text-gray-400 rounded p-2 focus:outline-none focus:ring focus:ring-primary-color"
                          placeholder="Fim do contrato"
                          name="contractEnd"
                          required
                        />
                      </div>

                      <div className="relative">
                        <select name="name" className="appearance-none w-full bg-white border border-gray-200 text-gray-400 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-primary-color">
                          <option value={'MV Saúde'} selected>MV Saúde</option>
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <ChevronDown className='size-4' />
                        </div>
                      </div>

                      <div className="relative">
                        <select name="service" className="appearance-none w-full bg-white border border-gray-200 text-gray-400 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-primary-color">
                          <option value={'serviço 01'} selected>Serviço 01</option>
                          <option value={'serviço 02'}>Serviço 02</option>
                          <option value={'serviço 03'}>Serviço 03</option>
                          <option value={'serviço 04'}>Serviço 04</option>
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <ChevronDown className='size-4' />
                        </div>
                      </div>

                      <input
                        type="number"
                        className="border w-full text-gray-500 rounded p-2 focus:outline-none focus:ring focus:ring-primary-color"
                        placeholder="Valor"
                        name="value"
                        required
                      />

                      <button className="flex items-center gap-2 rounded-md justify-center bg-primary-color hover:bg-secondary-color text-white font-semibold h-14 w-full">
                        <Plus />
                        Registrar informações do concorrente
                      </button>
                    </form>

                  </div>
                )}
              </>
            )}

          </>
        )}
      </div>
    </div>
  );
}
