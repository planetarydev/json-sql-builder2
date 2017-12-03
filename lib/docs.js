'use strict';

// generating the docs for each Helper and Operator
// listed in the /sql directory

// output: README.md always in the same directory
// where the helper/operator lives.

const _		= require('lodash');
const fs	= require('fs');
const path	= require('path');
const tools	= require('./tools');
const jsBeautify = require('js-beautify').js_beautify;
const sqlFormatter = require('sql-formatter');

let beautifyOptions = {
	"indent_size": 4,
    "indent_char": " ",
    "indent_with_tabs": false,
	"preserve_newlines": true,
	"brace_style": "collapse,preserve-inline"
};

/*let select = require('../sql/operators/select/');

let fn = select.examples.Object['Basic Usage as Function'].test.toString();

console.log(jsBeautify(fn, {
	"indent_size": 4,
    "indent_char": " ",
    "indent_with_tabs": false,
	"preserve_newlines": true,
	"brace_style": "collapse,preserve-inline"
}));*/




let modules = tools.walk(path.join(__dirname, '../sql/'));

// iterate each module, require it to get all neccessary
// properties and write the README.doc
_.forEach(modules, (moduleFile) => {
	// load only .js files
	if (moduleFile.endsWith('.js')) {
		let m/*module*/ = require(moduleFile),
			moduleName = path.basename(moduleFile).replace('.js', ''),
			file = path.join(path.dirname(moduleFile), 'README.md'),
			data = '';

		let sql = new SQLBuilder('PostgreSQL');
		let instance;
		try {
			sql.currentModulePath = path.dirname(moduleFile);
			instance = new m.definition(sql);
		} catch (err) {
			console.log(err);
			throw err;
		}

		data += `# ${moduleName} ${instance.isOperator ? 'Operator':'Helper'}\n`
		data += `${m.description}\n\n`
		data += `## Supported by\n`

		// supported by as links
		_.forEach(m.supportedBy, (weblink, language) => {
			if (weblink.startsWith('http')) {
				data += `- [${language}](${weblink})\n`
			} else {
				data += `- ${language}\n`
			}
		});

		data += '\n';
		data += `## Allowed Types and Usage\n`;
		data += '\n';

		_.forEach(instance.__allowedTypes__, (typeDef, type) => {
			// check eachItemOf or type-defined syntax
			if (typeDef.eachItemOf) {
				_.forEach(typeDef.eachItemOf, (itemDef, itemType) => {
					// check normal or value-base syntax
					if (_.isPlainObject(typeDef.syntax)){
						// eachItemOf -> value-based syntax
						return;
					}

					// eachItemOf -> normal syntax

					return;
				});
				return;
			}

			// normal syntax or value-base syntax?
			if (_.isPlainObject(typeDef.syntax)) {
				// value-based syntax
				data += `### as ${type}:\n`;
				data += '\n';
				data += 'The usage of `' + moduleName + '` as **' + type + '** is restricted to the following values:\n';

				_.forEach(typeDef.syntax, (valueDef, value) => {
					data += '- ' + value + '  `$' + moduleName + ': ' + ( type == 'String' ? `'${value}'` : value) + '`';
					data += '\n';
				});

				return;
			}

			// normal syntax
			data += `### as ${type}:\n`;
			data += '\n';
			data += 'Usage of `' + moduleName + '` as **' + type + '** with the following Syntax:\n';
			data += '\n';

			data += '**Syntax:**\n';
			data += '\n';
			data += '```javascript\n';
			switch (type) {
				case 'Primitive':
					data += '$' + moduleName + ': < value: String | Number | Boolean >\n';
					break;
				case 'Number':
					data += '$' + moduleName + ': < Number >\n';
					break;
				case 'Boolean':
					data += '$' + moduleName + ': true | false\n';
					break;
				case 'String':
					data += '$' + moduleName + ': < String >\n';
					break;
				case 'Array':
					data += '$' + moduleName + ': [ ... ]\n';
					break;
				case 'Object':
					data += '$' + moduleName + ': { ... }\n';
					break;
				case 'Function':
					data += '$' + moduleName + ': sql.<callee>([params])\n';
					break;
			}
			data += '```\n';
			data += '\n';

			data += '**SQL-Result-Definition:**\n';
			data += '```javascript\n';
			data += typeDef.syntax.__syntax__ + '\n';
			data += '```\n';
			data += '\n';

			data += '**Example:**\n';

			data += '```javascript\n';
			let basicUsage = m.examples[type]['Basic Usage'](sql).test.toString();
			data += jsBeautify(basicUsage, beautifyOptions);
			data += '\n\n';
			data += '// SQL output\n';
			data += sqlFormatter.format(m.examples[type]['Basic Usage'](sql).expectedResults.sql, {
			    language: "sql", // Defaults to "sql"
			    indent: "    "   // Defaults to two spaces
			});
			data += '\n\n';
			//data += m.examples[type]['Basic Usage'](sql).expectedResults.sql + '\n\n';
			data += '// Values\n'
			data += JSON.stringify(m.examples[type]['Basic Usage'](sql).expectedResults.values, null, 4) + '\n'
			data += '```\n';

			return;
		});


		fs.writeFileSync(file, data, 'utf8');
	}
});
