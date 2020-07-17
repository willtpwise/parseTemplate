# Parse Template

> A very light weight library which allows you to process tokenised strings

Say you have a string like this:
```
const input = 'Hello ${firstName}'
```

You can parse it like this:
```javascript
const meta = { firstName: 'Jess' }

parseTemplate(input, meta) // 'Hello Jess'
```

## Documentation

### Object syntax
```javascript
const meta = { user: { firstName: 'Joe' } }

parseTemplate('Hello ${user.firstName}', meta) // 'Hello Joe'
```

### Array syntax
```javascript
const meta = { guests: [{ firstName: 'Alex'}] }

parseTemplate('Hello ${guests[0].firstName}', meta) // 'Hello Alex'
```

### Fallback syntax
```javascript
const meta = { nickName: null, firstName: 'Sam' }

parseTemplate('Hello ${nickname || firstName || "there"}', meta) // 'Hello Sam'
```

### Empty value
Empty values are replaced with an empty string
```javascript
const meta = { nickName: null }

parseTemplate('Hello ${nickname}', meta) // 'Hello '
```

### Undefined value
Undefined values are replaced with an empty string
```javascript
const meta = {}

parseTemplate('Hello ${nickname}', meta) // 'Hello '
```

### Object unwrapping
The resolved "meta" value must be either a string or a number, otherwise it is ignored. So objects and other non string/number values are ommitted
```javascript
const meta = { user: { nickName: 'Roger' } }

parseTemplate('Hello ${user}', meta) // 'Hello '
```

## Contributing

Thanks for the help :) Please open a PR!
