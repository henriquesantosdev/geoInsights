import { SimpleMapPernambuco } from "./components/simpleMapPernambuco"
import { HeaderMap } from './components/headerGeoInsights'
import marquesConsultLogo from '/logo_marques_consult.webp'
import { ArrowRightLeft, Linkedin, MapPinMinus, MapPinPlus } from "lucide-react"

export default function App() {

  return (
    <main>
      <HeaderMap/>

      <div className='border-b-2 border-b-secondary-color mb-8'></div>

      <div className='w-10/12 mx-auto'>
        <SimpleMapPernambuco/>

        <div className="mt-8 flex items-center gap-4 text-primary-color">
          <div className="flex flex-col p-4 gap-4 w-6/12 border bg-white border-gray-300 text-gray-500 rounded-xl">

            <h2 className="font-semibold text-lg text-gray-600">Municípios não adquiridos</h2>

            <input type="text" className="border rounded p-4" placeholder="Qual estado procura?" />

            <select className="h-44" name="" id="" multiple>
              <option value="0">Município 00</option>
              <option value="1">Município 01</option>
              <option value="2">Município 02</option>
              <option value="3">Município 03</option>
              <option value="4">Município 04</option>
              <option value="5">Município 05</option>
              <option value="6">Município 06</option>
            </select>

            <button className="flex items-center gap-2 rounded-md justify-center bg-primary-color text-white font-semibold h-14">
              <MapPinPlus />
              Registrar municipio
            </button>

          </div>

          <div>
            <ArrowRightLeft />
          </div>

          <div className="flex flex-col p-4 gap-4 w-6/12 border bg-white border-gray-300 text-gray-500 rounded-xl">
            <h2 className="font-semibold text-lg text-gray-600">Municípios adquiridos</h2>

            <input type="text" className="border rounded p-4" placeholder="Qual estado procura?" />

            <select className="h-44" name="" id="" multiple>
              <option value="0">Município 00</option>
              <option value="1">Município 01</option>
              <option value="2">Município 02</option>
              <option value="3">Município 03</option>
              <option value="4">Município 04</option>
              <option value="5">Município 05</option>
              <option value="6">Município 06</option>
            </select>

            <button className="flex items-center gap-2 rounded-md justify-center bg-primary-color text-white font-semibold h-14">
              <MapPinMinus />
              Remover municipio
            </button>
          </div>

        </div>
      </div>

      <div className='border-t-2 border-t-secondary-color mt-8'></div>

      <footer className="flex p-4 items-center justify-between w-10/12 mx-auto">
        <div>
          <img src={marquesConsultLogo} alt="Logo marques consult" className='w-[200px]' />
        </div>
        <div>
          <p className="text-primary-color text-center">
            Created with ❤️ by <br />

            <a href="https://www.linkedin.com/in/henrique-santos-497b0026a/" target="_blank" className="px-4 py-1 text-white rounded bg-primary-color hover:bg-secondary-color flex items-center gap-1" >
              <Linkedin className="size-4" /> Henriquesantosdev
            </a>
          </p>
        </div>
      </footer>
    </main>
  )
}
