'use strict';

class from extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Object: {
				eachItemOf: {
					Boolean: {
						syntax: {
							true: this.Syntax('<key-ident>[ , ... ]'),
							false: this.Syntax('')
						}
					},
					Number: {
						syntax: {
							1: this.Syntax('<key-ident>[ , ... ]'),
							0: this.Syntax('')
						}
					},
					String: { syntax: this.Syntax('<key-ident> AS <value-ident>[ , ... ]') },
					Object: { syntax: this.Syntax('<value> AS <identifier>[ , ... ]') },
					Function: { syntax: this.Syntax('<value> AS <key-ident>[ , ... ]') }
				},
			},
			String: { syntax: this.Syntax('<value-ident>') },
		});
	}
}

module.exports = {
	definition: from,
	description: 'Specifies the `FROM` clause for the `SELECT` Statement.',
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
			eachItemOf: {
				Function: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.build({
									$select: {
										$from: {
											p: sql.select('*', { $from: 'people'})
										}
									}
								});
							},
							expectedResults: {
								sql: 'SELECT * FROM (SELECT * FROM people) AS p',
								values: {}
							}
						}
					}
				},
				Boolean: {
					true: {
						"Basic Usage": function(sql) {
							return {
								test: function(){
									return sql.build({
										$select: {
											$from: {
												people: true,
												people_skills: true
											}
										}
									});
								},
								expectedResults: {
									sql: 'SELECT * FROM people, people_skills',
									values: {}
								}
							}
						}
					},
					false: {
						"Basic Usage": function(sql) {
							return {
								test: function(){
									return sql.build({
										$select: {
											$from: {
												people: true,
												people_skills: false
											}
										}
									});
								},
								expectedResults: {
									sql: 'SELECT * FROM people',
									values: {}
								},
								postComments: [
									{ type: 'danger', comment: `Can't use \`$from\` helper on Object->Boolean with only one expr. that has a false value. In that case it will end up in an Error on the database.` }
								]
							}
						}
					}
				},
				Number: {
					1: {
						"Basic Usage": function(sql) {
							return {
								test: function(){
									return sql.build({
										$select: {
											$from: { people: 1, people_skills: 1 }
										}
									});
								},
								expectedResults: {
									sql: 'SELECT * FROM people, people_skills',
									values: {}
								}
							}
						}
					},
					0: {
						"Basic Usage": function(sql) {
							return {
								test: function(){
									return sql.build({
										$select: {
											$from: { people: 1, people_skills: 0 }
										}
									});
								},
								expectedResults: {
									sql: 'SELECT * FROM people',
									values: {}
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
										$from: { people: 'p' }
									}
								});
							},
							expectedResults: {
								sql: 'SELECT * FROM people AS p',
								values: {}
							},
						}
					},
					"Cross Joined Tables": function(sql) {
						return {
							test: function(){
								return sql.build({
									$select: {
										$from: { people: 'p', people_skills: 'ps' }
									}
								});
							},
							expectedResults: {
								sql: 'SELECT * FROM people AS p, people_skills AS ps',
								values: {}
							}
						}
					}
				},
				Object: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.build({
									$select: {
										$from: {
											people: 'p',
											skills: {
												$select: { $from: 'people_skills' }
											}
										}
									}
								});
							},
							expectedResults: {
								sql: 'SELECT * FROM people AS p, (SELECT * FROM people_skills) AS skills',
								values: {}
							}
						}
					}
				}
			} // eachItemOf
		}, // Object
		String: {
			"Basic Usage": function(sql) {
				return {
					test: function(){
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
			}
		}
	}
}
