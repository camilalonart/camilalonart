type Translate = (key: string) => string;

export function createInquiryMailto(
  t: Translate,
  subjectKey: string,
  data: Record<string, string>,
  valueLabels: Record<string, Record<string, string>> = {},
) {
  const body = Object.entries(data).map(([field, value]) => {
    const label = t(`sharedContent.fields.${field}`);
    return `${label}: ${valueLabels[field]?.[value] ?? value}`;
  }).join('\n');
  return `mailto:bycamilalonart@gmail.com?subject=${encodeURIComponent(t(subjectKey))}&body=${encodeURIComponent(body)}`;
}
