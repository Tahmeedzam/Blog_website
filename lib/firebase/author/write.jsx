import { setDoc, Timestamp, doc, updateDoc, deleteDoc, collection } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

export const createNewAuthor = async ({ data }) => {
    const db = getFirestore();

    if (!data?.name) {
        throw new Error("Name is undefined");
    }

    const id = doc(collection(db, 'ids')).id;
    const firestoreRef = doc(db, `authors/${id}`);
    await setDoc(firestoreRef, {
        ...data,
        id: id,
        timestamp: Timestamp.now(),
    });
}
export const updateAuthor = async ({ data }) => {
    const db = getFirestore();

    if (!data?.name) {
        throw new Error("Name is undefined");
    }

    const firestoreRef = doc(db, `authors/${data?.id}`);
    await updateDoc(firestoreRef, {
        ...data,
        timestamp: Timestamp.now(),
    });
}

export const deleteAuthor = async (id) => {
    const db = getFirestore();
    if (!id) {
        throw new Error("Id is required")
    }
    await deleteDoc(doc(db, `authors/${id}`))
}
