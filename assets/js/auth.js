/*
========================================
AUTH.JS
ADMIN AUTHORIZATION
========================================
*/

const ADMIN_LOGIN_KEY = "adminLoggedIn";

/*
========================================
LOGIN ADMIN
========================================
*/

function loginAdmin() {

    localStorage.setItem(
        ADMIN_LOGIN_KEY,
        "true"
    );

    console.log(
        "✅ Admin Login"
    );

}

/*
========================================
LOGOUT ADMIN
========================================
*/

function logoutAdmin() {

    localStorage.removeItem(
        ADMIN_LOGIN_KEY
    );

    console.log(
        "✅ Admin Logout"
    );

    location.href =
        "login.html";

}

/*
========================================
CHECK LOGIN
========================================
*/

function isAdminLoggedIn() {

    return (
        localStorage.getItem(
            ADMIN_LOGIN_KEY
        ) === "true"
    );

}

console.log(
    "✅ auth.js loaded"
);
