# from Helper
Specifies the `FROM` clause for the `SELECT` Statement.

## Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/select.html)
- [MariaDB](https://mariadb.com/kb/en/library/select/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-select.html)
- [SQLite](https://sqlite.org/lang_select.html)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10002.htm)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql)

## Allowed Types and Usage

### as Object:

The Usage of `from` as **Object** is restricted to childs have the following Type:

- Boolean
- Number
- String
- Object
- Function

#### as Object->String:

Usage of `from` as **Object** with a child of Type **String** :

**Syntax:**

```javascript
$from: {
    "<identifier | $Helper | $operator>": <String> [, ... ]
}```

**SQL-Definition:**
```javascript
<key-ident> AS <value-ident>[ , ... ]
```

**Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: { people: 'p' }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people AS p

// Values
{}
```
#### as Object->Object:

Usage of `from` as **Object** with a child of Type **Object** :

**Syntax:**

```javascript
$from: {
    "<identifier | $Helper | $operator>": { ... } [, ... ]
}```

**SQL-Definition:**
```javascript
<value> AS <identifier>[ , ... ]
```

**Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: {
                people: 'p',
                skills: {
                    $select: { $from: 'people_skills' }
                }
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    people AS p,
    (
        SELECT
            *
        FROM
            people_skills
    ) AS skills

// Values
{}
```
#### as Object->Function:

Usage of `from` as **Object** with a child of Type **Function** :

**Syntax:**

```javascript
$from: {
    "<identifier | $Helper | $operator>": sql.<callee>([params])
}```

**SQL-Definition:**
```javascript
<value> AS <key-ident>[ , ... ]
```

**Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $from: {
                p: sql.select('*', { $from: 'people' })
            }
        }
    });
}

// SQL output
SELECT
    *
FROM
    (
        SELECT
            *
        FROM
            people
    ) AS p

// Values
{}
```
### as String:

Usage of `from` as **String** with the following Syntax:

**Syntax:**

```javascript
$from: < String >
```

**SQL-Definition:**
```javascript
<value-ident>
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
