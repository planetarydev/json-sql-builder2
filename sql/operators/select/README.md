# select Operator
Specifies the Operator for the `SELECT` Statement.

## Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/select.html)
- [MariaDB](https://mariadb.com/kb/en/library/select/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-select.html)
- [SQLite](https://sqlite.org/lang_select.html)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10002.htm)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql)

## Allowed Types and Usage

### as Object:

Usage of `select` as **Object** with the following Syntax:

**Syntax:**

```javascript
$select: { ... }
```

**SQL-Definition:**
```javascript
SELECT	{ TOP [$top]}-->(MSSQLServer)	{ DISTINCT[$distinct]}	{ SQL_CALC_FOUND_ROWS[$calcFoundRows]}-->(MySQL)	{ <$columns>}	{ INTO [$into]}-->(MySQL,MSSQLServer)
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
```

**Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: 'people'
        }
    });
}

// SQL output
SELECT
    *
FROM
    people

// Values
{}
```
