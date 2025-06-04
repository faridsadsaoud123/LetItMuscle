using LetItMuscleDomain.Entities;

public class CoursDto
{
  
        public long Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Categorie { get; set; } = string.Empty;
        public long CategorieId { get; set; } // à rajouter
        public long CoachId { get; set; }     // à rajouter
        public string Date { get; set; } = string.Empty;
        public string Heure { get; set; } = string.Empty;
        public int Places { get; set; }
        public string Coach { get; set; } = string.Empty;
        public string Statut { get; set; } = string.Empty;
  

    public static CoursDto FromEntity(Cours cours)
    {
        return new CoursDto
        {
            Id = cours.Id,
            Description = cours.Description,
            Categorie = cours.categorie?.NomCategorie ?? "Inconnue",
            Date = cours.DateCours.ToString("yyyy-MM-dd"),
            Heure = cours.HeureCours.ToString(@"hh\:mm"),
            Places = cours.NbrPlaces,
            Coach = cours.Coach != null ? $"{cours.Coach.prenom} {cours.Coach.nom}" : "Inconnu",
            Statut = cours.Statut

        };
    }

    private static string GetStatut(DateTime dateCours, TimeSpan heureCours, int nbrPlaces)
    {
        if (nbrPlaces == 0)
            return "Annulé";

        var dateHeureCours = dateCours.Date + heureCours;
        var now = DateTime.Now;
        var dureeCours = TimeSpan.FromHours(1); // Ajuste si besoin

        if (now < dateHeureCours)
            return "À Venir";

        if (now >= dateHeureCours && now <= dateHeureCours + dureeCours)
            return "En cours";

        return "Passée";
    }

}