export const FIELD_RULES = {
  name:       { label: 'Имя',       min: 2, max: 40 },
  profession: { label: 'Профессия', min: 5, max: 100 },
};

const FORBIDDEN_CHARS_RE = /[0-9!@#$%^&*()]/;   // без export — нужна только внутри файла
const ALLOWED_CHARS_RE  = /^[A-Za-z\s'-]+$/;    // тоже без export

export function validateField(field, value) {
  const { label, min, max } = FIELD_RULES[field];
  const trimmed = value.trim();

  if (!trimmed) return `${label} не может быть пустым`;
  if (FORBIDDEN_CHARS_RE.test(trimmed))
    return `${label}: запрещены цифры и символы !@#$%^&*()`;
  if (!ALLOWED_CHARS_RE.test(trimmed))
    return `${label}: разрешена только латиница`;
  if (trimmed.length < min || trimmed.length > max)
    return `${label}: длина — от ${min} до ${max} символов`;
  return '';
}