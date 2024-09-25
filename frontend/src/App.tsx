import { PernambucoMap } from "./components/pernambuco/pernambucoMap"
import { HeaderGeoInsights } from './components/headerGeoInsights'
import { ArrowRightLeft, MapPinMinus, MapPinPlus } from "lucide-react"
import { FooterGeoInsights } from "./components/footerGeoInsights"
import { useState } from "react";

export default function App() {

  const [municipiosAcquired] = useState<string[]>([]);

  const [acquireDsearchTerm, setAcquireDsearchTerm] = useState<string>("");

  const filteredMunicipiosAcquired = municipiosAcquired.filter((municipio) =>
    municipio.toLowerCase().includes(acquireDsearchTerm.toLowerCase())
  );

  // Municipios not aquired

  const [municipiosNotAcquired] = useState<string[]>([
    "Abreu e Lima",
    "Afogados da Ingazeira",
    "Afrânio",
    "Agrestina",
    "Água Preta",
    "Águas Belas",
    "Alagoinha",
    "Aliança",
    "Altinho",
    "Amaraji",
    "Angelim",
    "Araripina",
    "Arcoverde",
    "Barra de Guabiraba",
    "Barreiros",
    "Belém de Maria",
    "Belém de São Francisco",
    "Belo Jardim",
    "Betânia",
    "Bezerros",
    "Bodocó",
    "Bom Conselho",
    "Bom Jardim",
    "Bonito",
    "Brejão",
    "Brejinho",
    "Brejo da Madre de Deus",
    "Buenos Aires",
    "Buíque",
    "Cabo de Santo Agostinho",
    "Cabrobó",
    "Cachoeirinha",
    "Caetés",
    "Calçado",
    "Calumbi",
    "Camaragibe",
    "Camocim de São Félix",
    "Camutanga",
    "Canhotinho",
    "Capoeiras",
    "Carnaíba",
    "Carnaubeira da Penha",
    "Carpina",
    "Caruaru",
    "Casinhas",
    "Catende",
    "Cedro",
    "Chã de Alegria",
    "Chã Grande",
    "Condado",
    "Correntes",
    "Cortês",
    "Cumaru",
    "Cupira",
    "Custódia",
    "Dormentes",
    "Escada",
    "Exu",
    "Feira Nova",
    "Fernando de Noronha",
    "Ferreiros",
    "Flores",
    "Floresta",
    "Frei Miguelinho",
    "Gameleira",
    "Garanhuns",
    "Glória do Goitá",
    "Goiana",
    "Granito",
    "Gravatá",
    "Iati",
    "Ibimirim",
    "Ibirajuba",
    "Igarassu",
    "Iguaraci",
    "Inajá",
    "Ingazeira",
    "Ipojuca",
    "Ipubi",
    "Itacuruba",
    "Itaíba",
    "Itambé",
    "Itapetim",
    "Itapissuma",
    "Itaquitinga",
    "Jaboatão dos Guararapes",
    "Jataúba",
    "Jatobá",
    "João Alfredo",
    "Joaquim Nabuco",
    "Jucati",
    "Jupi",
    "Jurema",
    "Lagoa de Itaenga",
    "Lagoa do Carro",
    "Lagoa do Ouro",
    "Lagoa dos Gatos",
    "Lajedo",
    "Limoeiro",
    "Macaparana",
    "Machados",
    "Manari",
    "Maraial",
    "Mirandiba",
    "Moreilândia",
    "Moreno",
    "Nazaré da Mata",
    "Olinda",
    "Orobó",
    "Orocó",
    "Ouricuri",
    "Palmeirina",
    "Panelas",
    "Paranatama",
    "Parnamirim",
    "Passira",
    "Paudalho",
    "Paulista",
    "Pedra",
    "Pesqueira",
    "Petrolândia",
    "Petrolina",
    "Poção",
    "Pombos",
    "Primavera",
    "Quipapá",
    "Quixaba",
    "Recife",
    "Riacho das Almas",
    "Ribeirão",
    "Rio Formoso",
    "Sairé",
    "Salgadinho",
    "Salgueiro",
    "Saloá",
    "Sanharó",
    "Santa Cruz",
    "Santa Cruz da Baixa Verde",
    "Santa Cruz do Capibaribe",
    "Santa Filomena",
    "Santa Maria da Boa Vista",
    "Santa Maria do Cambucá",
    "Santa Terezinha",
    "São Benedito do Sul",
    "São Bento do Una",
    "São Caetano",
    "São João",
    "São Joaquim do Monte",
    "São José da Coroa Grande",
    "São José do Belmonte",
    "São José do Egito",
    "São Lourenço da Mata",
    "São Vicente Ferrer",
    "Serra Talhada",
    "Serrita",
    "Sertânia",
    "Sirinhaém",
    "Solidão",
    "Surubim",
    "Tabira",
    "Tacaimbó",
    "Tacaratu",
    "Tamandaré",
    "Taquaritinga do Norte",
    "Terezinha",
    "Terra Nova",
    "Timbaúba",
    "Toritama",
    "Tracunhaém",
    "Trindade",
    "Triunfo",
    "Tupanatinga",
    "Tuparetama",
    "Venturosa",
    "Verdejante",
    "Vertente do Lério",
    "Vertentes",
    "Vicência",
    "Vitória de Santo Antão",
    "Xexéu"
  ]);
  
  const [notAcquireDsearchTerm, setNotAcquireDsearchTerm] = useState<string>("");

  const filteredMunicipiosNotAcquired = municipiosNotAcquired.filter((municipio) =>
    municipio.toLowerCase().includes(notAcquireDsearchTerm.toLowerCase())
  );

  return (
    <main>
      <HeaderGeoInsights/>
      <div className='border-b-2 border-b-secondary-color mb-8'></div>

      <div className='w-10/12 mx-auto'>
        <PernambucoMap/>

        <div className="mt-8 flex items-center gap-4 text-primary-color">
          <div className="flex flex-col p-4 gap-4 w-6/12 border bg-white border-gray-300 text-gray-500 rounded-xl">

            <h2 className="font-semibold text-lg text-gray-600">Municípios não adquiridos</h2>

            <input
              type="text"
              className="border rounded p-4 focus:outline-none focus:ring focus:ring-primary-color"
              placeholder="Qual estado procura?"
              value={notAcquireDsearchTerm}
              onChange={(e) => setNotAcquireDsearchTerm(e.target.value)}
            />

            <select className="h-44 focus:outline-none" name="" id="" multiple>
              {filteredMunicipiosNotAcquired.length > 0 ? (
                filteredMunicipiosNotAcquired.map((municipio, index) => (
                  <option key={index} value={index}>
                    {municipio}
                  </option>
                ))
              ) : (
                <option disabled>Nenhum município encontrado</option>
              )}
            </select>

            <button className="flex items-center gap-2 rounded-md justify-center bg-primary-color hover:bg-secondary-color text-white font-semibold h-14">
              <MapPinPlus />
              Registrar municipio
            </button>

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
              value={acquireDsearchTerm}
              onChange={(e) => setAcquireDsearchTerm(e.target.value)}
            />

            <select className="h-44 focus:outline-none" name="" id="" multiple>
              {filteredMunicipiosAcquired.length > 0 ? (
                filteredMunicipiosAcquired.map((municipio, index) => (
                  <option key={index} value={index}>{municipio}</option>
                ))
              ) : (
                <option disabled>Nenhum município encontrado</option>
              )}
            </select>

            <button className="flex items-center gap-2 rounded-md justify-center bg-primary-color hover:bg-secondary-color text-white font-semibold h-14">
              <MapPinMinus />
              Remover municipio
            </button>
          </div>

        </div>
      </div>

      <div className='border-t-2 border-t-primary-color mt-8'></div>
      <FooterGeoInsights/>
    </main>
  )
}
