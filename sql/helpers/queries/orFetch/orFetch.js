'use strict';

class orFetch extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
            Number: {
                syntax: this.Syntax('<value>', this.syntaxHook)
            }
		});
	}

    syntaxHook(query, idententifier) {
        return `FETCH NEXT ${query} ROWS ONLY`;
    }
}

module.exports = {
	definition: orFetch,
	description: 'Specifies the `FETCH NEXT ${query} ROWS ONLY` clause for the `SELECT` Statement.',
 	supportedBy: {
		Oracle: 'https://www.oracletutorial.com/oracle-basics/oracle-fetch/'
	},
	examples: {
        Number: {
			'Basic Usage': function(sql) {
				return {
					test: function() {
						let query = sql.build({
							$select: {
								$orFetch: 10,
								$from: 'Products',
                                $orderBy: 'ProductName'
							}
						});

						return query;
					},
					expectedResults: {
						sql: 'SELECT * FROM Products ORDER BY ProductName ASC OFFSET 30 ROWS FETCH NEXT 10 ROWS ONLY',
						values: {}
					}
				}
			},
		}
	}
}
