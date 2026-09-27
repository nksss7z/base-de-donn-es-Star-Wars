export interface Personnage {
  uid: string;
  name: string;
  url: string;
}

export interface ReponsePersonnages {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
  results: Personnage[];
}