import { db } from "../../firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

export const getAllPosts = async () => {
    const snap = await getDocs(collection(db, "posts"));
    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};


export const getAllPostsWithCategory = async (categoryId) => {
    const q = query(collection(db, 'posts'), where('categoryId', '==', categoryId))
    return await getDocs(q).then((snaps) => snaps.docs.map((d) => d.data()))
}


export const getPost = async (id) => {
    if (!id || typeof id !== "string") {
        console.error("Invalid post ID:", id);
        return null;
    }

    try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
        console.error("Error fetching post:", error);
        return null;
    }
};

