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

let examplesData = '';

function listAllExamplesWithoutBasicUsage(sql, moduleName, examples) {
	let data = '';

	_.forEach(examples, (exampleFunction, exampleName) => {
		// skip basic usage, it's already printed as example on the Syntax
		if (exampleName == 'Basic Usage') return;

		data += ':bulb: **' + exampleName + '**\n';

		data += '```javascript\n';
		let example = exampleFunction(sql);
		data += jsBeautify(example.test.toString(), beautifyOptions);
		data += '\n\n';
		data += '// SQL output\n';
		data += sqlFormatter.format(example.expectedResults.sql, {
			language: "sql", // Defaults to "sql"
			indent: "    "   // Defaults to two spaces
		});
		data += '\n\n';
		data += '// Values\n'
		data += JSON.stringify(example.expectedResults.values, null, 4) + '\n'
		data += '```\n';
		data += '\n';
	});

	return data;
}

function createNormalTypeDoc(sql, m, moduleName, type, typeDef) {
	let data = '';

	data += `## as ${type}:\n`;
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

	data += '**SQL-Definition:**\n';
	data += '```javascript\n';
	data += typeDef.syntax.__syntax__.replace(/\t/g, '  ') + '\n';
	data += '```\n';
	data += '\n';

	// if there are registered helpers we list and link them all
	if (typeDef.syntax.__registeredHelpers__) {
		data += `**Registered Helpers**\n`;
		data += '\n';
		data += 'Name|Required|Public|SQL-Definition\n';
		data += '----|:--------:|------|--------------\n';
		_.forEach(typeDef.syntax.__registeredHelpers__, (helper, helperName) => {
			let sqlDef = '';
			if (helper.subSyntax) {
				 sqlDef = helper.subSyntax.replace(helper.token, helper.required ? ` <$${helperName}>` : ` [$${helperName}]`);
				 sqlDef = sqlDef.replace(/(>->->[0-9]+<-<-<)/g, '');
			}

			let publicInfo = ':heavy_check_mark:';
			if (!sql._operators[helperName]) {
				publicInfo = '*private*'
			}

			let helperLink = `[${helperName.replace('$', '')}](./private/${helperName.replace('$', '')}/)`;

			data +=  helperLink + '|' + (helper.required ? ':heavy_check_mark:':'*optional*') + '|' + publicInfo + '|' + sqlDef + '\n';
		});
		data += '\n';
	}

	data += ':bulb: **Example:**\n';

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
	data += '// Values\n'
	data += JSON.stringify(m.examples[type]['Basic Usage'](sql).expectedResults.values, null, 4) + '\n'
	data += '```\n';
	data += '\n';

	examplesData += listAllExamplesWithoutBasicUsage(sql, moduleName, m.examples[type]);

	return data;
}

function createValueBasedTypeDoc(sql, m, moduleName, type, typeDef){
	let data = '';

	data += `## as ${type}:\n`;
	data += '\n';
	data += 'The usage of `' + moduleName + '` as **' + type + '** is restricted to the following values:\n';

	_.forEach(typeDef.syntax, (valueDef, value) => {
		data += '- ' + value
		data += '\n';
	});
	data += '\n';

	_.forEach(typeDef.syntax, (valueDef, value) => {
		data += `#### as ${type} with value **${value}**:\n`;
		data += '**Syntax:**\n';
		data += '\n';
		data += '```javascript\n';
		switch (type) {
			case 'Primitive':
				data += '$' + moduleName + ': < value: String | Number | Boolean >\n';
				break;
			case 'Number':
			case 'Boolean':
				data += '$' + moduleName + ': ' + value + '\n';
				break;
			case 'String':
				data += '$' + moduleName + ': \'' + value + '\'\n';
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

		data += '**SQL-Definition:**\n';
		data += '```javascript\n';
		data += typeDef.syntax[value].__syntax__ + '\n';
		data += '```\n';
		data += '\n';

		data += ':bulb: **Example:**\n';

		data += '```javascript\n';
		let basicUsage = m.examples[type][value]['Basic Usage'](sql).test.toString();
		data += jsBeautify(basicUsage, beautifyOptions);
		data += '\n\n';
		data += '// SQL output\n';
		data += sqlFormatter.format(m.examples[type][value]['Basic Usage'](sql).expectedResults.sql, {
			language: "sql", // Defaults to "sql"
			indent: "    "   // Defaults to two spaces
		});
		data += '\n\n';
		data += '// Values\n'
		data += JSON.stringify(m.examples[type][value]['Basic Usage'](sql).expectedResults.values, null, 4) + '\n'
		data += '```\n';

		examplesData += listAllExamplesWithoutBasicUsage(sql, moduleName, m.examples[type][value]);
	});

	return data
}

function createEachItemOfTypeDoc(sql, m, moduleName, type, typeDef, itemDef, itemType){
	let data = '';

	data += `## as ${type} :arrow_right: ${itemType}:\n`;
	data += '\n';
	data += 'Usage of `' + moduleName + '` as **' + type + '** with a child of Type **' + itemType + '** :\n';
	data += '\n';

	data += '**Syntax:**\n';
	data += '\n';
	data += '```javascript\n';
	if (type === 'Object') {
		data += '$' + moduleName + ': {\n'
		switch (itemType) {
			case 'Primitive':
				data += '    "<identifier | $Helper | $operator>": <value: String | Number | Boolean> [, ... ]\n';
				break;
			case 'Number':
				data += '    "<identifier | $Helper | $operator>": <Number> [, ... ]\n';
				break;
			case 'Boolean':
				data += '    "<identifier | $Helper | $operator>": true | false [, ... ]\n';
				break;
			case 'String':
				data += '    "<identifier | $Helper | $operator>": <String> [, ... ]\n';
				break;
			case 'Array':
				data += '    "<identifier | $Helper | $operator>": [ ... ] [, ... ]\n';
				break;
			case 'Object':
				data += '    "<identifier | $Helper | $operator>": { ... } [, ... ]\n';
				break;
			case 'Function':
				data += '    "<identifier | $Helper | $operator>": sql.<callee>([params])\n';
				break;
		}
		data += '}\n';
	} else {
		// Array
		data += '$' + moduleName + ': [\n'
		switch (itemType) {
			case 'Primitive':
				data += '    <value: String | Number | Boolean> [, ... ]\n';
				break;
			case 'Number':
				data += '    <Number> [, ... ]\n';
				break;
			case 'Boolean':
				data += '    <true | false> [, ... ]\n';
				break;
			case 'String':
				data += '    <String> [, ... ]\n';
				break;
			case 'Array':
				data += '    <Array> [, ... ]\n';
				break;
			case 'Object':
				data += '    { ... } [, ... ]\n';
				break;
			case 'Function':
				data += '    sql.<callee>([params]) [, ... ]\n';
				break;
		}
		data += ']\n';
	}
	data += '```\n';
	data += '\n';

	data += '**SQL-Definition:**\n';
	data += '```javascript\n';
	data += itemDef.syntax.__syntax__ + '\n';
	data += '```\n';
	data += '\n';

	data += ':bulb: **Example:**\n';

	data += '```javascript\n';
	let basicUsage = m.examples[type].eachItemOf[itemType]['Basic Usage'](sql); //.test.toString();
	data += jsBeautify(basicUsage.test.toString(), beautifyOptions);
	data += '\n\n';
	data += '// SQL output\n';
	data += sqlFormatter.format(basicUsage.expectedResults.sql, {
		language: "sql", // Defaults to "sql"
		indent: "    "   // Defaults to two spaces
	});
	data += '\n\n';
	data += '// Values\n'
	data += JSON.stringify(basicUsage.expectedResults.values, null, 4) + '\n'
	data += '```\n';

	examplesData += listAllExamplesWithoutBasicUsage(sql, moduleName, m.examples[type].eachItemOf[itemType]);

	return data;
}

function createEachItemOfValueBasedTypeDoc(sql, m, moduleName, type, typeDef, itemDef, itemType){
	let data = '';

	data += `## as ${type} :arrow_right: ${itemType}:\n`;
	data += '\n';
	data += 'The Usage of `' + moduleName + '` as **' + type + '** with a child of Type **' + itemType + '** is restricted to the following values:\n';
	data += '\n';
	_.forEach(itemDef.syntax, (valueDef, value) => {
		data += '- ' + value
		data += '\n';
	});
	data += '\n';

	_.forEach(itemDef.syntax, (valueDef, value) => {
		data += `## as ${type} :arrow_right: ${itemType} with value \`${value}\`:\n`;

		data += '**Syntax:**\n';
		data += '\n';
		data += '```javascript\n';
		if (type === 'Object') {
			data += '$' + moduleName + ': {\n'
			switch (itemType) {
				case 'Primitive':
					data += '    "<identifier | $Helper | $operator>": ' + (_.isString(value) ? `'${value}'`:value) + ' [, ... ]\n';
					break;
				case 'Boolean':
				case 'Number':
					data += '    "<identifier | $Helper | $operator>": ' + value + ' [, ... ]\n';
					break;
				case 'String':
					data += '    "<identifier | $Helper | $operator>": \'' + value + '\' [, ... ]\n';
					break;
				case 'Array':
					data += '    "<identifier | $Helper | $operator>": [ ... ] [, ... ]\n';
					break;
				case 'Object':
					data += '    "<identifier | $Helper | $operator>": { ... } [, ... ]\n';
					break;
				case 'Function':
					data += '    "<identifier | $Helper | $operator>": sql.<callee>([params])\n';
					break;
			}
			data += '}\n';
		} else {
			// Array
			data += '$' + moduleName + ': [\n'
			switch (itemType) {
				case 'Primitive':
					data += '    <value: String | Number | Boolean> [, ... ]\n';
					break;
				case 'Number':
					data += '    <Number> [, ... ]\n';
					break;
				case 'Boolean':
					data += '    <true | false> [, ... ]\n';
					break;
				case 'String':
					data += '    <String> [, ... ]\n';
					break;
				case 'Array':
					data += '    <Array> [, ... ]\n';
					break;
				case 'Object':
					data += '    { ... } [, ... ]\n';
					break;
				case 'Function':
					data += '    sql.<callee>([params]) [, ... ]\n';
					break;
			}
			data += ']\n';
		}
		data += '```\n';
		data += '\n';

		data += '**SQL-Definition:**\n';
		data += '```javascript\n';
		data += valueDef.__syntax__ + '\n';
		data += '```\n';
		data += '\n';

		data += ':bulb: **Example:**\n';

		data += '```javascript\n';

		let basicUsage = m.examples[type].eachItemOf[itemType][value]['Basic Usage'](sql);
		data += jsBeautify(basicUsage.test.toString(), beautifyOptions);
		data += '\n\n';
		data += '// SQL output\n';
		data += sqlFormatter.format(basicUsage.expectedResults.sql, {
			language: "sql", // Defaults to "sql"
			indent: "    "   // Defaults to two spaces
		});
		data += '\n\n';
		data += '// Values\n'
		data += JSON.stringify(basicUsage.expectedResults.values, null, 4) + '\n'
		data += '```\n';

		examplesData += listAllExamplesWithoutBasicUsage(sql, moduleName, m.examples[type].eachItemOf[itemType][value]);
	});

	return data;
}

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
		moduleName = m.definition.name;

		data += `# ${moduleName} ${instance.isOperator ? 'Operator':'Helper'}\n`
		data += `${m.description}\n\n`
		data += `#### Supported by\n`

		// supported by as links
		_.forEach(m.supportedBy, (weblink, language) => {
			if (weblink.startsWith('http')) {
				data += `- [${language}](${weblink})\n`
			} else {
				data += `- ${language}\n`
			}
		});

		// reste the examples for this current helper or operator
		examplesData = '';

		data += '\n';
		data += `# Allowed Types and Usage\n`;
		data += '\n';

		_.forEach(instance.__allowedTypes__, (typeDef, type) => {
			// check eachItemOf or type-defined syntax
			if (typeDef.eachItemOf) {
				data += `## as ${type}:\n`;
				data += '\n';
				data += 'The Usage of `' + moduleName + '` as **' + type + '** is restricted to childs have the following Type:\n';
				data += '\n';

				_.forEach(typeDef.eachItemOf, (itemDef, itemType) => {
					data += '- ' + itemType
					data += '\n';
				});
				data += '\n';

				_.forEach(typeDef.eachItemOf, (itemDef, itemType) => {
					// check normal or value-base syntax
					if (_.isPlainObject(itemDef.syntax)){
						// eachItemOf -> value-based syntax
						data += createEachItemOfValueBasedTypeDoc(sql, m, moduleName, type, typeDef, itemDef, itemType);
						return;
					}

					// eachItemOf -> normal syntax
					data += createEachItemOfTypeDoc(sql, m, moduleName, type, typeDef, itemDef, itemType);
					return;
				});
				return;
			}

			// normal syntax or value-base syntax?
			if (_.isPlainObject(typeDef.syntax)) {
				// value-based syntax
				data += createValueBasedTypeDoc(sql, m, moduleName, type, typeDef);
				return;
			}

			// normal syntax
			data += createNormalTypeDoc(sql, m, moduleName, type, typeDef);
			return;
		});

		// print further examples if exists
		if (examplesData != '') {
			data += '## Further Examples\n';
			data += '\n';
			data += examplesData;
		}

		fs.writeFileSync(file, data, 'utf8');
	}
});
