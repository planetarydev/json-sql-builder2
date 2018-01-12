'use strict';

// give the new Class the name of the Helper or Operator
class left extends SQLBuilder.SQLHelper {
	constructor(sql){
		// always call the construtor of SQLHelper
		super(sql);

		// declare the possible types that can be used
		this.Types({
			Object: { syntax: this.Syntax('LEFT(<$str>, <$len>)', SQLBuilder.CALLEE) },
		});

		// define or register each Operator or Helper defined in the Syntax
		this.$str = new SQLBuilder.SQLPredefined.StringValueParam(sql);
		this.$len = new SQLBuilder.SQLPredefined.NumberValueParam(sql);
	}
}

// export the new $left Helper
module.exports = {
	// exports the class-definition (this is used by SQLBuilder to setup the new Helper)
	definition: left,

	// add some description for the auto-generation of the docs README.MD
	description: `Specifies the \`LEFT\` function.`,

	// define the SQL-dialects that support this new Helper
	// Each dialect listed by supported by can use this Helper. If you pass a string
	// that starts with 'http://' or 'https://' inside the docs it automatically creates a link
	// to the official docs
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/string-functions.html#function_left',
		MariaDB: 'https://mariadb.com/kb/en/library/left/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.1/static/functions-string.html',
		// SQLite did not support the left() function at this time
		// Oracle did not support the left() function at this time
		// instead we can use SUBSTR( string, start_position [, length ] ) defined as new SQLHelper
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/functions/left-transact-sql'
	},

	// Always add at least "Basic Usage" as test and example for each type you
	// have declared by the new class using this.Types()
	examples: {
		Object: {
			// Basic Usage is the Name of the Test and must always declared as function(sql)
			// where sql is the instance of the SQLBuilder
			"Basic Usage": function(sql) {
				// the function always returns an Object {test: function() {}, expectedResults: {} [, supportedBy: { PostgreSQL: true, MySQL: true, ... }] }
				return {
					// write your test and return always the result
					test: function(){
						return sql.$select({
							test: { $left: { $str: 'Hello World', $len: 5 } }
						});
					},
					// define the expected results of the test as Object with
					// sql as String and values as Object. If there are no values generated, so define an empty Object values: {}
					expectedResults: {
						sql: 'SELECT LEFT($1, $2) AS test',
						values: {
							$1: 'Hello World',
							$2: 5
						}
					}
				}
			},
			// Optionally add some more Tests and Examples with a different name:
			"Usage of LEFT as Function": function(sql) {
				return {
					test: function(){
						return sql.$select({
							// The helper can directly used as native js-function because
							// we setup the Syntax for Type "Object" with SQLBuilder.CALLEE parameter as second (see above)
							test: sql.left('Hello World', 5)
						});
					},
					expectedResults: {
						sql: 'SELECT LEFT($1, $2) AS test',
						values:{
							$1: 'Hello World',
							$2: 5
						}
					}
				}
			}
		}
	}
}
