import { create } from "zustand";

const useHandleModal = create((set) => ({
    isOpened: false,
    setOpenModalHook: () => set({isOpened: true}),
    setCloseModalHook: () => set({isOpened: false})
}))
export default useHandleModal