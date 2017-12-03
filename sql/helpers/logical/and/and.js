'use strict';

class and extends SQLBuilder.SQLHelper {
	constructor(builderInstance){
		super(builderInstance);

		this.Types({
			Array: {
				eachItemOf: {
					String: { syntax: this.Syntax('<value>[  AND ... ]') },
					Object: { syntax: this.Syntax('<key-ident> <value>[  AND ... ]') },
					Function: { syntax: this.Syntax('<value>[  AND ... ]') }
				}
			}
		});
	}

	preBuild(query) {
		// query is always an Array
		this.forEach(query, (obj)=>{
			if(this.isPlainObject(obj)) {
				this.forEach(obj, (value, key) => {
					// check for Primitiv value
					// like : { first_name: 'Jane' } or { age: 18 }
					// this will be a shortcut for
					// { first_name: { $eq: 'Jane' } } or { age: { $eq: 18 } }
					if (this.isPrimitive(value)) {
						obj[key] = { $eq: value };
					}
				});
			}
		});

		return query;
	}
}

module.exports = {
	definition: and,
	description: 'Specifies the logical `AND` Operator as Helper.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/logical-operators.html#operator_and',
		MariaDB: 'https://mariadb.com/kb/en/library/and/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/functions-comparison.html',
		SQLite: 'https://sqlite.org/lang_expr.html',
		Oracle: '',
		SQLServer: ''
	},
	examples: {
		Array: {
			eachItemOf: {
				Object: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.build({
									$select: {
										$from: 'people',
										$where: {
											$and: [
												{ first_name: { $eq: 'Jane' } },
												{ last_name: { $eq: 'Doe' } }
											]
										}
									}
								});
							},
							expectedResults: {
								sql: 'SELECT * FROM people WHERE first_name = $1 AND last_name = $2',
								values: {
									$1: 'Jane',
									$2: 'Doe'
								}
							}
						}
					}
				},
				String: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.build({
									$select: {
										$from: 'people',
										$where: {
											$and: [
												"COALESCE(gender, 'male') = 'male'",
												{ last_name: { $eq: 'Doe' } }
											]
										}
									}
								});
							},
							expectedResults: {
								sql: "SELECT * FROM people WHERE COALESCE(gender, 'male') = 'male' AND last_name = $1",
								values: {
									$1: 'Doe'
								}
							}
						}
					}
				},
				Function: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.build({
									$select: {
										$from: 'people',
										$where: {
											$and: [
												sql.cmp('~~first_name', '=', 'Jane'),
												{ last_name: { $eq: 'Doe' } }
											]
										}
									}
								});
							},
							expectedResults: {
								sql: "SELECT * FROM people WHERE first_name = $1 AND last_name = $2",
								values: {
									$1: 'Jane',
									$2: 'Doe'
								}
							}
						}
					}
				}
			}
		}
	}
}
