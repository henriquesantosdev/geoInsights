import marquesConsultLogo from '/logo_marques_consult.webp'
import { ChevronDown } from "lucide-react";

export function HeaderGeoInsights() {
    return (
        <header className="flex p-4 flex-wrap items-center justify-between w-10/12 mx-auto">
            <div className='flex items-center'>

            <img src={marquesConsultLogo} alt="Logo marques consult" className='w-[200px]' />
            <h2 className="text-3xl font-bold text-center border-s-2 border-secondary-color ps-4 text-primary-color">
                GeoInsights
            </h2>
            </div>

            <div className="relative">
                <select className="appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-primary-color">
                    <option value="1" selected>Pernambuco</option>
                    <option value="2">Paraiba</option>
                    <option value="3">Alagoas</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className='size-4' />  
                </div>
            </div>
        </header>
    )
}