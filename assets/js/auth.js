const ADMIN_SESSION_KEY = "adminSession";

async function loginGoogle() {

    try {

        const provider =
            new firebase.auth.GoogleAuthProvider();

        const result =
            await auth.signInWithPopup(
                provider
            );

        const user =
            result.user;

        localStorage.setItem(
            "googleUser",
            JSON.stringify({
                uid: user.uid,
                nama: user.displayName,
                email: user.email
            })
        );

        console.log(
            "Login berhasil:",
            user.email
        );

        return user;

    } catch (error) {

        console.error(error);

        throw error;

    }

}

function loginAdmin() {

    localStorage.setItem(
        ADMIN_SESSION_KEY,
        "true"
    );

}

function logoutAdmin() {

    localStorage.removeItem(
        ADMIN_SESSION_KEY
    );

    auth.signOut();

    location.href =
        "login.html";

}

function isAdminLoggedIn() {

    return (
        localStorage.getItem(
            ADMIN_SESSION_KEY
        ) === "true"
    );

}
