import { parseTemplate } from './parseTemplate';

describe('parseTemplate', () => {

  it('should replace the token with the meta value', () => {

    const meta = { firstName: 'Frank' }
    expect(parseTemplate('Hello ${firstName}', meta as any)).toBe('Hello Frank')

  })

  it('should handle multiple tokens within the same template', () => {

    const meta = { firstName: 'Frank', lastName: 'Jones' }
    expect(parseTemplate('Hello ${firstName} ${lastName}', meta as any)).toBe('Hello Frank Jones')

  })

  it('should handle tokens with a nested object ', () => {

    const meta = { user: { firstName: 'Frank' } }
    expect(parseTemplate('Hello ${user.firstName}', meta as any)).toBe('Hello Frank')

  })

  it('should return an empty string when the template tries to unwrap an object', () => {

    const meta = { user: { firstName: 'Frank' } }
    expect(parseTemplate('Hello ${user}', meta as any)).toBe('Hello ')

  })

  it('should replace undefined values with an empty string', () => {

    const meta = {}
    expect(parseTemplate('Hello ${user.firstName}', meta as any)).toBe('Hello ')

  })

  it('should replace undefined values with an empty string', () => {

    const meta = {}
    expect(parseTemplate('Hello ${user.firstName}', meta as any)).toBe('Hello ')

  })

  it('should replace null values with an empty string', () => {

    const meta = { user: { firstName: null } }
    expect(parseTemplate('Hello ${user.firstName}', meta as any)).toBe('Hello ')

  })

  it('should support a fallback value using the || operator', () => {

    const meta = { user: { nickName: null, firstName: 'Joe' } }
    expect(parseTemplate('Hello ${user.nickName || user.firstName}', meta as any)).toBe('Hello Joe')

  })

  it('should support a fallback resulting in a quoted string', () => {

    const meta = { user: { firstName: null } }
    expect(parseTemplate('Hello ${user.firstName || "there!"}', meta as any)).toBe('Hello there!')

  })

  it('should return null for an undefined template', () => {

    expect(parseTemplate(undefined, {} as any)).toBe(null)

  })

  it('should return null for a null template', () => {

    expect(parseTemplate(null, {} as any)).toBe(null)

  })

  it('should ignore a template without any tokens', () => {

    expect(parseTemplate('Hello world', {} as any)).toBe('Hello world')

  })

  it('does not allow access to global variables', () => {

    expect(parseTemplate('Hello ${window}', {} as any)).toBe('Hello ')

  })

  it('does not allow access to the property value non-primitives', () => {

    const meta = { firstName: 'Frank' }
    expect(parseTemplate('Hello ${firstName.toString}', meta as any)).toBe('Hello ')

  })

  it('coherces number values to strings', () => {

    const meta = { count: 121 }
    expect(parseTemplate('Sales: ${count}', meta as any)).toBe('Sales: 121')

  })

  it('supports zero value numerics', () => {

    const meta = { count: 0 }
    expect(parseTemplate('Sales: ${count}', meta as any)).toBe('Sales: 0')

  })

})
