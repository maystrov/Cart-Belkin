class Element {
    constructor(tag, attributes, handlers, content) {
        this.elem = document.createElement(tag)


        for (const attrKey in attributes) {
            if (attrKey === 'className') {
                attributes[attrKey].forEach(el => this.elem.classList.add(el))
                continue;
            }
            this.elem.setAttribute(attrKey, attributes[attrKey])
        }

        for (const handlerKey in handlers) {
            this.elem.addEventListener(handlerKey, handlers[handlerKey])
        }

        if(content) {
            this.elem.textContent = content;
        }
    }

    render(parentSelector) {
        if(parentSelector) {
            document.querySelector(parentSelector).appendChild(this.elem)
        }
    }
}

// const myElem = new Element('div', {
//     className: ['items','someClass'],
//     id: 'myId'
//     },
//     {
//         click: function(){
//             alert('Success!!!')
//         }
//     },
//     'some content'
// )

// myElem.render('#main')


