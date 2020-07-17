import * as _ from 'lodash';

export const parseTemplate = <T extends Record<string, any>>(template: string | null | undefined, meta: T): string | null => {

  if (typeof template !== 'string') {
    return null
  }

  const tokens = template.match(/\${([a-z]|[0-9]|\.|_|\s|\|\||(".*"))+}/gi)

  if (!tokens) {
    return template
  }

  return tokens?.reduce((accumulator, token) => {

    const tokenSegments = token
      .replace(/\${|}/g, '')
      .replace(/ /g, '')
      .split('||')

    for (const tokenSegment of tokenSegments) {

      if (new RegExp(/^".*"$/).test(tokenSegment)) {

        let quotedStringValue = tokenSegment.replace(/^"/, '').replace(/"$/, '')
        return accumulator.replace(token, quotedStringValue)
      }

      let paramValue = _.get(meta, tokenSegment)
      if (['number', 'string'].includes(typeof paramValue)) {
        return accumulator.replace(token, paramValue)
      }

    }

    return accumulator.replace(token, '')

  }, template)

}
