export interface Track {
  id: string;
  title: string;
  artist?: string;
  duration?: number;   // opcional (lo podemos setear cuando cargue metadata)
  driveUrl: string;    // URL pública
  cover?: string;      // se asigna aleatoriamente
}