// Mock react-native-mmkv
jest.mock('react-native-mmkv', () => {
    const mockStorage = new Map<string, string>();
    
    return {
        createMMKV: jest.fn(() => ({
            set: jest.fn((key: string, value: string) => {
                mockStorage.set(key, value);
            }),
            getString: jest.fn((key: string) => {
                return mockStorage.get(key) ?? undefined;
            }),
            remove: jest.fn((key: string) => {
                mockStorage.delete(key);
            }),
        })),
    };
});

// Mock expo-notifications
jest.mock('expo-notifications', () => ({
    setNotificationHandler: jest.fn(),
    getPermissionsAsync: jest.fn(() => Promise.resolve({status: 'granted'})),
    requestPermissionsAsync: jest.fn(() => Promise.resolve({status: 'granted'})),
    scheduleNotificationAsync: jest.fn(() => Promise.resolve('notification-id')),
    addNotificationReceivedListener: jest.fn(),
    addNotificationResponseReceivedListener: jest.fn(),
    setNotificationChannelAsync: jest.fn(),
    AndroidImportance: {
        MAX: 'max',
    },
}));

// Mock expo-device
jest.mock('expo-device', () => ({
    isDevice: true,
}));

// Mock expo-constants
jest.mock('expo-constants', () => ({
    default: {
        expoConfig: {
            extra: {
                eas: {
                    projectId: 'test-project-id',
                },
            },
        },
    },
}));

// Mock @react-native-community/netinfo
jest.mock('@react-native-community/netinfo', () => ({
    default: {
        fetch: jest.fn(() => Promise.resolve({isConnected: true})),
        addEventListener: jest.fn(() => jest.fn()),
    },
}));

