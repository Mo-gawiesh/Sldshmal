import { siteConfig } from '@/config/site';

export function getStructuredData() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    'url': siteConfig.url,
    'name': siteConfig.name,
    'description': siteConfig.description,
    'publisher': {
      '@id': `${siteConfig.url}/#organization`,
    },
    'inLanguage': 'ar',
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    'name': siteConfig.name,
    'alternateName': siteConfig.alternateName,
    'url': siteConfig.url,
    'logo': {
      '@type': 'ImageObject',
      'url': `${siteConfig.url}/attached_assets/Logo_1_png_1784267438904.png`,
      'caption': siteConfig.name,
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': siteConfig.telephone,
      'contactType': 'sales',
      'email': siteConfig.email,
      'availableLanguage': ['Arabic', 'English'],
    },
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.url}/#localbusiness`,
    'name': siteConfig.name,
    'alternateName': siteConfig.alternateName,
    'description': siteConfig.description,
    'url': siteConfig.url,
    'logo': `${siteConfig.url}/attached_assets/Logo_1_png_1784267438904.png`,
    'image': `${siteConfig.url}${siteConfig.ogImage}`,
    'telephone': siteConfig.telephone,
    'email': siteConfig.email,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': siteConfig.address.streetAddress,
      'addressLocality': siteConfig.address.addressLocality,
      'addressRegion': siteConfig.address.addressRegion,
      'addressCountry': siteConfig.address.addressCountry,
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': siteConfig.geo.latitude,
      'longitude': siteConfig.geo.longitude,
    },
    'hasMap': siteConfig.mapUrl,
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': siteConfig.openingHours.days,
      'opens': siteConfig.openingHours.opens,
      'closes': siteConfig.openingHours.closes,
    },
  };

  return [websiteSchema, organizationSchema, localBusinessSchema];
}
