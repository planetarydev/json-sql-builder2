'use strict';

class query extends SQLBuilder.SQLOperator {
	constructor(sql){
		super(sql);

		this.Types({
			Object: {
				syntax: this.Syntax('<value>')
			}
		});
	}
}

module.exports = {
	definition: query,
 	description: 'Specifies the `$query` part of the Common Table Expression (CTE).',
	supportedBy: {
		MariaDB: 'https://mariadb.com/kb/en/library/with/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/queries-with.html',
		SQLite: 'https://sqlite.org/syntax/with-clause.html',
		Oracle: 'https://docs.oracle.com/database/121/SQLRF/statements_10002.htm#SQLRF01702',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/queries/with-common-table-expression-transact-sql'
	},
	examples: {
		Object: {
			"Basic Usage": function(sql) {
				return {
					test: function(){
						return sql.$with({
							$recursive: true,
							$cte: {
								t: {
									$columns: {
										n: true
									},
									$union: {
										$all: [
											{
												$select: {
													1: 'n'
												}
											}, {
												$select: {
													n: { $add: ['n', 1] },
													$from: 't'
												}
											}
										]
									}
								}
							},
							$query: {
								$select: {
									n: true,
									$from: 't',
									$limit: 10
								}
							}
						});
					},
					expectedResults: {
						sql: 'WITH RECURSIVE t(n) AS (((SELECT 1 AS n) UNION ALL (SELECT n + $1 AS n FROM t))) SELECT n FROM t LIMIT $2',
						values:{
							$1: 1,
							$2: 10
						}
					}
				}
			}
		}
	}
}
