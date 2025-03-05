"use client"

import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import useSWRSubscription from 'swr/subscription'

export function useCategories() {
    const db = getFirestore();
    const auth = getAuth();

    const { data, error } = useSWRSubscription(['categories'], ([path], { next }) => {
        const ref = collection(db, path);

        const unsub = onSnapshot(ref, (snaps) => {
            next(null, snaps.docs.map((v) => v.data()))
        }, (error) => {
            next(error?.message)
        })
        return () => unsub();
    })

    return {
        data,
        error,
        isLoading: data === undefined ? true : false,
    }
}

export const getCategory = async (id) => {
    const db = getFirestore();
    return await getDoc(doc(db, `categories/${id}`));
}