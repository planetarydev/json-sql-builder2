# returning Helper
Specifies the `RETURNING` clause to use with any `INSERT`, `UPDATE` or `DELETE` Statement.

#### Supported by
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/dml-returning.html)

# Allowed Types and Usage

## as Object:

The Usage of `returning` as **Object** is restricted to childs have the following Type:

- Boolean
- Number
- String
- Object
- Function

## as Object :arrow_right: Boolean:

The Usage of `returning` as **Object** with a child of Type **Boolean** is restricted to the following values:

- true
- false

## as Object :arrow_right: Boolean with value `true`:
**Syntax:**

```javascript
$returning: {
    "<identifier | $Helper | $operator>": true [, ... ]
}
```

**SQL-Definition:**
```javascript
<key-ident>[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $documents: {
            first_name: 'John',
            last_name: 'Doe',
            age: 40
        },
        $returning: {
            people_id: true
        }
    });
}

// SQL output
INSERT INTO
    people (first_name, last_name, age)
VALUES
    ($1, $2, $3) RETURNING people_id

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 40
}
```
## as Object :arrow_right: Boolean with value `false`:
**Syntax:**

```javascript
$returning: {
    "<identifier | $Helper | $operator>": false [, ... ]
}
```

**SQL-Definition:**
```javascript

```

:bulb: **Example:**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $documents: {
            first_name: 'John',
            last_name: 'Doe',
            age: 40
        },
        $returning: {
            people_id: true,
            first_name: false,
            last_name: false,
            age: false
        }
    });
}

// SQL output
INSERT INTO
    people (first_name, last_name, age)
VALUES
    ($1, $2, $3) RETURNING people_id

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 40
}
```
## as Object :arrow_right: Number:

The Usage of `returning` as **Object** with a child of Type **Number** is restricted to the following values:

- 0
- 1

## as Object :arrow_right: Number with value `0`:
**Syntax:**

```javascript
$returning: {
    "<identifier | $Helper | $operator>": 0 [, ... ]
}
```

**SQL-Definition:**
```javascript

```

:bulb: **Example:**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $documents: {
            first_name: 'John',
            last_name: 'Doe',
            age: 40
        },
        $returning: {
            people_id: 1,
            first_name: 0,
            last_name: 0,
            age: 0
        }
    });
}

// SQL output
INSERT INTO
    people (first_name, last_name, age)
VALUES
    ($1, $2, $3) RETURNING people_id

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 40
}
```
## as Object :arrow_right: Number with value `1`:
**Syntax:**

```javascript
$returning: {
    "<identifier | $Helper | $operator>": 1 [, ... ]
}
```

**SQL-Definition:**
```javascript
<key-ident>[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $documents: {
            first_name: 'John',
            last_name: 'Doe',
            age: 40
        },
        $returning: {
            people_id: 1,
            first_name: 1,
            last_name: 1,
            age: 1
        }
    });
}

// SQL output
INSERT INTO
    people (first_name, last_name, age)
VALUES
    ($1, $2, $3) RETURNING people_id,
    first_name,
    last_name,
    age

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 40
}
```
## as Object :arrow_right: String:

Usage of `returning` as **Object** with a child of Type **String** :

**Syntax:**

```javascript
$returning: {
    "<identifier | $Helper | $operator>": <String> [, ... ]
}
```

**SQL-Definition:**
```javascript
<key-ident> AS <value-ident>[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $documents: {
            first_name: 'John',
            last_name: 'Doe',
            age: 40
        },
        $returning: {
            people_id: 'id',
            last_name: 'people_name'
        }
    });
}

// SQL output
INSERT INTO
    people (first_name, last_name, age)
VALUES
    ($1, $2, $3) RETURNING people_id AS id,
    last_name AS people_name

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 40
}
```
## as Object :arrow_right: Object:

Usage of `returning` as **Object** with a child of Type **Object** :

**Syntax:**

```javascript
$returning: {
    "<identifier | $Helper | $operator>": { ... } [, ... ]
}
```

**SQL-Definition:**
```javascript
<value> AS <identifier>[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $documents: {
            first_name: 'John',
            last_name: 'Doe',
            age: 40
        },
        $returning: {
            people_id: true,
            total_likes: { $coalesce: ['~~total_likes', 0] }
        }
    });
}

// SQL output
INSERT INTO
    people (first_name, last_name, age)
VALUES
    ($1, $2, $3) RETURNING people_id,
    COALESCE(total_likes, $4) AS total_likes

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 40,
    "$4": 0
}
```
## as Object :arrow_right: Function:

Usage of `returning` as **Object** with a child of Type **Function** :

**Syntax:**

```javascript
$returning: {
    "<identifier | $Helper | $operator>": sql.<callee>([params])
}
```

**SQL-Definition:**
```javascript
<value> AS <key-ident>[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $documents: {
            first_name: 'John',
            last_name: 'Doe',
            age: 40
        },
        $returning: {
            people_id: true,
            total_likes: sql.coalesce('~~total_likes', 0)
        }
    });
}

// SQL output
INSERT INTO
    people (first_name, last_name, age)
VALUES
    ($1, $2, $3) RETURNING people_id,
    COALESCE(total_likes, $4) AS total_likes

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 40,
    "$4": 0
}
```
## as Array:

The Usage of `returning` as **Array** is restricted to childs have the following Type:

- String
- Object

## as Array :arrow_right: String:

Usage of `returning` as **Array** with a child of Type **String** :

**Syntax:**

```javascript
$returning: [
    <String> [, ... ]
]
```

**SQL-Definition:**
```javascript
<value-ident>[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $documents: {
            first_name: 'John',
            last_name: 'Doe',
            age: 40
        },
        $returning: ['people_id', 'first_name', 'last_name']
    });
}

// SQL output
INSERT INTO
    people (first_name, last_name, age)
VALUES
    ($1, $2, $3) RETURNING people_id,
    first_name,
    last_name

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 40
}
```
## as Array :arrow_right: Object:

Usage of `returning` as **Array** with a child of Type **Object** :

**Syntax:**

```javascript
$returning: [
    { ... } [, ... ]
]
```

**SQL-Definition:**
```javascript
<value> AS <key-ident>[ , ... ]
```

:bulb: **Example:**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $documents: {
            first_name: 'John',
            last_name: 'Doe',
            age: 40
        },
        $returning: [
            { people_id: { $coalesce: ['~~people_id', 0] } },
            { total_likes: { $coalesce: ['~~total_likes', 0] } },
        ]
    });
}

// SQL output
INSERT INTO
    people (first_name, last_name, age)
VALUES
    ($1, $2, $3) RETURNING COALESCE(people_id, $4) AS people_id,
    COALESCE(total_likes, $5) AS total_likes

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 40,
    "$4": 0,
    "$5": 0
}
```
## as String:

Usage of `returning` as **String** with the following Syntax:

**Syntax:**

```javascript
$returning: < String >
```

**SQL-Definition:**
```javascript
<value-ident>
```

:bulb: **Example:**
```javascript
function() {
    return sql.$insert({
        $table: 'people',
        $documents: {
            first_name: 'John',
            last_name: 'Doe',
            age: 40
        },
        $returning: '*'
    });
}

// SQL output
INSERT INTO
    people (first_name, last_name, age)
VALUES
    ($1, $2, $3) RETURNING *

// Values
{
    "$1": "John",
    "$2": "Doe",
    "$3": 40
}
```

