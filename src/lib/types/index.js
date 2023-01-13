/**
 * @typedef {Object} Post
 * @property {string} slug
 * @property {string} title
 * @property {string} description
 * @property {number} weight
 * @property {string} cover_image
 * @property {string} published_at
 * @property {string} updated_at
 * @property {string} user
 * @property {string=} youtube
 * @property {ConstructorOfATypedSvelteComponent=} body
 */

/**
 * Enum for content values.
 * @readonly
 * @enum {string}
 */
export const contentTypes = {
	_30daysofappwrite: '30daysofappwrite',
	appwrite101: 'appwrite-101'
};
