export function slugify(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return `item-${hash.toString(36)}`;
}

export function findBySlug<T extends { title?: string; name?: string }>(items: T[], slug: string) {
  return items.find((item) => slugify(item.title ?? item.name ?? "") === slug);
}
