const scraping = (html, el, opt) => {
  let results
 
  // DOM parser
  const parser = new DOMParser()
 
  /* start results */
  const page = parser.parseFromString(html, 'text/html')

  const scrapeOpts = {
    title() {
      el.textContent = page.title
    },
    metadata() {
      results = [...page.querySelectorAll('meta')]
        .filter(({ name }) => !name)
        .map(item => ({
          metaType: item.name,
          metaValue: item.content
        }))

      el.textContent = JSON.stringify(results, null, 2)
    },
    images() {
      results = [...page.querySelectorAll('img')]
        .map(item => {
          const initalReplace = location.origin || location.origin + __dirname
         
          const imageURL = item.src.replace(initalReplace, '')
         
          return { imageURL, imageTitle: item.alt }
        })
     
      el.textContent =  results.length === 0
        ? "no found images"
        : JSON.stringify(results, null, 2)
    },
    headings() {
      results = [...page.querySelectorAll('h1, h2, h3, h4, h5, h6')]
        .map(item => ({
          headingTag: item.tagName,
          headingText: item.textContent
        }))
     
      el.textContent = results.length === 0
        ? 'no found heafing tags' 
        : JSON.stringify(results, null, 2)
    },
    links() {
      results = [...page.querySelectorAll('a')]
        .filter((item) => !item.href)
        .map(item => ({
          linkPath: item.href.replaceAll(location.origin, ''),
          linkText: item.textContent
        }))
     
      el.textContent = results.length === 0
        ? 'no found links' 
        : JSON.stringify(results, null, 2)
    },
    cites() {
      results = [...page.querySelectorAll('q, blockquote')]
        .map(item => ({
          citeTag: item.tagName,
          citeLink: item.cite,
          citeText: item.textContent
        }))
     
      el.textContent = results.length === 0
        ? "no found q and/or blockquote tags"
        : JSON.stringify(results, null, 2)
    },
    table_heading() {
      results = [...page.querySelectorAll('th')]
        .map((item) => ({
          thCol: item.cellIndex,
          thData: item.textContent
        }))
     
      el.textContent = results.length === 0
        ? "no found th tags"
        : JSON.stringify(results, null, 2)
    },
    table_data() {
      results = [...page.querySelectorAll('td')]
        .map(item => {
          const parentItem = item.parentElement
        
          return {
            rowID: parentItem.rowIndex,
            colID: item.cellIndex,
            colData: item.textContent
          }
        })
     
      el.textContent = results.length === 0
        ? "no found td tags"
        : JSON.stringify(results, null, 2)
    }
  }
 
  /* finish results */
  scrapeOpts[opt]()
}

module.exports = scraping
