/** Client logos, trimmed copies live in public/clients. ratio = width / height. */
export interface Client {
  name: string;
  file: string;
  ratio: number;
}

const c = (name: string, file: string, w: number, h: number): Client => ({
  name,
  file: `/clients/${file}.png`,
  ratio: w / h,
});

export const clients: Client[] = [
  c("Pharco Pharmaceuticals", "pharco-pharmaceuticals", 520, 252),
  c("Abbott", "abbott", 520, 130),
  c("Boehringer Ingelheim", "boehringer-ingelheim", 520, 157),
  c("Novo Nordisk", "novo-nordisk", 520, 371),
  c("Nestle", "nestle", 438, 436),
  c("AbbVie", "abbvie", 520, 90),
  c("APEX Pharma", "apex-pharma", 520, 147),
  c("SPC Sudair Pharma", "spc-sudair-pharma", 520, 276),
  c("Sandoz", "sandoz", 520, 75),
  c("Johnson & Johnson", "johnson-and-johnson", 520, 86),
  c("BD", "bd", 520, 196),
  c("Amgen", "amgen", 520, 133),
  c("Liptis Pharmaceuticals", "liptis-pharmaceuticals", 520, 146),
  c("Alcon", "alcon", 520, 77),
  c("Sanofi Genzyme", "sanofi-genzyme", 520, 62),
  c("Spimaco Oncology", "spimaco-oncology", 520, 240),
  c("Novalac", "novalac", 520, 124),
  c("Novartis", "novartis", 520, 91),
  c("Novartis Oncology", "novartis-oncology", 520, 155),
  c("AstraZeneca", "astrazeneca", 520, 132),
  c("Amriya Pharmaceuticals", "amriya-pharmaceuticals", 520, 172),
  c("Paxal Pharmaceutical", "paxal-pharmaceutical", 520, 330),
];
