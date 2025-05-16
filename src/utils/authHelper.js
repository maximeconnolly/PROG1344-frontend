export const isUserAdmin = (user) => {
    return user.group.includes('admin');

}
export const isUserSuperUser = (user) => {
    return user.group.includes('superuser');

}

export const isUserGuest = (user) => {
    return user.group.includes('guest');

}