import { getTableColumns } from "drizzle-orm";
import { type SQL, sql } from "drizzle-orm";
import type { PgTable } from "drizzle-orm/pg-core";
import type { SQLiteTable } from "drizzle-orm/sqlite-core";

/**
 * Generates the `set` object for the `onConflictDoUpdate` clause in upsert operations.
 *
 * This function excludes specified columns (e.g., primary keys or audit fields)
 * and maps the remaining table columns to `excluded.<column>` for conflict resolution.
 *
 * @param table The table definition from Drizzle ORM.
 * @param excludeColumns An array of columns to exclude from the update.
 * @returns A record mapping column names to `excluded.<column>` SQL references.
 */
export const buildConflictUpdateColumns = <
	T extends PgTable | SQLiteTable,
	Q extends keyof T["_"]["columns"],
>(
	table: T,
	excludeColumns: Q[],
) => {
	const allColumns = getTableColumns(table);
	const columnsToUpdate = Object.keys(allColumns).filter(
		(column) => !excludeColumns.includes(column as Q),
	);
	return columnsToUpdate.reduce(
		(acc, column) => {
			const colName = allColumns[column].name;
			acc[column as Q] = sql.raw(`excluded.${colName}`);
			return acc;
		},
		{} as Record<Q, SQL>,
	);
};
