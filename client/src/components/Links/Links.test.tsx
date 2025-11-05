import { usefulLinks, UsefulLink } from './usefulLinks';

describe('usefulLinks data', () => {
  it('should be a non-empty array', () => {
    expect(Array.isArray(usefulLinks)).toBe(true);
    expect(usefulLinks.length).toBeGreaterThan(0);
  });

  it('each item should have required fields', () => {
    usefulLinks.forEach((link) => {
      expect(link).toHaveProperty('title');
      expect(link).toHaveProperty('url');
      expect(link).toHaveProperty('icon');
      expect(link).toHaveProperty('category');
    });
  });

  it('each category should be valid', () => {
    const validCategories: UsefulLink['category'][] = [
      'docs',
      'practice',
      'courses',
      'community',
    ];

    usefulLinks.forEach((link) => {
      expect(validCategories).toContain(link.category);
    });
  });

  it('each URL should start with https://', () => {
    usefulLinks.forEach((link) => {
      expect(link.url.startsWith('https://')).toBe(true);
    });
  });
});
