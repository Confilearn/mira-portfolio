/**
 * The DOM contract between the Services tab list, its scrolling image column
 * and the scroll sync that ties them together — kept out of the components so
 * the three agree on one set of names.
 */

/** Selector the scroll sync watches; one element per category, in list order. */
export const SERVICES_IMAGE_SELECTOR = '[data-services-scroll-image]'

/** DOM id each tab links to, so a category is directly addressable in-page. */
export function servicesImageId(serviceId: string) {
  return `services-image-${serviceId}`
}
