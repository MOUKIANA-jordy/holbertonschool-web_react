// Retourne l'année courante
export function getCurrentYear() {
  return new Date().getFullYear();
}

// Retourne le texte du footer selon isIndex
export function getFooterCopy(isIndex) {
  if (isIndex) {
    return "Holberton School";
  }
  return "Holberton School main dashboard";
}
