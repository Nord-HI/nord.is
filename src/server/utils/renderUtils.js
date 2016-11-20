import ejs from 'ejs'

export const renderEjs = (template, data, optns = {}) =>
  new Promise((resolve, reject) => {
    ejs.renderFile(template, data, optns, (err, str) => {
      if (err) reject(err)
      resolve(str)
    })
  })
