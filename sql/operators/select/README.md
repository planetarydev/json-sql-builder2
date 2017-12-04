# select Operator
Specifies the Operator for the `SELECT` Statement.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/select.html)
- [MariaDB](https://mariadb.com/kb/en/library/select/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-select.html)
- [SQLite](https://sqlite.org/lang_select.html)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10002.htm)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql)

# Allowed Types and Usage

## as Object:

Usage of `select` as **Object** with the following Syntax:

**Syntax:**

```javascript
$select: { ... }
```

**SQL-Definition:**
```javascript
SELECT
	{ TOP [$top]}-->(SQLServer)	{ DISTINCT[$distinct]}
	{ SQL_CALC_FOUND_ROWS[$calcFoundRows]}-->(MySQL)

	{ <$columns>}	{ INTO [$into]}-->(MySQL,MSSQLServer)

	{ FROM [$from]}
	{ [$joins]}
	{ WHERE [$where]}
	{ GROUP BY [$groupBy]}	{ WITH ROLLUP[$rollup]}-->(MySQL)
	{ HAVING [$having]}
	{ ORDER BY [$sort] | [$orderBy]}
	{ LIMIT [$limit]}-->(MariaDB,MySQL,PostgreSQL,SQLite)
	{ OFFSET [$offset]}-->(MariaDB,MySQL,PostgreSQL,SQLite)
	{ INTO OUTFILE [$outfile]}-->(MySQL)
	{ INTO DUMPFILE [$dumpfile]}-->(MySQL)
```

:bulb: **Example:**
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
## Further Examples

:bulb: **Basic Usage as Operator-Function**
```javascript
function() {
    return sql.$select({
        $from: 'people',
        $where: {
            last_name: 'Doe'
        }
    });
}

// SQL output
SELECT
    *
FROM
    people
WHERE
    last_name = $ 1

// Values
{
    "$1": "Doe"
}
```

:bulb: **Basic Usage as Function**
```javascript
function() {
    let peopleLikes = sql.select({ total_likes: sql.count('*') }, {
        $from: 'people_likes',
        $where: {
            'people_likes.people_id': { $eq: '~~people.people_id' }
        }
    });

    return sql.$select({
        first_name: 1,
        last_name: 1,
        total_likes: peopleLikes,
        $from: 'people'
    });
}

// SQL output
SELECT
    first_name,
    last_name,
    (
        SELECT
            COUNT(*) AS total_likes
        FROM
            people_likes
        WHERE
            people_likes.people_id = people.people_id
    ) AS total_likes
FROM
    people

// Values
{}
```

:bulb: **Basic Usage as inline-Function**
```javascript
function() {
    return sql.$select({
        first_name: 1,
        last_name: 1,
        total_likes: sql.select({ total_likes: { $count: '*' } }, {
            $from: 'people_likes',
            $where: {
                'people_likes.people_id': '~~people.people_id'
            }
        }),
        $from: 'people'
    });
}

// SQL output
SELECT
    first_name,
    last_name,
    (
        SELECT
            COUNT(*) AS total_likes
        FROM
            people_likes
        WHERE
            people_likes.people_id = people.people_id
    ) AS total_likes
FROM
    people

// Values
{}
```

