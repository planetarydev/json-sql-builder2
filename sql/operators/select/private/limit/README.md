## limit Helper

Specifies the `LIMIT` clause for the `SELECT` Statement.

### Syntax
You can use the limit Helper in different ways.

- As `Object`

  - with an Item of `String`


- As Number

  - with value `0`
  - with value `1`

#### Usage As *inline - Function* :
Syntax:
```javascript
sql.select($columns, options)
```
Basic Example:
```javascript
function() {
	let query = sql.build({
		$select: {
			$from: 'people',
			$limit: sql.isNull('max_rows', 10)
		}
	});

	return query;
}
```

```sql
-- SQL - result
SELECT * FROM people LIMIT ISNULL(`max_rows`, $1);

-- Values
values: {
	$1: 10
}
```


#### Usage As *Object* :
Syntax:
```sql
$select: {
	SELECT
		{ TOP [$top]}-->(MSSQLServer)
		{ DISTINCT[$distinct]}
		{ SQL_CALC_FOUND_ROWS[$calcFoundRows]}-->(MySQL)

		{ <$columns>} { INTO [$into]}-->(MySQL,MSSQLServer)

		{ FROM [$from]}
		{ [$joins]}
		{ WHERE [$where]}
		{ GROUP BY [$groupBy]} { WITH ROLLUP[$rollup]}-->(MySQL)
		{ HAVING [$having]}
		{ ORDER BY [$sort] | [$orderBy]}
		{ LIMIT [$limit]}-->(MariaDB,MySQL,PostgreSQL,SQLite)
		{ OFFSET [$offset]}-->(MariaDB,MySQL,PostgreSQL,SQLite)
		{ INTO OUTFILE [$outfile]}-->(MySQL)
		{ INTO DUMPFILE [$dumpfile]}-->(MySQL)
}
```
Basic Example:
```javascript
function() {
	let query = sql.build({
		$select: {
			$from: 'people',
			$limit: 10
		}
	});

	return query;
}

// SQL - result
SELECT * FROM people LIMIT $1;

// Values
values: {
	$1: 10
}
```

#### Usage As *Number*
Syntax:
```sql
$from: {
	<key-ident> AS <value>
}
```
Basic Example:
```javascript
function() {
	let query = sql.build({
		$select: {
			$from: 'people',
			$limit: 10
		}
	});

	return query;
}

// SQL - result
SELECT * FROM people LIMIT $1;

// Values
values: {
	$1: 10
}
```

- As *String*, allowed Values:
  - ALL `< value >`

### Supported by

- [MySQL](https://dev.mysql.com/doc/refman/5.5/en/select.html#idm140536593160960)
- [MariaDB](https://mariadb.com/kb/en/library/limit/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-select.html#SQL-LIMIT)
- [SQLite](https://sqlite.org/lang_select.html#limitoffset)


### Examples - As *Number*

**Basic Usage**

```javascript
function() {
	let query = sql.build({
		$select: {
			$from: 'people',
			$limit: 10
		}
	});

	return query;
}

// SQL - result
SELECT * FROM people LIMIT $1;

// Values
values: {
	$1: 10
}
```

### Examples - As `String` with value `ALL`

**MySQL turns `{ $limit: 'ALL' }` to `LIMIT 9007199254740991`**


**Note** This Example is only valid for
- MySQL
- MariaDB


```javascript
function(){
	let query = sql.build({
		$select: {
			$from: 'people',
			$limit: 'ALL'
		}
	});
	return query;
}

// SQL - Result
SELECT * FROM people LIMIT 9007199254740991

// Values
values: {

}
```
