import instanceApi from '../api/backend'

export const authenticate = (data, next) => {
    if (typeof window !== undefined) {
        localStorage.setItem('jwt', JSON.stringify(data))
        next()
    }

}

export const signOut = (next) => {
    if (typeof window !== undefined) {
        localStorage.removeItem('jwt')
        next()
        instanceApi.get('/signout')
            .then(res => { return res })
            .catch(err => console.log(err))
    }
}

export const isAuthenticated = () => {
    if (typeof window == undefined) {
        return false
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'))
    } else {
        return false
    }
}