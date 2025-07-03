const BASE_URL = 'https://restcountries.com/v3.1';

export async function obtenirTousPays() {
  const response = await fetch(`${BASE_URL}/all`);
  if (!response.ok) throw new Error('Failed to fetch');
  return await response.json();
}

export async function obtenirPaysParNom(nom) {
  const response = await fetch(`${BASE_URL}/name/${nom}`);
  if (!response.ok) throw new Error('NON_TROUVE');
  return await response.json();
}

export async function obtenirPaysParCode(code) {
  const response = await fetch(`${BASE_URL}/alpha/${code}`);
  if (!response.ok) throw new Error('Pays non trouvé');
  const data = await response.json();
  return data[0];
}