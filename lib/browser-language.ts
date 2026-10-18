/** Pick the best supported browser language without changing locale-specific URLs. */
export function browserLanguage(header: string | null): 'es' | 'en' {
  if (!header?.trim()) return 'es';
  const choices = header.split(',').map((entry, index) => {
    const [tag, ...parameters] = entry.trim().toLowerCase().split(';');
    const quality = parameters.find(value => value.trim().startsWith('q='));
    const weight = quality ? Number(quality.trim().slice(2)) : 1;
    return { language: tag.split('-')[0], weight, index };
  }).filter(choice => (choice.language === 'es' || choice.language === 'en') && Number.isFinite(choice.weight) && choice.weight > 0 && choice.weight <= 1)
    .sort((a, b) => b.weight - a.weight || a.index - b.index);
  return choices[0]?.language === 'es' ? 'es' : 'en';
}
