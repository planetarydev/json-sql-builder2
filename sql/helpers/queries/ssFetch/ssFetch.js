'use strict';

class ssFetch extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
            Object: {
                syntax: this.Syntax('<value>', this.syntaxHook)
            }
		});
	}

    syntaxHook(query, idententifier) {
        return `OFFSET ${query.$skip} ROWS FETCH FIRST ${query.$fetch} ROWS ONLY`;
    }
}

module.exports = {
	definition: ssFetch,
	description: 'Specifies the `OFFSET ${query.$skip} ROWS FETCH FIRST ${query.$fetch} ROWS ONLY` clause for the `SELECT` Statement.',
 	supportedBy: {
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/queries/top-transact-sql'
	},
	examples: {
		Object: {
			'Basic Usage': function(sql) {
				return {
					test: function() {
						let query = sql.build({
							$select: {
								$ssFetch: { $skip: 30, $fetch: 10},
								$from: 'Products',
                                $orderBy: 'ProductName'
							}
						});

						return query;
					},
					expectedResults: {
						sql: 'SELECT * FROM dbo.[Products] ORDER BY [ProductName] ASC OFFSET 30 ROWS FETCH FIRST 10 ROWS ONLY',
						values: {}
					}
				}
			},
		}
	}
}
