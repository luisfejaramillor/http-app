
import modalHtml from './render-modal.html?raw'
import "./render-modal.css";
import { getUserById } from '../../use-cases/get-user-by-id';

let modal, form;
let loadedUser = {}
/**
 * 
 * @param {HTMLDivElement} element 
 * @param {(userLike)=> Promise<void> } saveUserCallback
 */

/**
 * @param {String|Number} id
 */


export const showModal = async(id)=> {
    modal?.classList.remove('hidden')
    if(!id)return
    const user = await getUserById(id)
    setFormValues(user)
}

export const hideModal = ()=> {
    modal?.classList.add('hidden')
    form?.reset()
}

/**
 * 
 * @param {User} user 
 */

const setFormValues = (user)=> {
    form.querySelector('[name="firstName"]').value=user.firstName
    form.querySelector('[name="lastName"]').value=user.lastName
    form.querySelector('[name="balance"]').value=user.balance
    form.querySelector('#is-active').checked=user.isActive
    loadedUser = user
}

export const renderModal = (element, saveUserCallback) => {

    if(modal) return;

    modal = document.createElement('div')
    modal.innerHTML= modalHtml
    modal.className ='modal-container hidden'
    form = modal.querySelector('form')

    modal.addEventListener('click', ({target})=>{
        target.classList.contains('modal-container') && hideModal()
    })

    form.addEventListener('submit', async (e)=> {
        e.preventDefault()

        const formData = new FormData(form)
        const userLike = {...loadedUser} 


        for (const [key, value] of formData) {
            if(key ==='balance'){
                userLike[key] = +value
                continue
            }

            if(key === 'isActive'){
                userLike[key] = (value === 'on') ? true: false
                continue
            }

            userLike[key] = value
        }
        await saveUserCallback(userLike)
        hideModal()
    })

    element.append(modal)
}