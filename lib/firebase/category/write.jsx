import { setDoc, Timestamp, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

export const createNewCategory = async ({ data }) => {
    const db = getFirestore();

    if (!data?.name) {
        throw new Error("Name is undefined");
    }

    if (!data?.slug) {
        throw new Error("Slug is undefined");
    }

    const firestoreRef = doc(db, `categories/${data?.slug}`);
    await setDoc(firestoreRef, {
        ...data,
        id: data?.slug,
        timestamp: Timestamp.now(),
    });
}
export const updateCategory = async ({ data }) => {
    const db = getFirestore();

    if (!data?.name) {
        throw new Error("Name is undefined");
    }

    if (!data?.slug) {
        throw new Error("Slug is undefined");
    }

    const firestoreRef = doc(db, `categories/${data?.id}`);
    await updateDoc(firestoreRef, {
        ...data,
        timestamp: Timestamp.now(),
    });
}

export const deleteCategory = async (id) => {
    const db = getFirestore();
    if (!id) {
        throw new Error("Id is required")
    }
    await deleteDoc(doc(db, `categories/${id}`))
}
