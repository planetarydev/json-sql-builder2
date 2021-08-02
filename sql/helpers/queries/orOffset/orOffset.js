'use strict';

class orOffset extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
            Number: {
                syntax: this.Syntax('<value>', this.syntaxHook)
            }
		});
	}

    syntaxHook(query, idententifier) {
        return `OFFSET ${query} ROWS`;
    }
}

module.exports = {
	definition: orOffset,
	description: 'Specifies the `OFFSET ${query} ROWS` clause for the `SELECT` Statement.',
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
								$orOffset: 10,
								$from: 'Products',
                                $orderBy: 'ProductName'
							}
						});

						return query;
					},
					expectedResults: {
						sql: 'SELECT * FROM Products ORDER BY ProductName ASC OFFSET 10 ROWS',
						values: {}
					}
				}
			},
		}
	}
}
