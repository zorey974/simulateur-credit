'use client'; // Permet d'exécuter ce composant côté client

import { useState } from 'react';
import { Button, Input, Label } from '@/components/ui';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"

export default function SimulateurCredit() {
  const [montant, setMontant] = useState('');
  const [taux, setTaux] = useState('');
  const [duree, setDuree] = useState('');
  const [mensualite, setMensualite] = useState(null);

  const calculerMensualite = () => {
    const capital = parseFloat(montant);
    const tauxMensuel = parseFloat(taux) / 100 / 12;
    const nombreMois = parseInt(duree) * 12;

    // Vérifier si les données sont valides
    if (isNaN(capital) || isNaN(tauxMensuel) || isNaN(nombreMois) || nombreMois === 0) {
      alert("Veuillez entrer des valeurs valides.");
      return;
    }

    if (tauxMensuel === 0) {
      // Cas spécial sans intérêt
      setMensualite(capital / nombreMois);
    } else {
      const mensualiteCalc =
        (capital * tauxMensuel) / (1 - Math.pow(1 + tauxMensuel, -nombreMois));
      setMensualite(mensualiteCalc);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">Simulateur de Crédit Immobilier</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Montant du prêt (en €)</Label>
              <Input
                type="number"
                value={montant}
                onChange={(e) => setMontant(e.target.value)}
                placeholder="Ex : 200000"
              />
            </div>
            <div>
              <Label>Taux d'intérêt annuel (en %)</Label>
              <Input
                type="number"
                value={taux}
                onChange={(e) => setTaux(e.target.value)}
                placeholder="Ex : 1.5"
              />
            </div>
            <div>
              <Label>Durée du prêt (en années)</Label>
              <Input
                type="number"
                value={duree}
                onChange={(e) => setDuree(e.target.value)}
                placeholder="Ex : 25"
              />
            </div>
            <div className="text-center">
              <Button onClick={calculerMensualite}>Calculer Mensualité</Button>
            </div>

            {mensualite && (
              <div className="mt-4 p-4 bg-green-100 rounded text-center">
                <h3 className="text-lg font-bold">Mensualité : {mensualite.toFixed(2)} €</h3>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
