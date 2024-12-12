import { withQueries } from "./apiHelpers";
import sha1 from "sha1";

/**
 * Builds a partner URL with optional query parameters.
 *
 * @param {string} uri - The base URI for the partner URL.
 * @param {string} [maVoieId] - The MaVoie ID query parameter (optional).
 * @param {string} [email] - The email query parameter (optional).
 * @param {string} [lastName] - The last name query parameter (optional).
 * @param {string} [name] - The name query parameter (optional).
 * @returns {string} The complete partner URL with query parameters.
 */
export const buildPartnerUrl = (
  uri,
  maVoieId = "",
  email = "",
  lastName = "",
  name = ""
) =>
  withQueries({
    maVoieId,
    email,
    lastName,
    name,
  })(uri);

/* Generate the User Partner Id */
export const generateMaVoieId = (maVoieUserId, partnerId) =>
  sha1(maVoieUserId + partnerId);
