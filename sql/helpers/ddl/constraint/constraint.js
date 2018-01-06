'use strict';

const SYNTAX = `
CONSTRAINT <key-ident> ` /*keep note of the space after <key-ident>*/ + `
	{* PRIMARY KEY [$primary] *}
	{* UNIQUE [$unique] *}
	{ FOREIGN KEY [$foreignKey] }
	{ CHECK [$check] }
	{ ([$columns])}
	[$references]
`;

class constraint extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Object: { syntax: this.Syntax(SYNTAX, SQLBuilder.CALLEE) },
			Function: { syntax: this.Syntax(`CONSTRAINT <key-ident> <value>`) }
		});
	}
}

module.exports = {
	definition: constraint,
 	description: 'Specifies a single Column-Definition to use on `$define` with `$createTable` Operator.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/constraints.html',
		MariaDB: 'https://mariadb.com/kb/en/library/constraint/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/ddl-constraints.html',
		SQLite: 'https://sqlite.org/lang_createtable.html#constraints',
		Oracle: 'https://docs.oracle.com/cd/B28359_01/server.111/b28286/clauses002.htm#SQLRF52163',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/statements/alter-table-table-constraint-transact-sql'
	},
	examples: {
		Object: {
			"Basic Usage": function(sql) {
				return {
					test: function(){
						return sql.$createTable({
							$temp: true,
							$table: 'my_temp_people_table',
							$define: {
								people_id: { $column: { $type: 'INT', $default: 0 } },
								first_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
								last_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
								bio: { $column: { $type: 'TEXT' } },

								pk_people: { $constraint: { $primary: true, $columns: 'people_id' } }
							}
						});
					},
					expectedResults: {
						sql: 'CREATE TEMPORARY TABLE my_temp_people_table (people_id INT DEFAULT 0, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, bio TEXT, CONSTRAINT pk_people PRIMARY KEY (people_id))',
						values: {}
					}
				}
			}
		},
		Function: {
			"Basic Usage": function(sql) {
				return {
					test: function(){
						return sql.$createTable({
							$table: 'my_people_table',
							$define: {
								people_id: { $column: { $type: 'INT', $default: 0 } },
								first_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
								last_name: { $column: { $type: 'VARCHAR', $size: 50, $notNull: true } },
								bio: { $column: { $type: 'TEXT' } },

								pk_people: { $constraint: sql.primary('people_id') },
								uk_people: { $constraint: sql.unique(['first_name', 'last_name']) }
							}
						});
					},
					expectedResults: {
						sql: 'CREATE TABLE my_people_table (people_id INT DEFAULT 0, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, bio TEXT, CONSTRAINT pk_people PRIMARY KEY (people_id), CONSTRAINT uk_people UNIQUE (first_name, last_name))',
						values: {}
					}
				}
			}
		}
	}
}
