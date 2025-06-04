using System;

namespace LetItMuscleDomain.Entities;

public class Cours
{

    public long Id { get; set; }
    public string Description { get; set; } = string.Empty;
    public DateTime DateCours { get; set; }
    public int NbrPlaces { get; set; }
    public TimeSpan HeureCours { get; set; }
    public Categorie categorie { get; set; }
    public long categoryId { get; set; }
    public List<Utilisateur> adherentsInscrits { get; set; } = new List<Utilisateur>();
    public Utilisateur Coach { get; set; }
    public long coachId { get; set; }

    public string Statut { get; set; } = "";

}