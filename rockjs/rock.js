const defaultOptionsList = {
    btn: {
        parent: "body",
        title: "Button",
        class: [],
        theme: "default",
        css: {},
        events: {}
    },
    bq: {
        parent: "body",
        text: "This is a blockquote",
        class: [],
        theme: "default",
        css: {},
        events: {},
        cite: "",
    },
}

export const Modules = {
    btn: (id=null, options=null) => {
        if (id !== null) {
            const element = document.createElement('button');
            element.id = id;
            if (options !== null) {
                useOptions(element, options, defaultOptionsList.btn);
            } else {
                useOptions(id, defaultOptionsList.btn, defaultOptionsList.btn);
            }
        } else {
            console.error("Error: Modules.btn() missing id")
        }
    },
    blockquote: (id=null, options=null) => {
        if (id !== null) {
            const element = document.createElement('blockquote');
            element.id = id;
            if (options !== null) {
                useOptions(element, options, defaultOptionsList.bq);
            } else {
                useOptions(id, defaultOptionsList.bq, defaultOptionsList.bq);
            }
        } else {
            console.error("Error: Modules.blockquote() missing id")
        }
    },

}

function useOptions(element, options, defaultOptions) {
    const id = element.id;
    if (options.parent) {
        document.querySelector(options.parent).appendChild(element)
    } else if (defaultOptions.parent) {
        document.querySelector(defaultOptions.parent).appendChild(element)
    }
    
    if (options.title) {
        document.getElementById(id).innerHTML = options.title
    } else if (defaultOptions.title) {
        document.getElementById(id).innerHTML = defaultOptions.title
    }

    if (options.class) {
        options.class.forEach(element => {
            document.getElementById(id).classList.add(element)
        });
    } else if (defaultOptions.class) {
        defaultOptions.class.forEach(element => {
            document.getElementById(id).classList.add(element)
        });
    }
    const nodeName = element.nodeName.toLowerCase()
    if (options.theme) {
        document.getElementById(id).classList.add(options.theme+"-theme")
        updateThemes(options.theme, nodeName)
    } else if (defaultOptions.theme) {
        document.getElementById(id).classList.add(defaultOptions.theme+"-theme")
        updateThemes(defaultOptions.theme, nodeName)
    } else {
        document.getElementById(id).classList.add("default-theme")
        updateThemes("default", nodeName)
    }

    if (options.css) {
        for (const key in options.css) {
            if (options.css.hasOwnProperty(key)) {
              document.getElementById(id).style[key] = options.css[key]
            }
        }
    } else if (defaultOptions.css) {
        for (const key in defaultOptions.css) {
            if (defaultOptions.css.hasOwnProperty(key)) {
              document.getElementById(id).style[key] = defaultOptions.css[key]
            }
        }    
    }

    if (options.events) {
        for (const key in options.events) {
            if (options.events.hasOwnProperty(key)) {
              document.getElementById(id).addEventListener(key, options.events[key], false)
            }
        }
    } else if (defaultOptions.title) {
        for (const key in defaultOptions.events) {
            if (defaultOptions.events.hasOwnProperty(key)) {
              document.getElementById(id).addEventListener(key, defaultOptions.events[key], false)
            }
        }
    }

    if (options.text) {
        document.getElementById(id).innerHTML = options.text
    } else if (defaultOptions.text) {
        document.getElementById(id).innerHTML = defaultOptions.text
    }

    if (options.cite) {
        document.getElementById(id).attributes.cite = options.cite
    } else if (defaultOptions.text) {
        document.getElementById(id).attributes.cite = defaultOptions.cite
    }


}

const Styles = {
    button: {
        default: `
        button.default-theme {
            background: white;
            border: 0.5px solid #202020;
            border-radius: 5px;
            padding: 7px 12px 7px 12px;
            font-size: 15px;
            color: #202020;
            font-family: arial;
        }

        button.default-theme:hover {
            background: #f1f1f1;
            cursor: pointer;
        }
        `,
    },
    blockquote: {
        default: `
        blockquote.default-theme {
            background: white;
            border-left: 3px solid #232323;
            padding: 7px 12px 7px 12px;
            font-size: 15px;
            color: #202020;
            font-family: arial;
            margin-left: 20px;
        }
        `,
    }
}

function updateThemes(theme, type) {
    if (document.getElementById('themes-styles-css')) {
        const x = Styles[type]
        document.getElementById('themes-styles-css').innerHTML = document.getElementById('themes-styles-css').innerHTML + `\n${x[theme]}`
    } else {
        document.body.innerHTML = document.body.innerHTML + `
            <style id="themes-styles-css">

            </style>
        `
        const x = Styles[type]
        document.getElementById('themes-styles-css').innerHTML = `\n${x[theme]}`
    }
}
