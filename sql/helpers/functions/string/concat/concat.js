'use strict';

// CONCAT(mycol, 'foo')
// CONCAT(mycol1, mycol2, 'foo')

class concat extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Array: { syntax: this.Syntax('CONCAT(<value-param>[ , ... ])') },
		});
	}

	callee(...args){
		let argResults = [],
			maxArgs = args.length;
		this.forEach(args, (arg, index) => {
			// the last arg is alway the identifier injected by the builder itself
			// so we check and skip it
			if (index + 1 == maxArgs) return;

			if (this.isPrimitive(arg)) {
				argResults.push(this.addValue(arg));
			}
		});
		return 'CONCAT(' + argResults.join(', ') + ')';
	}
}

module.exports = {
	definition: concat,
	description: `Specifies the \`CONCAT\` function.`,
	supportedBy: {
		MySQL: '',
		MariaDB: '',
		PostgreSQL: '',
		SQLite: '',
		Oracle: '',
		SQLServer: ''
	},
	examples: {
		Array: {
			"Basic Usage": function(sql) {
				return {
					test: function(){
						return sql.$select({
							people_name: { $concat: ['~~first_name', ' ', '~~last_name'] },
							$from: 'people'
						});
					},
					expectedResults: {
						sql: 'SELECT CONCAT(first_name, $1, last_name) AS people_name FROM people',
						values:{
							$1: ' ',
						}
					}
				}
			},
			"Usage of CONCAT as Function": function(sql) {
				return {
					test: function(){
						return sql.$select({
							people_name: sql.concat('~~first_name', ' ', '~~last_name'),
							$from: 'people'
						});
					},
					expectedResults: {
						sql: 'SELECT CONCAT(first_name, $1, last_name) AS people_name FROM people',
						values:{
							$1: ' ',
						}
					}
				}
			},
			"Usage with INLINE-SQL": function(sql) {
				return {
					test: function(){
						return sql.$select({
							people_name: { $concat: ["__:COALESCE(first_name, '')", ' ', '~~last_name'] },
							$from: 'people'
						});
					},
					expectedResults: {
						sql: 'SELECT CONCAT(COALESCE(first_name, \'\'), $1, last_name) AS people_name FROM people',
						values:{
							$1: ' ',
						}
					}
				}
			}
		}
	}
}
