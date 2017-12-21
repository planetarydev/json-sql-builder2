'use strict';

class returning extends SQLBuilder.SQLHelper {
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
				}
			},
			Array: {
				eachItemOf: {
					String: { syntax: this.Syntax('<value-ident>[ , ... ]') },
					Object: { syntax: this.Syntax('<value> AS <key-ident>[ , ... ]') }
				}
			},
			String: { syntax: this.Syntax('<value-ident>') }
		});
	}
}

module.exports = {
	definition: returning,
	description: 'Specifies the `RETURNING` clause to use with any `INSERT`, `UPDATE` or `DELETE` Statement.',
 	supportedBy: {
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/dml-returning.html'
	},
	examples: {
		Object: {
			eachItemOf: {
				Function: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.$insert({
									$table: 'people',
									$documents: {
										first_name: 'John',
										last_name: 'Doe',
										age: 40
									},
									$returning: {
										people_id: true,
										total_likes: sql.coalesce('~~total_likes', 0)
									}
								});
							},
							expectedResults: {
								sql: 'INSERT INTO people (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING people_id, COALESCE(total_likes, $4) AS total_likes',
								values:{
									$1: 'John',
									$2: 'Doe',
									$3: 40,
									$4: 0
								}
							}
						}
					}
				},
				Object: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.$insert({
									$table: 'people',
									$documents: {
										first_name: 'John',
										last_name: 'Doe',
										age: 40
									},
									$returning: {
										people_id: true,
										total_likes: { $coalesce: ['~~total_likes', 0] }
									}
								});
							},
							expectedResults: {
								sql: 'INSERT INTO people (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING people_id, COALESCE(total_likes, $4) AS total_likes',
								values:{
									$1: 'John',
									$2: 'Doe',
									$3: 40,
									$4: 0
								}
							}
						}
					}
				},
				Boolean: {
					true: {
						"Basic Usage": function(sql) {
							return {
								test: function(){
									return sql.$insert({
										$table: 'people',
										$documents: {
											first_name: 'John',
											last_name: 'Doe',
											age: 40
										},
										$returning: {
											people_id: true
										}
									});
								},
								expectedResults: {
									sql: 'INSERT INTO people (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING people_id',
									values:{
										$1: 'John',
										$2: 'Doe',
										$3: 40
									}
								}
							}
						}
					},
					false: {
						"Basic Usage": function(sql) {
							return {
								test: function(){
									return sql.$insert({
										$table: 'people',
										$documents: {
											first_name: 'John',
											last_name: 'Doe',
											age: 40
										},
										$returning: {
											people_id: true,
											first_name: false,
											last_name: false,
											age: false
										}
									});
								},
								expectedResults: {
									sql: 'INSERT INTO people (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING people_id',
									values:{
										$1: 'John',
										$2: 'Doe',
										$3: 40
									}
								}
							}
						}
					}
				},
				Number: {
					0: {
						"Basic Usage": function(sql) {
							return {
								test: function(){
									return sql.$insert({
										$table: 'people',
										$documents: {
											first_name: 'John',
											last_name: 'Doe',
											age: 40
										},
										$returning: {
											people_id: 1,
											first_name: 0,
											last_name: 0,
											age: 0
										}
									});
								},
								expectedResults: {
									sql: 'INSERT INTO people (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING people_id',
									values:{
										$1: 'John',
										$2: 'Doe',
										$3: 40
									}
								}
							}
						}
					},
					1: {
						"Basic Usage": function(sql) {
							return {
								test: function(){
									return sql.$insert({
										$table: 'people',
										$documents: {
											first_name: 'John',
											last_name: 'Doe',
											age: 40
										},
										$returning: {
											people_id: 1,
											first_name: 1,
											last_name: 1,
											age: 1
										}
									});
								},
								expectedResults: {
									sql: 'INSERT INTO people (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING people_id, first_name, last_name, age',
									values:{
										$1: 'John',
										$2: 'Doe',
										$3: 40
									}
								}
							}
						}
					}
				},
				String: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.$insert({
									$table: 'people',
									$documents: {
										first_name: 'John',
										last_name: 'Doe',
										age: 40
									},
									$returning: {
										people_id: 'id',
										last_name: 'people_name'
									}
								});
							},
							expectedResults: {
								sql: 'INSERT INTO people (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING people_id AS id, last_name AS people_name',
								values:{
									$1: 'John',
									$2: 'Doe',
									$3: 40
								}
							}
						}
					}
				}
			} // eachItemOf
		}, // Object
		Array: {
			eachItemOf: {
				String: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.$insert({
									$table: 'people',
									$documents: {
										first_name: 'John',
										last_name: 'Doe',
										age: 40
									},
									$returning: ['people_id', 'first_name', 'last_name']
								});
							},
							expectedResults: {
								sql: 'INSERT INTO people (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING people_id, first_name, last_name',
								values:{
									$1: 'John',
									$2: 'Doe',
									$3: 40
								}
							}
						}
					}
				},
				Object: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.$insert({
									$table: 'people',
									$documents: {
										first_name: 'John',
										last_name: 'Doe',
										age: 40
									},
									$returning: [
										{ people_id: { $coalesce: ['~~people_id', 0] } },
										{ total_likes: { $coalesce: ['~~total_likes', 0] } },
									]
								});
							},
							expectedResults: {
								sql: 'INSERT INTO people (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING COALESCE(people_id, $4) AS people_id, COALESCE(total_likes, $5) AS total_likes',
								values:{
									$1: 'John',
									$2: 'Doe',
									$3: 40,
									$4: 0,
									$5: 0
								}
							}
						}
					}
				}
			}
		},
		String: {
			"Basic Usage": function(sql) {
				return {
					test: function(){
						return sql.$insert({
							$table: 'people',
							$documents: {
								first_name: 'John',
								last_name: 'Doe',
								age: 40
							},
							$returning: '*'
						});
					},
					expectedResults: {
						sql: 'INSERT INTO people (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *',
						values:{
							$1: 'John',
							$2: 'Doe',
							$3: 40
						}
					}
				}
			}
		}
	}
}
