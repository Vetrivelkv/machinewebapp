
//checks whether user is logged in or not for route authentication
export const isLogin = () => {
    if (localStorage.getItem('token')) {
        return true;
    }

    return false;
}
//checks whether user is logged in or not for route authentication