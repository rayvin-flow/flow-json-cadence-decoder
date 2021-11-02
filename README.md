`flow-json-cadence-decoder` is a JavaScript library to assist in decoding Cadence JSON values found in the [JSON-Cadence Data Interchange Format Spec](https://docs.onflow.org/cadence/json-cadence-spec/)

NOTE: If you are already using [@onflow/fcl](https://github.com/onflow/fcl-js) then we recommend using the built-in decode method that is part of the sdk rather than this decoder. This is meant as a lightweight drop-in replacement if you only need to decode JSON-Cadence data.

---

### Installation

`npm i @rayvin-flow/flow-json-cadence-decoder`

### Example

```typescript
import { decodeCadenceValues } from '@rayvin-flow/flow-json-cadence-decoder'

const decoded = decodeCadenceValues([
  {
    name: 'OptionalWithoutValue',
    value: {
      type: 'Optional',
      value: null,
    },
  },
  {
    name: 'OptionalWithValue',
    value: {
      type: 'Optional',
      value: {
        type: 'UInt8',
        value: '123',
      },
    },
  },
  {
    name: 'BooleanTrue',
    value: {
      type: 'Bool',
      value: true,
    },
  },
  {
    name: 'BooleanFalse',
    value: {
      type: 'Bool',
      value: false,
    },
  },
  {
    name: 'String',
    value: {
      type: 'String',
      value: 'Hello, world!',
    },
  },
])

// decoded will equal
// {
//   'OptionalWithoutValue': null, 
//   'OptionalWithValue': 123,
//   'BooleanTrue': true,
//   'BooleanFalse': false,
//   'String': 'Hello, world!',
// }
```

Or to decode a single value:

```typescript
import { decodeCadenceValue } from '@rayvin-flow/flow-json-cadence-decoder'

const decodedValue = decodeCadenceValue({
      type: 'Optional',
      value: {
        type: 'UInt8',
        value: '123',
      },
    })

// decoded will equal
// 123
```
