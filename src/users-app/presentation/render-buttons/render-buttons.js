
import './render-buttons.css'
/**
 * 
 * @param {HTMLDivElement} element 
 */

import usersStore from "../../store/users-store"
import { renderTable } from '../render-table/render-table'


export const renderButtons = (element) => {

    const nextButton = document.createElement('button')
    nextButton.innerText = ' Next >'

    const prevButton = document.createElement('button')
    prevButton.innerText = '< Prev '

    const currentPageLabel = document.createElement('span')
    currentPageLabel.id='current-page'
    currentPageLabel.innerText= usersStore.getCurrentPage()
    
    element.append(prevButton, currentPageLabel, nextButton)

    const buttons = [prevButton, nextButton]

    buttons.forEach( button => {
        button.addEventListener('click', async ({target})=> {
            if(target.innerHTML.includes('Next')){
                await usersStore.loadNextPage()
                renderTable()
                currentPageLabel.innerText= usersStore.getCurrentPage()
                return
            }
            await usersStore.loadPreviousPage()
            renderTable()
            currentPageLabel.innerText= usersStore.getCurrentPage()
        } )
    } )

}   