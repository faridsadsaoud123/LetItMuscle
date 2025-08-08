export interface Abonnement {
    id: number;
    nomAbonnement: string;
    tarif: number;
    duree: string;
    nbrAdherent: number;
    statusAbonnement: 'Actif' | 'Inactif';

    createurId: number;
    optionsAbonnement: string;
  }
  