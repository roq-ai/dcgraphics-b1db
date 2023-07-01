const mapping: Record<string, string> = {
  carousels: 'carousel',
  'contact-forms': 'contact_form',
  galleries: 'gallery',
  organizations: 'organization',
  pages: 'page',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
