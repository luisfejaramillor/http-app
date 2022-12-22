
/**
 * @returns {Object} quote info
 */


const fetchQuote = async ()=> {
    const res = await fetch('https://api.quotable.io/random')
    const data = await res.json()
    return data
}


/**
 * 
 * @param {HTMLDivElement} element
 */

export const BreakingBadApp = async (element)=> {
    document.querySelector('#app-title').innerHTML='Breaking bad App'
    element.innerHTML='...Loading'

    const quoteLabel = document.createElement('blockquote')
    const authorLabel = document.createElement('h3')
    const nextQuoteButton = document.createElement('button')
    nextQuoteButton.innerText= 'Next Quote'

    const renderQuote = (data)=> {
        quoteLabel.innerHTML= data.content
        authorLabel.innerHTML= data.author
        element.replaceChildren(quoteLabel, authorLabel, nextQuoteButton)
    }

    nextQuoteButton.addEventListener('click', async ()=> {
        element.innerHTML='...Loading'
        renderQuote(await fetchQuote())
    } )


    fetchQuote().
    then(renderQuote);

    
    
}