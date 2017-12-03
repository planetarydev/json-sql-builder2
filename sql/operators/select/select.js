'use strict';

// Require all private Helpers
const from 		= require('./private/from');
const columns 	= require('./private/columns');
const where 	= require('./private/where');
const limit 	= require('./private/limit');

const SYNTAX_SELECT =
	`SELECT	{ TOP [$top]}-->(MSSQLServer)	{ DISTINCT[$distinct]}	{ SQL_CALC_FOUND_ROWS[$calcFoundRows]}-->(MySQL)	{ <$columns>}	{ INTO [$into]}-->(MySQL,MSSQLServer)
		{ FROM [$from]}
		{ [$joins]}
		{ WHERE [$where]}
		{ GROUP BY [$groupBy]} { WITH ROLLUP[$rollup]}-->(MySQL)
		{ HAVING [$having]}
		{ ORDER BY [$sort] | [$orderBy]}
		{ LIMIT [$limit]}-->(MariaDB,MySQL,PostgreSQL,SQLite)
		{ OFFSET [$offset]}-->(MariaDB,MySQL,PostgreSQL,SQLite)
		{ INTO OUTFILE [$outfile]}-->(MySQL)
		{ INTO DUMPFILE [$dumpfile]}-->(MySQL)`;

// Define select Operator
class select extends SQLBuilder.SQLOperator {
	constructor(sql){
		super(sql);

		this.Types({
			Object: {
				syntax: this.Syntax(SYNTAX_SELECT, SQLBuilder.CALLEE)
			}
		});

		// Add private ANSI helpers
		this.$from = new from.definition(sql);
		this.$columns = new columns.definition(sql);
		this.$where = new where.definition(sql);

		// Add specific Helpers depending on the current SQL-Language dialect
		if (sql.isPostgreSQL() || sql.isMySQL() || sql.isMariaDB() || sql.isSQLite()) {
			this.$limit = new limit.definition(sql);
		}
	}

	preBuild(query, identifier) {
		if (!query.$columns){
			// add a shortcut for $columns
			// so that all properties declared directly in $select object
			// that are no operators or helpers will become a column!
			query.$columns = {};
			this.forEach(query, (value, key) => {
				// skip all operators and helpers
				if (this.isIdentifier(key)) {
					query.$columns[key] = value;
					delete query[key];
				}
			});
			// if there is no column, we add '*' for ALL --> SELECT * FROM ...
			if (Object.keys(query.$columns).length == 0) {
				query.$columns['*'] = true;
			}
		}

		return query;
	}

	postBuild(result, type, itemType){
		// check for a subquery and use round bracket on sub-selects
		if (this.isCurrent('$select')) {
			result = '(' + result + ')';
		}
		return result;
	}
}

module.exports = {
	definition: select,
 	description: 'Specifies the Operator for the `SELECT` Statement.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/select.html',
		MariaDB: 'https://mariadb.com/kb/en/library/select/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/sql-select.html',
		SQLite: 'https://sqlite.org/lang_select.html',
		Oracle: 'https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10002.htm',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql'
	},
	examples: {
		Object: {
			'Basic Usage': function(sql) {
				return {
					test: function() {
						return sql.build({
							$select: {
								$from: 'people'
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people',
						values: {}
					}
				}
			},
			'Basic Usage as Operator-Function': function(sql) {
				return {
					test: function() {
						return sql.$select({
							$from: 'people',
							$where: {
								last_name: 'Doe'
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people WHERE last_name = $1',
						values: {
							$1: 'Doe'
						}
					}
				}
			},
			'Basic Usage as Function': function(sql) {
				return {
					test: function() {
						let peopleLikes = sql.select({ total_likes: sql.count('*') }, {
							$from: 'people_likes',
							$where: {
								'people_likes.people_id': { $eq: '~~people.people_id' }
							}
						});

						return sql.$select({
							first_name: 1,
							last_name: 1,
							total_likes: peopleLikes,
							$from: 'people'
						});
					},
					expectedResults: {
						sql: 'SELECT first_name, last_name, (SELECT COUNT(*) AS total_likes FROM people_likes WHERE people_likes.people_id = people.people_id) AS total_likes FROM people',
						values: {}
					}
				}
			},
			'Basic Usage as inline-Function': function(sql) {
				return {
					test: function() {
						return sql.$select({
							first_name: 1,
							last_name: 1,
							total_likes: sql.select({ total_likes: { $count: '*' } }, {
								$from: 'people_likes',
								$where: {
									'people_likes.people_id': '~~people.people_id'
								}
							}),
							$from: 'people'
						});
					},
					expectedResults: {
						sql: 'SELECT first_name, last_name, (SELECT COUNT(*) AS total_likes FROM people_likes WHERE people_likes.people_id = people.people_id) AS total_likes FROM people',
						values: {}
					}
				}
			}
		}
	}
}
