import { create } from "zustand"
console.log("clicked")
const useGlobalFetch = create((set) => ({
    refetchDatas: null, // Initially null
    setRefetchDatas: (fn) => set({ refetchDatas: fn }),
}))

export default useGlobalFetch;