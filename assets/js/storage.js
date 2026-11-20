const COLLECTION_NAME =
    "transactions";

async function saveTransaction(
    data
) {

    const user =
        auth.currentUser;

    if(!user){

        throw new Error(
            "Belum login"
        );

    }

    await db
        .collection("users")
        .doc(user.uid)
        .collection(
            COLLECTION_NAME
        )
        .add(data);

}
