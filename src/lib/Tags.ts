const TAGS_REGEXP = /(?<=(^|\s))#[^#\s]+/g;

export const fetch = (text: string): Array<string> => 
  (text.match(TAGS_REGEXP) || []).map(s => s.replace('#', ''));

export const replace = (text: string, func: Function): string => 
  text.replace(TAGS_REGEXP, s => func(s.replace('#', '')));
