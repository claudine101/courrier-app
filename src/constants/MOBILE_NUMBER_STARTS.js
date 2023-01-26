/**
 * Tableau contenant les deux chiffres commerçant un numéro ECONET
 *  @type {string[]}
 * @author <darcy@mediabox.bi>
 */
const ECONET_PHONE_NUMBER_STARTS = ["79", "71", "76", "72"]
/**
 * Tableau contenant les deux chiffres commerçant un numéro LUMITEL
 *  @type {string[]}
 * @author <darcy@mediabox.bi>
 */
const LUMITEL_PHONE_NUMBER_STARTS = ["69", "61", "68", "67", "62", "65"]
/**
 * Tableau contenant les deux chiffres commerçant un numéro ONAMOB
 *  @type {string[]}
 * @author <darcy@mediabox.bi>
 */
const ONAMOB_PHONE_NUMBER_STARTS = ["77"]
/**
 * Tableau contenant les deux chiffres commerçant un numéro burundais
 *  @type {string[]}
 * @author <darcy@mediabox.bi>
 */
const VALID_PHONE_NUMBER_STARTS = [...ECONET_PHONE_NUMBER_STARTS, ...LUMITEL_PHONE_NUMBER_STARTS, ...ONAMOB_PHONE_NUMBER_STARTS]

module.exports = {
          ECONET_PHONE_NUMBER_STARTS,
          LUMITEL_PHONE_NUMBER_STARTS,
          ONAMOB_PHONE_NUMBER_STARTS,
          VALID_PHONE_NUMBER_STARTS
}