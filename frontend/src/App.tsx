import { PernambucoMap } from "./components/pernambuco/pernambucoMap"
import { HeaderGeoInsights } from './components/headerGeoInsights'
import { ArrowRightLeft, MapPinMinus, MapPinPlus } from "lucide-react"
import { FooterGeoInsights } from "./components/footerGeoInsights"
import { FormEvent, useEffect, useState } from "react";
import { axiosInstace } from "./lib/axios";

export default function App() {

  interface MunicipalityInterface {
    id: string;
    name: string;
    present: boolean;
    stateId: string;
  }

  // Acquired municipalities ---------------------------------------------------------
  const [acquiredMunicipalities, setAcquiredMunicipalities] = useState<MunicipalityInterface[]>([]);

  // Not acquired municipalities -----------------------------------------------------
  const [notAcquiredMunicipalities, setNotAcquiredMunicipalities] = useState<MunicipalityInterface[]>([]);

  // Fetch acquired and not acquired municipalities
  useEffect(() => {
    axiosInstace.get(`/api/present/municipalities/pernambuco`).then(response => {
      setAcquiredMunicipalities(response.data.municipalities);
    });

    axiosInstace.get(`/api/absent/municipalities/pernambuco`).then(response => {
      setNotAcquiredMunicipalities(response.data.municipalities);
    });
  }, []);

  // Search terms
  const [acquiredSearchTerm, setAcquiredSearchTerm] = useState<string>("");
  const [notAcquiredSearchTerm, setNotAcquiredSearchTerm] = useState<string>("");

  // Filter municipalities
  const filteredAcquiredMunicipalities = acquiredMunicipalities.filter((municipality) =>
    municipality.name.toLowerCase().includes(acquiredSearchTerm.toLowerCase())
  );

  const filteredNotAcquiredMunicipalities = notAcquiredMunicipalities.filter((municipality) =>
    municipality.name.toLowerCase().includes(notAcquiredSearchTerm.toLowerCase())
  );

  // Register municipalities
  const registerMunicipalities = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const municipalitiesToRegister = data.getAll('municipalityToRegister') as string[];

    try {
      await Promise.all(municipalitiesToRegister.map(async (municipalityId) => {
        await axiosInstace.put(`/api/municipality/${municipalityId}`, {
          present: true
        });
      }));

      const newMunicipalities = await Promise.all(
        municipalitiesToRegister.map(async (municipalityId) => {
          const response = await axiosInstace.get(`/api/municipality/${municipalityId}`);
          return response.data;
        })
      );

      setAcquiredMunicipalities((prev) => [...newMunicipalities, ...prev]);

      setNotAcquiredMunicipalities((prev) =>
        prev.filter((municipality) => !municipalitiesToRegister.includes(municipality.id))
      );

    } catch (error) {
      console.error("Error registering municipalities:", error);
    }
  }

  // Remove municipalities
  const removeMunicipalities = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const municipalitiesToRemove = data.getAll('municipalityToRemove') as string[];

    try {
      await Promise.all(municipalitiesToRemove.map((municipalityId) =>
        axiosInstace.put(`/api/municipality/${municipalityId}`, { present: false })
      ));

      const removedMunicipalities = await Promise.all(
        municipalitiesToRemove.map(async (municipalityId) => {
          const response = await axiosInstace.get(`/api/municipality/${municipalityId}`);
          return response.data;
        })
      );

      setAcquiredMunicipalities((prev) =>
        prev.filter(m => !municipalitiesToRemove.includes(m.id))
      );

      setNotAcquiredMunicipalities((prev) => [
        ...removedMunicipalities, // Agora estamos adicionando os municípios com todos os detalhes
        ...prev
      ]);

    } catch (error) {
      console.error("Error removing municipalities:", error);
    }
  };

  return (
    <main>
      <HeaderGeoInsights />
      <div className='border-b-2 border-b-secondary-color mb-8'></div>

      <div className='w-10/12 mx-auto'>
        <PernambucoMap
          acquiredMunicipalities={acquiredMunicipalities}
        />

        <div className="mt-8 flex items-center gap-4 text-primary-color">
          <div className="flex flex-col p-4 gap-4 w-6/12 border bg-white border-gray-300 text-gray-500 rounded-xl">

            <h2 className="font-semibold text-lg text-gray-600">Municípios não adquiridos</h2>

            <input
              type="text"
              className="border rounded p-4 focus:outline-none focus:ring focus:ring-primary-color"
              placeholder="Qual estado procura?"
              value={notAcquiredSearchTerm}
              onChange={(e) => setNotAcquiredSearchTerm(e.target.value)}
            />

            <form onSubmit={registerMunicipalities} className="flex flex-col gap-4">
              <select className="h-44 focus:outline-none" name="municipalityToRegister" id="" multiple>
                {filteredNotAcquiredMunicipalities.length > 0 ? (
                  filteredNotAcquiredMunicipalities.map((municipality) => (
                    <option key={municipality.id} value={municipality.id}>
                      {municipality.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Nenhum município encontrado</option>
                )}
              </select>

              <button className="flex items-center gap-2 rounded-md justify-center bg-primary-color hover:bg-secondary-color text-white font-semibold h-14">
                <MapPinPlus />
                Registrar município
              </button>
            </form>

          </div>

          <div>
            <ArrowRightLeft />
          </div>

          <div className="flex flex-col p-4 gap-4 w-6/12 border bg-white border-gray-300 text-gray-500 rounded-xl">
            <h2 className="font-semibold text-lg text-gray-600">Municípios adquiridos</h2>

            <input
              type="text"
              className="border rounded p-4 focus:outline-none focus:ring focus:ring-primary-color"
              placeholder="Qual estado procura?"
              value={acquiredSearchTerm}
              onChange={(e) => setAcquiredSearchTerm(e.target.value)}
            />

            <form onSubmit={removeMunicipalities} className="flex flex-col gap-4">
              <select className="h-44 focus:outline-none" name="municipalityToRemove" id="" multiple>
                {filteredAcquiredMunicipalities.length > 0 ? (
                  filteredAcquiredMunicipalities.map((municipality) => (
                    <option key={municipality.id} value={municipality.id}>
                      {municipality.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Nenhum município encontrado</option>
                )}
              </select>

              <button className="flex items-center gap-2 rounded-md justify-center bg-primary-color hover:bg-secondary-color text-white font-semibold h-14">
                <MapPinMinus />
                Remover município
              </button>
            </form>

          </div>

        </div>
      </div>

      <div className='border-t-2 border-t-primary-color mt-8'></div>
      <FooterGeoInsights />
    </main>

  )
}
