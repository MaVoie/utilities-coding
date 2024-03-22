import logoBayes from "assets/images/logo-bayes.png";
// import logoBonjourSophy from "assets/images/logo-bonjour-sophy.png";
// import logoCaisseEpargne from "assets/images/logo-caisse-epargne.png";
import logoChance from "assets/images/logo-chance.svg";
import logoGeneration from "assets/images/logo-generation.svg";
// import logoGoogleAteliersNumériques from "assets/images/logo-google-ateliers-numerique.png";
// import logoInco from "assets/images/logo-inco.png";
import logoJobready from "assets/images/logo-jobready.png";
// import logoHenriLachmann from "assets/images/logo-henri-lachmann.png";
// import logoKonexio from "assets/images/logo-konexio.png";
// import logoMakesense from "assets/images/logo-makesense.png";
// import logoOpenClassrooms from "assets/images/logo-openclassrooms.png";
// import logoShareit from "assets/images/logo-shareit.png";
// import logoStationF from "assets/images/logo-stationf.png";

export const FOUNDING_PARTNERS = {
  chance: {
    image: logoChance,
    name: "Chance",
    url: "https://www.chance.co/",
  },
  bayes: {
    image: logoBayes,
    name: "Bayes Impact",
    url: "https://www.bayesimpact.org/fr/",
  },
  generation: {
    image: logoGeneration,
    name: "Generation",
    url: "https://france.generation.org/",
  },
  jobReady: {
    image: logoJobready,
    name: "Jobready",
    url: "https://www.jobready.fr/",
  },
};

export const PARTNERS_SOLUTIONS = {
  chance: {
    description:
      "  * Le parcours de coaching digital pour choisir le travail qui vous rendra heureux(se)\n  * Durée 3 mois. 100% en ligne.\n  * 24h d'autocoaching en ligne et 6 séances de vidéo-coaching individuelles avec un coach professionnel certifié\n  * Essai gratuit sur www.chance.co avec démarrage immédiat",
    details: "Finançable CPF",
    isInternal: true,
    logo: "chance.svg",
    name: "Chance",
    partnerId: "chance",
    steps: ["definition"],
    title: "Essai gratuit",
    url: "https://go.chance.co/mavoie",
  },
  incoGetIntoTech: {
    description:
      "**Get Into Tech**\n  * Intéressé par l'univers du web, vous voulez vous lancer mais vous avez besoin d'un coup de boost pour cibler la carrière qui vous convient vraiment ?\n  * Découvez **Get Into Tech**, 1 mois pour développer vos compétences techniques et booster votre orientation professionnelle dans le domaine du numérique.\n  * Durée 4 semaines. 100% en ligne.",
    details: "",
    isInternal: true,
    logo: "inco.png",
    name: "Inco - Get\u00A0Into\u00A0Tech",
    partnerId: "inco-get-into-tech",
    steps: ["definition"],
    title: "Gratuit",
    url: "https://inco-group.typeform.com/to/fusbYb",
  },
  idMetiers: {
    description:
      "Ce quiz \"IDMétiers\" vous interroge sur 25 compétences dans les domaines suivants\u00A0:\n  * Comportements professionnels, par exemple si vous aimez travailler en équipe\n  * Savoirs professionnels, par exemple si vous savez bien communiquer par écrit\n  * Savoir-faire professionnels, par exemple si vous savez intégrer le développement durable dans votre travail\n  * À la fin, on vous propose des métiers correspondant le plus à vos compétences.\n  * Les questions sont assez avancées, mais vous pouvez laisser vide si vous n'avez pas encore d'idée.",
    details: "Quiz",
    logo: "idmetiers.jpeg",
    name: "IDMétiers",
    partnerId: "idmetiers",
    steps: ["definition"],
    url: "https://www.afpa.fr/id-metiers",
  },
  jobReady: {
    description:
      "  * Identifiez et valorisez tous types d'expériences (personnelles, professionnelles, bénévolat... )\n  * Premières compétences transversales identifiées en moins de 10 minutes\n  * Référentiel de compétences transversales objectivé et reconnu par 30 entreprises\n  * Micro certifications exportables et valorisables sur CV, Linkedin...\n  * Programme en ligne\n  * Gratuit pour les utilisateurs de Mavoie",
    details: "",
    isInternal: true,
    logo: "logo-jobready.svg",
    name: "Jobready",
    partnerId: "job-ready",
    steps: ["training"],
    title: "Gratuit",
    url: "https://www.jobready.fr/inscription",
  },
  generation: {
    description:
      "  * Formation entièrement gratuite au métier de Customer Care, la relation client 2.0\n  * Accompagnement au soft-skills et aux entretiens\n  * Coaching pendant 7 mois par un mentor\n  * Un job dating à la clé avec des partenaires employeurs !\n  * Durée\u00A0: 4 semaines\n  * Lieu\u00A0: en présentiel à Paris\n  * Plus de formations à venir",
    isInternal: true,
    logo: "logo-generation.svg",
    name: "Génération",
    partnerId: "generation",
    steps: ["definition", "training"],
    title: "Gratuit",
    url: "https://gen.partners/MV21PG",
  },
  generationGrandeDistribution: {
    description:
      "  * Vous souhaitez être formé·e gratuitement puis embauché·e immédiatement dans le secteur de la grande distribution ?\n  * Une formation rapide gratuite et rémunérée\n  * Un emploi garanti en sortie de formation : spécialisation sur un des 5 métiers proposés (poissonier·e, charchutier·e, boulanger·e, patissier·e et primeur) que vous aurez découvert\n  * Un accompagnement de 7 mois par un mentor\n  * Durée : 3 semaines.\n  * Lieu : présentiel (IDF) et à distance\n  * La formation est accessible à tou·te·s demandeur·euse·s d'emploi de 18 à 30 ans inscrit·e·s au Pôle Emploi, sans prérequis technique, de diplôme ou d’expérience.",
    isInternal: true,
    logo: "logo-generation.svg",
    name: "Génération",
    partnerId: "generation-grande-distribution",
    steps: ["training"],
    title: "Gratuit",
    url: "https://genrecruiting.generation.org/welcome?country=61&program=234&location=11184&recruitingPartner=MAVOIE&localRecruitmentChannel=MAVOIE21EPV",
  },
  generationDeveloppeurFullstack: {
    description:
      "  * Formation entièrement gratuite au métier de Développeur.euse Full Stack Junior\n  * Durée : 16 mois (semaine 0, Bootcamp pré-alternance + 1 an d’alternance)\n  * Des ateliers ludiques et interactifs pour acquérir les compétences techniques et comportementales dont vous aurez besoin dans votre futur poste\n  * Un accompagnement par un.e mentor qui vous donnera des conseils personnalisés pour vous développer et vous aider à trouver votre contrat d’alternance\n  * Un jobdating lors duquel vous rencontrerez des entreprises qui cherchent à recruter des talents en alternance\n  * Plus de formations à venir.",
    isInternal: true,
    logo: "logo-generation.svg",
    name: "Génération",
    partnerId: "generation-developpeur-fullstack",
    steps: ["training"],
    title: "Gratuit",
    url: "https://gen.community/DFSJ-MaVoie",
  },
  googleAtlierNumerique: {
    description:
      "  * Formations au numérique gratuites et ouvertes à tous\n  * Cours en ligne, sessions live ou conseils personnalisés par visio-conférence",
    isInternal: true,
    logo: "google-ateliers-numerique.png",
    name: "Google - Les\u00A0ateliers\u00A0numérique",
    partnerId: "google-ateliers-numerique",
    steps: ["training"],
    title: "Gratuit",
    url: "https://g.co/ateliersnumeriques ",
  },
  incoInCode: {
    description:
      "**In Code**\n  * Devenez développeur et apprenez un des langages de programmation les plus en vogue !\n  * Construit sur un modèle blended - en présentiel et en ligne - INCODE vous permet d’acquérir en 400 heures toutes les compétences pour devenir développeur fullstack JavaScript et maîtriser les codes pour vous lancer en tant que développeur junior.\n  * Durée 3 mois. Blended (En ligne et présentiel)",
    details: "",
    isInternal: true,
    logo: "inco.png",
    name: "Inco - In\u00A0Code",
    partnerId: "inco-in-code",
    steps: [],
    title: "Gratuit",
    url: "https://inco-group.typeform.com/to/KcU1lM",
  },
  incoBuildAndClick: {
    description:
      "**Build and Click**\n  * Les clés pour devenir dessinateur-projeteur 3D avec REVIT ! Construit sur un modèle blended - en présentiel et en ligne - BUILD AND CLICK vous permet d’acquérir en 400 heures toutes les compétences pour devenir dessinateur-projeteur 3D et maîtriser le logiciel REVIT.\n   Durée 3 mois. Blended (En ligne et présentiel)",
    details: "",
    isInternal: true,
    logo: "inco.png",
    name: "Inco - Build\u00A0and\u00A0Click",
    partnerId: "inco-build-and-click",
    steps: ["training"],
    title: "Gratuit",
    url: "https://inco-group.typeform.com/to/y4Pqts",
  },
  walt: {
    description:
      "Ce site \"Walt\" est une super ressource qui vous explique comment être efficace dans une recherche d'alternance.\n  * C'est aussi un moteur de recherche pour toutes vos questions d'orientation\u00A0: informations sur des métiers, témoignages en vidéo, entreprises à cibler, informations sur des écoles...\n  * On vous recommande de réserver votre après-midi et d'explorer à fond, ce site est une mine d'or.",
    details: "Site",
    logo: "walt.png",
    name: "Walt",
    partnerId: "walt",
    steps: ["training"],
    url: "https://walt.community/home-candidat",
  },
  bob: {
    description:
      "  * Le **coach gratuit** qui vous aide à comprendre et agir sur votre recherche d'emploi\n  * En moins de 10 minutes, Bob vous montre comment **débloquer** votre recherche d'emploi\n  * **Stratégies sur mesure** pour vous suggérer les meilleures actions à réaliser\n  * Totalement **gratuit** et **confidentiel**",
    isInternal: true,
    logo: "bob.png",
    name: "Bob",
    partnerId: "bob",
    steps: ["interview"],
    title: "Gratuit",
    url: "https://www.bob-emploi.fr/intro",
  },
  welcomeToTheJungle: {
    description:
      "Ces guides en ligne faits par \"Welcome to the Jungle\" vous donnent des exercises pratiques à faire pour préparer un entretien. Avoir un entretien implique que vous n'avez jamais été plus près de décrocher un poste. Ces articles vous montrent pourquoi la préparation, c'est la clé\u00A0:\n\n1. Comment déceler la culture de l'entreprise pour savoir quel ton adopter, comment s'habiller etc.\n\n2. Sur quoi se renseigner avant l'entretien.\n\n3. Les erreurs fréquentes à éviter.\n\n4. Comment rédiger le mail que l'on envoie au recruteur suite à l'entretien.",
    logo: "welcome-to-the-jungle.png",
    name: "Welcome\u00A0to\u00A0the\u00A0Jungle",
    partnerId: "welcome-to-the-jungle",
    steps: ["interview"],
    title: "Gratuit",
    url: "https://www.welcometothejungle.com/fr/collections/guides-candidats/preparer-un-entretien-d-embauche",
  },
  dessinToiUnEmploi: {
    description:
      "C'est un classique\u00A0: on passe des heures à préparer un entretien, pour avoir l'impression en sortant que sa préparation n'aurait servi à rien. Ce super article fait par \"Dessine toi un emploi\" vous explique que préparer trois questions suffit pour la plupart des entretiens, à condition de très bien les préparer !\n\n1. Qui êtes-vous\u00A0?\n\n2. Pourquoi nous et pas un autre\u00A0?\n\n3. Pourquoi cette fonction, pourquoi ce secteur\u00A0?",
    logo: "dessine-toi-un-emploi.jpg",
    name: "Dessine\u00A0toi\u00A0un\u00A0emploi",
    partnerId: "dessine-toi-un-emploi",
    steps: ["interview"],
    title: "Gratuit",
    url: "http://dessinetoiunemploi.com/3-uniques-questions-a-preparer-lentretien/",
  },
  bonjourSophy: {
    description:
      "  * Le programme qui vous aide à découvrir et vivre votre mission de vie.\n  * Un parcours interactif et 100% confidentiel, articulé en 3 temps : se préparer, se connaître et s'affirmer\n  * Sophy, notre coach virtuelle, vous guidera avec bienveillance à travers nos ateliers individuels en ligne, composés d’exercices interactifs et accessibles à tous.",
    isInternal: true,
    logo: "bonjour-sophy.png",
    name: "Bonjour Sophy",
    partnerId: "bonjour-sophy",
    steps: ["definition"],
    title: "Gratuit",
    url: "https://bonjoursophy.com",
  },
  openClassroomsPrepa: {
    description:
      "**Prép'Apprentissage**\n  * En 4 mois, découvrez, testez et choisissez un métier d'avenir. Dans la foulée, OpenClassrooms vous aide à trouver un contrat d'apprentissage pour l'apprendre gratuitement.\n  * 4 métiers : Développeur-se Web, Technicien-ne informatique, Attaché-e commercial-e, Gestionnaire de paie\n  * 100% en ligne, plateforme accessible 24h/24 et 7j/7, accompagnement par un mentor, un coach en orientation professionnelle et un coach en insertion professionnelle",
    details: "",
    isInternal: true,
    logo: "openclassrooms.png",
    name: "Prep'apprentissage",
    partnerId: "openclassrooms-prepapprentissage",
    steps: ["definition"],
    title: "Gratuit",
    url: "http://oc.cm/3rfgGoo",
  },
  openClassroomsTraining: {
    description:
      "**Les programmes 100% financés**\n  * Apprenez sereinement votre futur métier sur une formation financée ! Grâce à notre quiz, découvrez les options de financement qui correspondent à votre profil et postulez en quelques clics.\n  * 100% en ligne, 100% financé, formations diplômantes ou certifiantes\n  * Étudier chez OpenClassrooms, c’est apprendre de manière professionnalisante, être accompagné tout du long, bénéficier d’un coaching à l’emploi",
    details: "",
    isInternal: true,
    logo: "openclassrooms.png",
    name: "Les programmes 100% financés",
    partnerId: "openclassrooms-training",
    steps: ["training"],
    title: "Gratuit",
    url: "http://oc.cm/3oHgHjd",
  },
  oreegamiMarketingDigital: {
    description:
      "- Formez-vous gratuitement au marketing digital avec des intervenants experts du secteur.\n\n- Bénéficiez de coaching individuel et ateliers collectifs par des coachs certifiées\n\n- Appliquez les compétences acquises via un cas pratique réel, visant à construire la stratégie digitale d'une entreprise\n\n- 3 mois de bootcamp pour être opérationnel dans des métiers recherchés sur le marché.\n\n- 12 mois d’alternance pour intégrer vos apprentissages et valider la formation",
    isInternal: true,
    logo: "oreegami.png",
    name: "Oreegami\u00A0-\u00A0Marketing\u00A0digital",
    partnerId: "oreegami-marketing-digital",
    steps: ["training"],
    title: "Gratuit",
    url: "https://www.oreegami.com/mavoie.php",
  },
  openClassroomdNetwork: {
    description:
      "**OpenClassrooms Développez votre réseau professionnel**\n  * Dans ce cours, vous découvrirez tout ce que le networking a à vous offrir. Vous apprendrez comment développer votre réseau, comment utiliser les médias sociaux pour approcher les bonnes personnes de manière stratégique et comment entretenir ce réseau dans le temps.\n  * Vous êtes prêt à réseauter ? À rencontrer de nouvelles personnes ? À découvrir une nouvelle stratégie pour vous créer de nouvelles opportunités ? Alors vous êtes au bon endroit !\n  * 10 heures, 100% en ligne, 100% gratuit. Ce cours est ouvert à tous.",
    details: "",
    isInternal: true,
    logo: "openclassrooms.png",
    name: "Openclassrooms - Développement du réseau professionnel",
    partnerId: "openclassrooms-network",
    steps: ["interview"],
    title: "Gratuit",
    url: "http://oc.cm/36Ci0JQ",
  },
  openClassroomsSearch: {
    description:
      "**OpenClassrooms Élaborez votre stratégie de recherche d'emploi**\n  * Vous avez un projet professionnel et connaissez vos compétences. Il faut maintenant entrer dans le concret en préparant votre recherche d'emploi !\n  * À la fin du cours, vous serez capable de rédiger efficacement votre CV, maîtriser votre e-réputation, optimiser votre profil sur LinkedIn, composer votre ePortfolio, sdapter vos outils de recherche d’emploi à votre projet\n  * 8 heures, 100% en ligne, 100% gratuit. Ce cours est ouvert à tous",
    details: "",
    isInternal: true,
    logo: "openclassrooms.png",
    name: "Openclassrooms - Stratégie de recherche d'emploi",
    partnerId: "openclassrooms-search",
    steps: ["interview"],
    title: "Gratuit",
    url: "http://oc.cm/39Fj7dJ",
  },
};
