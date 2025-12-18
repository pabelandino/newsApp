import {create} from 'zustand';
import {persist, createJSONStorage, StateStorage} from 'zustand/middleware';
import {createMMKV} from "react-native-mmkv";

const notificationsStorage = createMMKV({
    id: 'notifications-storage',
});

const zustandStorage: StateStorage = {
    setItem: (name, value) => {
        return notificationsStorage.set(name, value);
    },
    getItem: (name) => {
        const value = notificationsStorage.getString(name);
        return value ?? null;
    },
    removeItem: (name) => {
        return notificationsStorage.remove(name);
    },
};

interface NotificationsState {
    enabled: boolean;
    preferredQueries: string[];
    lastCheckedTimestamp: number;
    hasRequestedInitialPermission: boolean;
    setEnabled: (enabled: boolean) => void;
    setPreferredQueries: (queries: string[]) => void;
    addPreferredQuery: (query: string) => void;
    removePreferredQuery: (query: string) => void;
    updateLastCheckedTimestamp: () => void;
    setHasRequestedInitialPermission: (hasRequested: boolean) => void;
}

export const useNotificationsStore = create<NotificationsState>()(
    persist(
        (set, get) => ({
            enabled: false,
            preferredQueries: [],
            lastCheckedTimestamp: Date.now(),
            hasRequestedInitialPermission: false,
            setEnabled: (enabled: boolean) => {
                set({enabled});
            },
            setHasRequestedInitialPermission: (hasRequested: boolean) => {
                set({hasRequestedInitialPermission: hasRequested});
            },
            setPreferredQueries: (queries: string[]) => {
                set({preferredQueries: queries});
            },
            addPreferredQuery: (query: string) => {
                const {preferredQueries} = get();
                if (!preferredQueries.includes(query)) {
                    set({preferredQueries: [...preferredQueries, query]});
                }
            },
            removePreferredQuery: (query: string) => {
                const {preferredQueries} = get();
                set({preferredQueries: preferredQueries.filter((q) => q !== query)});
            },
            updateLastCheckedTimestamp: () => {
                set({lastCheckedTimestamp: Date.now()});
            },
        }),
        {
            name: 'notifications-storage',
            storage: createJSONStorage(() => zustandStorage),
        }
    )
);

