import React, { useState, useEffect } from 'react';
import { Button } from '../../../../components/ui/Button';
import { Input } from '../../../../components/ui/Input';
import { Label } from '../../../../components/ui/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../components/ui/select';
import { Checkbox } from '../../../../components/ui/checkbox';
import { Modal } from '../../../../components/ui/Modal';
import { z, ZodFormattedError } from 'zod';
import { useCreateAbonnement } from '../hooks/useCreateAbonnement';

// Options disponibles
const availableOptions = [
  'Accès illimité',
  'Coaching personnalisé',
  'Réductions boutique',
  'Programmes nutritionnels',
  'Suivi de performance',
  'Accès aux équipements',
];

// Schéma de validation Zod
const abonnementSchema = z.object({
  nomAbonnement: z.string().min(1, 'Le nom est requis'),
  tarif: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: 'Le tarif est requis',
        invalid_type_error: 'Le tarif doit être un nombre',
      })
      .positive('Le tarif doit être supérieur à 0')
  ),
  duree: z.string().min(1, 'La durée est requise'),
  statusAbonnement: z.enum(['Actif', 'Inactif']),
  optionsAbonnement: z.array(z.string()).optional(),
});

// Types
type SubscriptionFormData = z.infer<typeof abonnementSchema>;

interface SubscriptionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
  initialData?: Partial<SubscriptionFormData>;
  isEditing?: boolean;
}

export const AbonnementForm: React.FC<SubscriptionFormProps> = ({
  isOpen,
  onClose,
  onRefresh,
  initialData,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<SubscriptionFormData>({
    nomAbonnement: initialData?.nomAbonnement || '',
    tarif: typeof initialData?.tarif === 'number' ? initialData.tarif : 0,
    duree: initialData?.duree || '',
    statusAbonnement: initialData?.statusAbonnement || 'Actif',
    optionsAbonnement: initialData?.optionsAbonnement || [],
  });

  const [errors, setErrors] = useState<ZodFormattedError<SubscriptionFormData> | null>(null);
  const createMutation = useCreateAbonnement();

  // Reset le formulaire à l’ouverture
  useEffect(() => {
    if (isOpen && !isEditing) {
      setFormData({
        nomAbonnement: '',
        tarif: 0,
        duree: '',
        statusAbonnement: 'Actif',
        optionsAbonnement: [],
      });
      setErrors(null);
    }
  }, [isOpen, isEditing]);

  const toggleOption = (option: string) => {
    setFormData((prev) => ({
      ...prev,
      optionsAbonnement: prev.optionsAbonnement?.includes(option)
        ? prev.optionsAbonnement.filter((o) => o !== option)
        : [...(prev.optionsAbonnement || []), option],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = abonnementSchema.safeParse(formData);
    if (!parsed.success) {
      setErrors(parsed.error.format());
      return;
    }

    const payload = {
      nomAbonnement: formData.nomAbonnement.trim(),
      tarif: Number(formData.tarif),
      duree: formData.duree.trim(),
      nbrAdherent: 0,
      statusAbonnement: formData.statusAbonnement,
      createurId: 1,
      optionsAbonnement: formData.optionsAbonnement?.join(', ') || '',
    };

    createMutation.mutate(payload, {
      onSuccess: () => {
        alert('✅ Abonnement créé avec succès !');
        onRefresh();
        onClose();
      },
      onError: (err: any) => {
        alert('❌ Erreur lors de la création : ' + err.message);
      },
    });
  };

  const handleClose = () => {
    setFormData({
      nomAbonnement: '',
      tarif: 0,
      duree: '',
      statusAbonnement: 'Actif',
      optionsAbonnement: [],
    });
    setErrors(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? "Modifier l'abonnement" : 'Ajouter un abonnement'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nom */}
        <div className="space-y-2">
          <Label htmlFor="nomAbonnement">Nom de l'abonnement</Label>
          <Input
            id="nomAbonnement"
            value={formData.nomAbonnement}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, nomAbonnement: e.target.value }))
            }
            placeholder="Ex: Abonnement Premium"
            className={errors?.nomAbonnement ? 'border-destructive' : ''}
          />
          {errors?.nomAbonnement && (
            <p className="text-sm text-destructive">{errors.nomAbonnement._errors[0]}</p>
          )}
        </div>

        {/* Tarif & Durée */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tarif">Tarif (€)</Label>
            <Input
              id="tarif"
              type="number"
              min="0"
              step="0.01"
              value={formData.tarif}
              onChange={(e) =>
  setFormData((prev) => ({ ...prev, tarif: Number(e.target.value) }))
}
              placeholder="49.99"
              className={errors?.tarif ? 'border-destructive' : ''}
            />
            {errors?.tarif && (
              <p className="text-sm text-destructive">{errors.tarif._errors[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="duree">Durée</Label>
            <Input
              id="duree"
              value={formData.duree}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, duree: e.target.value }))
              }
              placeholder="Ex: 1 mois"
              className={errors?.duree ? 'border-destructive' : ''}
            />
            {errors?.duree && (
              <p className="text-sm text-destructive">{errors.duree._errors[0]}</p>
            )}
          </div>
        </div>

        {/* Statut */}
        <div className="space-y-2">
          <Label>Statut</Label>
          <Select
            value={formData.statusAbonnement}
            onValueChange={(value: 'Actif' | 'Inactif') =>
              setFormData((prev) => ({ ...prev, statusAbonnement: value }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Actif">Actif</SelectItem>
              <SelectItem value="Inactif">Inactif</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <Label>Options incluses</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availableOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={option}
                  checked={formData.optionsAbonnement?.includes(option)}
                  onCheckedChange={() => toggleOption(option)}
                />
                <Label htmlFor={option} className="text-sm cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-4 border-t border-border">
          <Button type="button" variant="ghost" onClick={handleClose}>
            Annuler
          </Button>
          <Button type="submit" variant="hero" className="min-w-32">
            {isEditing ? 'Modifier' : 'Ajouter'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AbonnementForm;
