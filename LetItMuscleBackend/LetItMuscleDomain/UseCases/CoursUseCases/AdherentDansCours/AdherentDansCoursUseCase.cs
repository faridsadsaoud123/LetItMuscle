﻿using LetItMuscleDomain.DataAdapters.Repository;

using LetItMuscleDomain.Entities;

using LetItMuscleDomain.Exceptions;




namespace LetItMuscleDomain.UseCases.CoursUseCases;




public class AdherentDansCoursUseCase(IRepositoryFactory repositoryFactory)

{

    public async Task<Cours> ExecuteAsync(Cours cours, Utilisateur adherent)

    {

        ArgumentNullException.ThrowIfNull(cours);




        ArgumentNullException.ThrowIfNull(adherent);

        return await ExecuteAsync(cours.Id,adherent.Id);

    }




    public async Task<Cours> ExecuteAsync(long coursId, long adherentId)

    {

        await CheckBusinessRules(coursId, adherentId);

        return await repositoryFactory.CoursRepository().AddAdherentAsync(coursId, adherentId);




    }




    // Rajout de plusieurs adherens dans un cours collectif

    public async Task<Cours> ExecuteAsync(Cours cours, List<Utilisateur> adherents)

    {

        ArgumentNullException.ThrowIfNull(cours);

        ArgumentNullException.ThrowIfNull(adherents);

        var utilsateurIds = adherents.Select(a => a.Id).ToArray();

        return await ExecuteAsync(cours.Id, utilsateurIds);

    }




    private async Task<Cours> ExecuteAsync(long coursId, long[] utilsateurIds)

    {

        foreach (var utilsateurId in utilsateurIds)

        {

            await CheckBusinessRules(coursId, utilsateurId);

        }

        return await repositoryFactory.CoursRepository().AddAdherentAsync(coursId, utilsateurIds);

    }




    public async Task CheckBusinessRules(long coursId, long adherentId)

    {

        ArgumentNullException.ThrowIfNull(coursId);

        ArgumentNullException.ThrowIfNull(adherentId);

        Utilisateur adherent = (await repositoryFactory.UtilisateurRepository().FindAsync(adherentId))!;

        if (adherent == null)

        {

            throw new AdherentNotFoundException(adherent.nom+" not found");

        }





        List<Cours> cours = (await repositoryFactory.CoursRepository().FindByConditionAsync(c=>coursId.Equals(c.Id)))!;

        if(cours.Count == 0)

        {

            throw new CoursNotFoundException(coursId+"not found");

        }




        if (cours.First().adherentsInscrits.Contains(adherent))

        {

            throw new DuplicateReservationException(adherent.nom+"a deja reservé");

        }

    }










}