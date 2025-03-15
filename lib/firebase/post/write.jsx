import { setDoc, Timestamp, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

export const createNewPost = async ({ data }) => {
    const db = getFirestore();

    if (data?.name) {
        throw new Error("Name is missing");
    }

    if (!data?.slug) {
        throw new Error("Slug is undefined");
    }
    if (!data?.content) {
        throw new Error("Content is undefined");
    }

    const firestoreRef = doc(db, `posts/${data?.slug}`);
    await setDoc(firestoreRef, {
        ...data,
        id: data?.slug,
        content: data?.content,
        timestamp: Timestamp.now(),
    });
}
export const updatePost = async ({ data }) => {
    const db = getFirestore();

    if (data?.name) {
        throw new Error("Name is undefined");
    }

    if (!data?.slug) {
        throw new Error("Slug is undefined");
    }

    const firestoreRef = doc(db, `posts/${data?.id}`);
    await updateDoc(firestoreRef, {
        ...data,
        content: data?.content,
        timestamp: Timestamp.now(),
    });
}

export const deletePost = async (id) => {
    const db = getFirestore();
    if (!id) {
        throw new Error("Id is required")
    }
    await deleteDoc(doc(db, `posts/${id}`))
}
