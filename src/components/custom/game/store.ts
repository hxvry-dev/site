import { atom, createStore } from 'jotai';

const store = createStore();

const currencyAtom = atom<number>(0);

store.set(currencyAtom, 0);

export { store, currencyAtom };
