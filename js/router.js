window.addEventListener('hashchange', hashChange)

window.location.hash = '/login'

function hashChange (e) {
    console.log('hashChange', e)
}

window.addEventListener('popState', popStateChange)

// window.location.pathname = '/'

function popStateChange (e) {
    console.log('popStateChange', e)
}

