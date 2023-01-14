/**
 * Enum for content values.
 * @readonly
 * @enum {string}
 */
export const contentTypes = {
	_30daysofappwrite: '30daysofappwrite',
	appwrite101: 'appwrite-101',
	guides: 'guides'
};

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
 * @property {User[]=} authors
 */

/**
 * @typedef {Object} User
 * @property {string=} name
 * @property {string=} username
 * @property {string=} twitter_username
 * @property {string=} github_username
 * @property {string=} website_url
 * @property {string=} profile_image
 */
