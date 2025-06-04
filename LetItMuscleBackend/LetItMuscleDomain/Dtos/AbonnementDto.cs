    using LetItMuscleDomain.Entities;

    namespace LetItMuscleDomain.Dtos;

    public class AbonnementDto
    {
        public long Id { get; set; }
        public string NomAbonnement { get; set; }
        public double Tarif { get; set; }
        public string Duree { get; set; }
        public int NbrAdherent { get; set; }
        public string StatusAbonnement { get; set; }
        public long CreateurId { get; set; }
        public string OptionsAbonnement { get; set; }


        public AbonnementDto ToDto(Abonnement abonnement)
        {
            Id = abonnement.Id;
            NomAbonnement = abonnement.NomAbonnement;
            Tarif = abonnement.tarif;
            Duree = abonnement.duree;
            NbrAdherent = abonnement.nbrAdherent;
            StatusAbonnement = abonnement.StatusAbonnement;
            CreateurId = abonnement.CreateurId;
            OptionsAbonnement = abonnement.OptionsAbonnement;
            return this;
        }

        public Abonnement ToEntity()
        {
            return new Abonnement
            {
                Id = this.Id,
                NomAbonnement = this.NomAbonnement,
                tarif = this.Tarif,
                duree = this.Duree,
                nbrAdherent = this.NbrAdherent,
                StatusAbonnement = this.StatusAbonnement,
                CreateurId = this.CreateurId,
                OptionsAbonnement = this.OptionsAbonnement
            };
        }
    }