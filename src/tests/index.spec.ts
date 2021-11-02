import { expect } from 'chai'
import { decodeCadenceValue, decodeCadenceValues } from '../index'

const testValues = [
  {
    name: 'Void',
    input: {
      type: 'Void',
    },
    output: null,
  },
  {
    name: 'Optional without value',
    input: {
      type: 'Optional',
      value: null,
    },
    output: null,
  },
  {
    name: 'Optional with value',
    input: {
      type: 'Optional',
      value: {
        type: 'UInt8',
        value: '123',
      },
    },
    output: 123,
  },
  {
    name: 'Bool (true)',
    input: {
      type: 'Bool',
      value: true,
    },
    output: true,
  },
  {
    name: 'Bool (false)',
    input: {
      type: 'Bool',
      value: false,
    },
    output: false,
  },
  {
    name: 'String',
    input: {
      type: 'String',
      value: 'Hello, world!',
    },
    output: 'Hello, world!',
  },
  {
    name: 'Address',
    input: {
      type: 'Address',
      value: '0x1234',
    },
    output: '0x1234',
  },
  {
    name: 'Array',
    input: {
      type: 'Array',
      value: [
        {
          type: 'Int16',
          value: '123',
        },
        {
          type: 'String',
          value: 'test',
        },
        {
          type: 'Bool',
          value: true,
        },
      ],
    },
    output: [
      123,
      'test',
      true,
    ],
  },
  {
    name: 'Dictionary',
    input: {
      type: 'Dictionary',
      value: [
        {
          key: {
            type: 'UInt8',
            value: '123',
          },
          value: {
            type: 'String',
            value: 'test',
          },
        },
        {
          key: {
            type: 'UInt8',
            value: '456',
          },
          value: {
            type: 'UInt8',
            value: '789',
          },
        },
        {
          key: {
            type: 'String',
            value: 'test',
          },
          value: {
            type: 'String',
            value: 'val',
          },
        },
      ],
    },
    output: {
      '123': 'test',
      '456': 789,
      'test': 'val',
    },
  },
  {
    name: 'Path',
    input: {
      type: 'Path',
      value: {
        domain: 'storage',
        identifier: 'flowTokenVault',
      },
    },
    output: {
      domain: 'storage',
      identifier: 'flowTokenVault',
    },
  },
  {
    name: 'Type',
    input: {
      'type': 'Type',
      'value': {
        'staticType': 'Int',
      },
    },
    output: {
      'staticType': 'Int',
    },
  },
  {
    name: 'Capability',
    input: {
      type: 'Capability',
      value: {
        path: '/public/someInteger',
        address: '0x1',
        borrowType: 'Int',
      },
    },
    output: {
      path: '/public/someInteger',
      address: '0x1',
      borrowType: 'Int',
    },
  }
]

const compositeTypes = [
  'Struct',
  'Resource',
  'Event',
  'Contract',
  'Enum',
]

const intTypes = [
  'Int',
  'Int8',
  'Int16',
  'Int32',
  'Int64',
  'Int128',
  'Int256',
  'UInt',
  'UInt8',
  'UInt16',
  'UInt32',
  'UInt64',
  'UInt128',
  'UInt256',
  'Word8',
  'Word16',
  'Word32',
  'Word64',
]

const fixedPointTypes = [
  'Fix64',
  'UFix64',
]

describe('Test Cadence value decoder', () => {
  for (const testValue of testValues) {
    it(testValue.name, () => {
      const decoded = decodeCadenceValue(testValue.input)

      expect(decoded).deep.equals(testValue.output)
    })
  }

  for (const intType of intTypes) {
    it(intType, () => {
      const decoded = decodeCadenceValue({
        type: intType,
        value: '123',
      })

      expect(decoded).deep.equals(123)
    })
  }

  for (const fixedPointType of fixedPointTypes) {
    it(fixedPointType, () => {
      const decoded = decodeCadenceValue({
        type: fixedPointType,
        value: '12.3',
      })

      expect(decoded).deep.equals(12.3)
    })
  }

  for (const compositeType of compositeTypes) {
    it(compositeType, () => {
      const decoded = decodeCadenceValue({
        type: compositeType,
        value: {
          id: '0x3.GreatContract.GreatNFT',
          fields: [
            {
              name: 'power',
              value: {
                type: 'Int',
                value: '1',
              },
            },
          ],
        },
      })

      expect(decoded).deep.equals({
        id: '0x3.GreatContract.GreatNFT',
        fields: {
          power: 1,
        },
      })
    })
  }

  it('Decoding multiple values', () => {
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

    expect(decoded).deep.equals({
      OptionalWithoutValue: null,
      OptionalWithValue: 123,
      BooleanTrue: true,
      BooleanFalse: false,
      String: 'Hello, world!',
    })
  })
})
