import type { SQL } from 'drizzle-orm'

import { sql } from 'drizzle-orm'
import type { AnyColumn } from 'drizzle-orm/column'

/**
 * Returns the first item in the array or null if the array is empty.
 *
 * @template T - The type of the items in the array.
 * @param {T[]} values - The array of items.
 * @returns {T | null} - The first item in the array or null if the array is empty.
 */
export function takeFirstOrNull<T>(values: T[]): T | null {
	return values.length > 0 ? values[0] : null
}

/**
 * Returns the first item in the array or throws an error if the array is empty.
 *
 * @template T - The type of the items in the array.
 * @param {T[]} items - The array of items.
 * @returns {T} - The first item in the array.
 * @throws {Error} - Throws an error if the array is empty.
 */
export function takeFirstOrThrow<T>(items: T[]): T {
	const first = takeFirstOrNull(items)

	if (!first) {
		throw new Error('First item not found')
	}

	return first
}

/**
 * Returns a SQL query string that selects distinct values from the specified column.
 *
 * @template Column - The type of the column.
 * @param {Column} column - The column to select distinct values from.
 * @returns {sql<Column["_"]["data"]>} - The SQL query string.
 */
export function distinct<Column extends AnyColumn>(column: Column): SQL<Column['_']['data']> {
	return sql<Column['_']['data']>`distinct(${column})`
}

/**
 * Returns a SQL expression that represents the maximum value of a column.
 *
 * @template Column - The type of the column.
 * @param {Column} column - The column to find the maximum value of.
 * @returns {SQLExpression<Column["_"]["data"]>} - A SQL expression representing the maximum value of the column.
 */
export function max<Column extends AnyColumn>(column: Column): SQL<Column['_']['data']> {
	return sql<Column['_']['data']>`max(${column})`
}

/**
 * Returns a SQL expression that represents the minimum value of a column.
 *
 * @template Column - The type of the column.
 * @param {Column} column - The column to find the minimum value of.
 * @returns {SQLExpression<Column["_"]["data"]>} - A SQL expression representing the minimum value of the column.
 */
export function min<Column extends AnyColumn>(column: Column): SQL<Column['_']['data']> {
	return sql<Column['_']['data']>`min(${column})`
}

/**
 * Returns a SQL expression that counts the number of rows in a column.
 *
 * @param column - The column to count.
 * @returns A SQL expression representing the count of the column.
 */
export function count<Column extends AnyColumn>(column: Column): SQL<number> {
	return sql<number>`cast(count(${column}) as integer)`
}

/**
 * Returns a SQL expression that represents the coalescing of two values.
 * If the first value is not null or undefined, it is returned. Otherwise, the default value is returned.
 *
 * @template T - The type of the value being coalesced.
 * @param {SQL.Aliased<T> | SQL<T>} value - The value to be coalesced.
 * @param {SQL} defaultValue - The default value to be returned if the first value is null or undefined.
 * @returns {SQL<T>} - The SQL expression representing the coalesced value.
 */
export function coalesce<T>(value: SQL.Aliased<T> | SQL<T>, defaultValue: SQL): SQL<T> {
	return sql<T>`coalesce(${value}, ${defaultValue})`
}

/**
 * Returns the current date and time as a SQL string.
 * @param {boolean} [localtime] - Optional parameter to specify whether to return the local time or not. Default is false.
 * @returns {SQL<string>} The current date and time as a SQL string.
 */
export function now(localtime?: boolean): SQL<string> {
	return localtime ? sql<string>`datetime('now', 'localtime')` : sql<string>`datetime('now')`
}


/**
 * Other Utils That Could Be Added
 *
 * Basicaly AI generated, just curious to see what other utils might be commonly used
 *
 * Already supported by Drizzle
 * - `like`: Performs a like comparison on a column.
 * - `ilike`: Performs a case-insensitive like comparison on a column.
 * - `inArray`: Checks if a value is in an array.
 * - `notInArray`: Checks if a value is not in an array.
 * - `exists`: Checks if a subquery returns any rows.
 * - `notExists`: Checks if a subquery returns no rows.
 * - `orderBy`: Orders rows based on a column.
 * - `limit`: Limits the number of rows returned.
 * - `offset`: Skips a specified number of rows.
 * - `groupBy`: Groups rows based on a column.
 *
 * Could be added
 * - `average`: Calculates the average value of a column.
 * - `sum`: Calculates the sum of values in a column.
 * - `case`: Implements a case statement.
 * - `cast`: Casts a value to a different type.
 * - `concat`: Concatenates strings.
 * - `substring`: Extracts a substring from a string.
 * - `length`: Returns the length of a string.
 * - `upper`: Converts a string to uppercase.
 * - `lower`: Converts a string to lowercase.
 * - `trim`: Removes whitespace from the beginning and end of a string.
 * - `replace`: Replaces a substring in a string.
 * - `date`: Extracts the date part from a datetime value.
 * - `time`: Extracts the time part from a datetime value.
 * - `dateAdd`: Adds a specified interval to a date.
 * - `dateSub`: Subtracts a specified interval from a date.
 * - `dateDiff`: Calculates the difference between two dates.
 * - `extract`: Extracts a specific part of a date or time.
 * - `random`: Generates a random number.
 * - `generateUuid`: Generates a UUID.
 * - `jsonBuildObject`: Builds a JSON object from key-value pairs.
 * - `jsonAgg`: Aggregates values into a JSON array.
 * - `jsonExtract`: Extracts a value from a JSON object.
 * - `jsonSet`: Sets a value in a JSON object.
 * - `jsonRemove`: Removes a value from a JSON object.
 * - `jsonContains`: Checks if a JSON object contains a value.
 * - `jsonType`: Returns the type of a JSON value.
 * - `toTsVector`: Creates a tsvector for full-text search.
 * - `toTsQuery`: Creates a tsquery for full-text search.
 * - `match`: Performs a full-text search.
 * - `rank`: Calculates the rank of a row in a result set.
 * - `denseRank`: Calculates the dense rank of a row in a result set.
 * - `rowNumber`: Assigns a unique sequential integer to each row in a result set.
 * - `lag`: Accesses a row at a given offset before the current row.
 * - `lead`: Accesses a row at a given offset after the current row.
 * - `firstValue`: Returns the first value in an ordered set of values.
 * - `lastValue`: Returns the last value in an ordered set of values.
 * - `nthValue`: Returns the nth value in an ordered set of values.
 * - `percentRank`: Calculates the percentile rank of a row in a result set.
 * - `cumeDist`: Calculates the cumulative distribution of a row in a result set.
 * - `ntile`: Divides a result set into a specified number of groups.
 * - `greatest`: Returns the greatest value from a list of values.
 * - `least`: Returns the least value from a list of values.
 * - `abs`: Returns the absolute value of a number.
 * - `ceil`: Returns the smallest integer greater than or equal to a number.
 * - `floor`: Returns the largest integer less than or equal to a number.
 * - `round`: Rounds a number to a specified number of decimal places.
 * - `sign`: Returns the sign of a number.
 * - `power`: Returns the value of a number raised to a power.
 * - `sqrt`: Returns the square root of a number.
 * - `log`: Returns the natural logarithm of a number.
 * - `exp`: Returns the exponential value of a number.
 * - `sin`: Returns the sine of an angle.
 * - `cos`: Returns the cosine of an angle.
 * - `tan`: Returns the tangent of an angle.
 * - `asin`: Returns the arcsine of a number.
 * - `acos`: Returns the arccosine of a number.
 * - `atan`: Returns the arctangent of a number.
 * - `atan2`: Returns the arctangent of two numbers.
 * - `pi`: Returns the value of pi.
 * - `degrees`: Converts radians to degrees.
 * - `radians`: Converts degrees to radians.
 * - `cot`: Returns the cotangent of an angle.
 * - `sec`: Returns the secant of an angle.
 * - `csc`: Returns the cosecant of an angle.
 * - `bitAnd`: Performs a bitwise AND operation.
 * - `bitOr`: Performs a bitwise OR operation.
 * - `bitXor`: Performs a bitwise XOR operation.
 * - `bitNot`: Performs a bitwise NOT operation.
 * - `bitShiftLeft`: Performs a bitwise left shift operation.
 * - `bitShiftRight`: Performs a bitwise right shift operation.
 * - `bitLength`: Returns the length of a bit string.
 * - `octetLength`: Returns the length of a byte string.
 * - `md5`: Returns the MD5 hash of a string.
 * - `sha1`: Returns the SHA1 hash of a string.
 * - `sha256`: Returns the SHA256 hash of a string.
 * - `sha512`: Returns the SHA512 hash of a string.
 * - `uuidGenerateV4`: Generates a UUID v4.
 * - `uuidGenerateV7`: Generates a UUID v7.
 * - `uuidNil`: Returns the nil UUID.
 * - `uuidString`: Returns the string representation of a UUID.
 * - `uuidBytes`: Returns the byte representation of a UUID.
 * - `uuidVersion`: Returns the version of a UUID.
 * - `uuidVariant`: Returns the variant of a UUID.
 * - `uuidTimestamp`: Returns the timestamp of a UUID.
 * - `uuidClockSeq`: Returns the clock sequence of a UUID.
 * - `uuidNode`: Returns the node of a UUID.
 * - `uuidTime`: Returns the time of a UUID.
 * - `uuidTimeLow`: Returns the time low of a UUID.
 * - `uuidTimeMid`: Returns the time mid of a UUID.
 * - `uuidTimeHiAndVersion`: Returns the time hi and version of a UUID.
 * - `uuidClockSeqHiAndReserved`: Returns the clock sequence hi and reserved of a UUID.
 * - `uuidClockSeqLow`: Returns the clock sequence low of a UUID.
 * - `uuidNodeId`: Returns the node id of a UUID.
 * - `uuidNodeId4`: Returns the node id 4 of a UUID.
 * - `uuidNodeId7`: Returns the node id 7 of a UUID.
 *
 */
