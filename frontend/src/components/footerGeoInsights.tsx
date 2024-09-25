import marquesConsultLogo from '/logo_marques_consult.webp'
import { Linkedin } from "lucide-react";

export function FooterGeoInsights() {
    return (
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
    )
}