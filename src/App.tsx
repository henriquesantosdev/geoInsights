import { PernambucoMap } from "./components/pernambuco/pernambucoMap"
import { HeaderGeoInsights } from './components/headerGeoInsights'
import { ArrowRightLeft, MapPinMinus, MapPinPlus } from "lucide-react"
import { FooterGeoInsights } from "./components/footerGeoInsights"

export default function App() {

  return (
    <main>
      <HeaderGeoInsights/>
      <div className='border-b-2 border-b-secondary-color mb-8'></div>

      <div className='w-10/12 mx-auto'>
        <PernambucoMap/>

        <div className="mt-8 flex items-center gap-4 text-primary-color">
          <div className="flex flex-col p-4 gap-4 w-6/12 border bg-white border-gray-300 text-gray-500 rounded-xl">

            <h2 className="font-semibold text-lg text-gray-600">Municípios não adquiridos</h2>

            <input type="text" className="border rounded p-4 focus:outline-none focus:ring focus:ring-primary-color" placeholder="Qual estado procura?" />

            <select className="h-44 focus:outline-none" name="" id="" multiple>
              <option value="0">Município 00</option>
              <option value="1">Município 01</option>
              <option value="2">Município 02</option>
              <option value="3">Município 03</option>
              <option value="4">Município 04</option>
              <option value="5">Município 05</option>
              <option value="6">Município 06</option>
              <option value="7">Município 07</option>
              <option value="8">Município 08</option>
              <option value="9">Município 09</option>
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

            <input type="text" className="border rounded p-4 focus:outline-none focus:ring focus:ring-primary-color" placeholder="Qual estado procura?" />

            <select className="h-44 focus:outline-none" name="" id="" multiple>
              <option value="0">Município 00</option>
              <option value="1">Município 01</option>
              <option value="2">Município 02</option>
              <option value="3">Município 03</option>
              <option value="4">Município 04</option>
              <option value="5">Município 05</option>
              <option value="6">Município 06</option>
              <option value="7">Município 07</option>
              <option value="8">Município 08</option>
              <option value="9">Município 09</option>
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
