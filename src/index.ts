export const decodeCadenceValue = (value: any): any => {
  if (value.type === 'Void') {
    return null
  } else if (value.type === 'Optional') {
    return value.value ? decodeCadenceValue(value.value) : null
  } else if (value.type === 'Bool') {
    return Boolean(value.value)
  } else if ([
    'String',
    'Address',
  ].indexOf(value.type) > -1) {
    return value.value
  } else if ([
    'Int',
    'UInt',
    'Int8',
    'UInt8',
    'Int16',
    'UInt16',
    'Int32',
    'UInt32',
    'Int64',
    'UInt64',
    'Int128',
    'UInt128',
    'Int256',
    'UInt256',
    'Word8',
    'Word16',
    'Word32',
    'Word64',
    'Fix64',
    'UFix64',
  ].indexOf(value.type) > -1) {
    return Number(value.value)
  } else if (value.type === 'Array') {
    return value.value.map((v: any) => decodeCadenceValue(v))
  } else if (value.type === 'Dictionary') {
    let dict: any = {}
    for (const entry of value.value) {
      dict[decodeCadenceValue(entry.key)] = decodeCadenceValue(entry.value)
    }
    return dict
  } else if ([
    'Struct',
    'Resource',
    'Event',
    'Contract',
    'Enum',
  ].indexOf(value.type) > -1) {
    return {
      id: value.value.id,
      fields: decodeCadenceValues(value.value.fields),
    }
  } else if ([
    'Path',
    'Type',
    'Capability',
    'Reference',
  ].indexOf(value.type) > -1) {
    return value.value
  } else {
    return value
  }
}

export const decodeCadenceValues = (values: any[]): any => {
  const decoded: any = {}

  for (const value of values) {
    const name: string = value.name
    decoded[name] = decodeCadenceValue(value.value)
  }

  return decoded
}
