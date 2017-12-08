# join Helper
Specifies the `JOIN` operator for the `FROM` clause.

> **NOTE**
>
> The keyword `OUTER` is an optional keyword for most SQL-dialects. By default it is deactivated. If you need, you can activate this using the option `useOuterKeywordOnJoin`.
>
> ```javascript
> var sql = new SQLBuilder('PostgreSQL', {
>     useOuterKeywordOnJoin: true
> });
> ```
>

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/select.html)
- [MariaDB](https://mariadb.com/kb/en/library/select/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-select.html)
- [SQLite](https://sqlite.org/lang_select.html)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10002.htm)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/queries/select-having-transact-sql)

# Allowed Types and Usage

## as Object:

The Usage of `join` as **Object** is restricted to childs have the following Type:

- Object

## as Object :arrow_right: Object:

Usage of `join` as **Object** with a child of Type **Object** :

**Syntax:**

```javascript
$join: {
    "<identifier | $Helper | $operator>": { ... } [, ... ]
}
```

**SQL-Definition:**
```javascript

{INNER JOIN [$inner] AS <key-ident>}
{LEFT JOIN [$left] AS <key-ident>}
{RIGHT JOIN [$right] AS <key-ident>}
{FULL JOIN [$full] AS <key-ident>}
{CROSS JOIN [$cross] AS <key-ident>}-->(PostgreSQL)
	{ ON ([$on])}
	{ USING [$using]}

[  ... ]
```

**Registered Helpers**

Name|Required|Public|SQL-Definition|Supported by
:---|:------:|:----:|:-------------|:-----------
[inner](./private/inner/)|*optional*|*private*|INNER JOIN  [$inner] AS <key-ident>|
[left](./private/left/)|*optional*|*private*|LEFT JOIN  [$left] AS <key-ident>|
[right](./private/right/)|*optional*|*private*|RIGHT JOIN  [$right] AS <key-ident>|
[full](./private/full/)|*optional*|*private*|FULL JOIN  [$full] AS <key-ident>|
[cross](./private/cross/)|*optional*|*private*|CROSS JOIN  [$cross] AS <key-ident>|`PostgreSQL` 
[on](./private/on/)|*optional*|*private*| ON ( [$on])|
[using](./private/using/)|*optional*|*private*| USING  [$using]|

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $columns: {
                'people.first_name': true,
                'people.last_name': true,
                'skills.description': true,
                'ratings.description': true
            },
            $from: 'people',
            $join: {
                skills: {
                    $inner: 'people_skills',
                    $on: {
                        'skills.people_id': { $eq: '~~people.people_id' }
                    }
                },
                ratings: {
                    $left: 'skill_ratings',
                    $on: {
                        'skills.rate_id': '~~ratings.rate_id'
                    }
                }
            },
            $where: {
                'skills.rate': { $gt: 50 }
            }

        }
    });
}

// SQL output
SELECT
    people.first_name,
    people.last_name,
    skills.description,
    ratings.description
FROM
    people
    INNER JOIN people_skills AS skills ON (skills.people_id = people.people_id)
    LEFT JOIN skill_ratings AS ratings ON (skills.rate_id = ratings.rate_id)
WHERE
    skills.rate > $1

// Values
{
    "$1": 50
}
```
