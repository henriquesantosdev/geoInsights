import { prisma } from "../lib/prisma";

async function seed() {

    const state = 'pernambuco'
    
    const municipalities = [
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
        "Araçoiaba",
        "Araripina",
        "Arcoverde",
        "Barra de Guabiraba",
        "Barreiros",
        "Belém de Maria",
        "Belém do São Francisco",
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
        "Ilha de Itamaracá",
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
        "Jaqueira",
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
        "Lagoa Grande",
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
        "Palmares",
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
        "São Vicente Férrer",
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
    ];

    const populationCheck = await prisma.state.findFirst({
        where: {
            name: state
        },
        include: {
            municipalities: {
                where: {
                    present: false
                }
            }
        }
    })

    if (populationCheck) {
        console.log('❌ \x1b[31mBase has already been populated!')
        process.exit(0)
    }

    console.log('🔁 Seeding database...\n')
    console.log(`🔁 creating state ${state}...`)

    const createdState = await prisma.state.create({
        data: {
            name: state
        }
    })

    if (!createdState) {
        console.log('❌ \x1b[31mError to create state!')
        process.exit(0)
    }

    console.log(`✅ State ${state} created with successfuly!`)

    console.log('🔁 Creating municipalities...\n')

    const createdMunicipalities = await Promise.all(
        municipalities.map(municipality => {
            return prisma.municipality.create({
                data: {
                    name: municipality,
                    stateId: createdState.id
                }
            });
        })
    )

    if (createdMunicipalities) {
        console.log('✅ Municipalities created with sucessfuly')
        console.log('✅ \x1b[32mSeeded Database with successfuly!')
    } else {
        console.log("❌ \x1b[31mError to create base: " + state)
        process.exit(0)
    }
}

seed()
