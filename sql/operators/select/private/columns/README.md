# columns Helper

		Specifies the `$columns` Helper for the `SELECT` Statement to select
		only the listed columns instead of `*` or `ALL`.

		**Note** If you did not support the $columns Helper on a SELECT Statement the preBuild method of the select class will automatically
		add a $columns Object with `*` to the query as single column.

## Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/select.html)
- [MariaDB](https://mariadb.com/kb/en/library/select/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-select.html)
- [SQLite](https://sqlite.org/lang_select.html)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10002.htm)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql)

## Allowed Types and Usage

### as String:

Usage of `columns` as **String** with the following Syntax:

**Syntax:**

```javascript
$columns: < String >
```

**SQL-Result-Definition:**
```javascript
<value-ident>
```

**Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $columns: 'id',
            $from: 'people'
        }
    });
}

// SQL output
SELECT
    id
FROM
    people

// Values
{}
```
