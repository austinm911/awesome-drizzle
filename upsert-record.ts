import type { IndexColumn, PgInsertValue, PgTable } from "drizzle-orm/pg-core";
import { buildConflictUpdateColumns } from "./build-conflict-update-columns";

/**
 * Performs an upsert operation on a database table using Drizzle ORM.
 *
 * This function inserts a record or updates it if a conflict occurs on specified columns.
 *
 * @template T The Postgres table type
 * @template I Optional generic type for additional type inference
 *
 * @param db Database connection or client
 * @param table The target database table
 * @param data The record data to insert or update
 * @param conflictColumns Column(s) to check for conflicts
 * @param excludeColumns Optional columns to exclude from update (default: empty array)
 *
 * @returns The inserted or updated record(s)
 */
export async function upsertRecord<T extends PgTable, I>(
	db: Db, // typed db client
	table: T,
	data: PgInsertValue<T>,
	conflictColumns: IndexColumn | IndexColumn[],
	excludeColumns: (keyof T["_"]["columns"])[] = [],
) {
	return db
		.insert(table)
		.values(data)
		.onConflictDoUpdate({
			target: conflictColumns,
			set: buildConflictUpdateColumns(table, excludeColumns),
		})
		.returning();
}
