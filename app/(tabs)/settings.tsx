import {StyleSheet, View, Text, Switch, TouchableOpacity, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNotifications} from '@/hooks/use-notifications';
import {useNotificationsStore} from '@/stores/notificationsStore';
import {useState} from 'react';

const AVAILABLE_QUERIES = ['mobile', 'android', 'ios', 'react', 'javascript', 'python', 'web'];

export default function SettingsScreen() {
    const {permissionStatus, requestPermissions} = useNotifications();
    const {
        enabled,
        preferredQueries,
        setEnabled,
        addPreferredQuery,
        removePreferredQuery,
    } = useNotificationsStore();
    const [isRequesting, setIsRequesting] = useState(false);

    const handleToggleNotifications = async (value: boolean) => {
        if (value && permissionStatus !== 'granted') {
            setIsRequesting(true);
            const granted = await requestPermissions();
            setIsRequesting(false);
            if (!granted) {
                return; // Don't enable if permission was denied
            }
        }
        setEnabled(value);
    };

    const handleToggleQuery = (query: string) => {
        if (preferredQueries.includes(query)) {
            removePreferredQuery(query);
        } else {
            addPreferredQuery(query);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Push Notifications</Text>
                    <Text style={styles.sectionDescription}>
                        Stay informed about the latest articles that match your interests. We'll send you
                        notifications when new articles are published on topics you care about, so you never
                        miss important updates. You have full control over which topics you want to be
                        notified about.
                    </Text>

                    <View style={styles.settingRow}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingLabel}>Enable notifications</Text>
                            <Text style={styles.settingDescription}>
                                {permissionStatus === 'granted'
                                    ? 'Permissions granted'
                                    : permissionStatus === 'denied'
                                      ? 'Permissions denied'
                                      : 'Permissions not requested'}
                            </Text>
                        </View>
                        <Switch
                            value={enabled && permissionStatus === 'granted'}
                            onValueChange={handleToggleNotifications}
                            disabled={isRequesting}
                        />
                    </View>

                    {permissionStatus !== 'granted' && (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={requestPermissions}
                            disabled={isRequesting}>
                            <Text style={styles.buttonText}>Request permissions</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {enabled && permissionStatus === 'granted' && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Article Preferences</Text>
                        <Text style={styles.sectionDescription}>
                            Select the topics you want to receive notifications about:
                        </Text>

                        {AVAILABLE_QUERIES.map((query) => (
                            <View key={query} style={styles.settingRow}>
                                <Text style={styles.settingLabel}>
                                    {query.charAt(0).toUpperCase() + query.slice(1)}
                                </Text>
                                <Switch
                                    value={preferredQueries.includes(query)}
                                    onValueChange={() => handleToggleQuery(query)}
                                />
                            </View>
                        ))}

                        {preferredQueries.length === 0 && (
                            <Text style={styles.warningText}>
                                Select at least one topic to receive notifications.
                            </Text>
                        )}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#000',
    },
    sectionDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
        lineHeight: 20,
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    settingInfo: {
        flex: 1,
        marginRight: 16,
    },
    settingLabel: {
        fontSize: 16,
        color: '#000',
        marginBottom: 4,
    },
    settingDescription: {
        fontSize: 12,
        color: '#666',
    },
    button: {
        backgroundColor: '#0a7ea4',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 16,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    warningText: {
        fontSize: 14,
        color: '#FF9800',
        marginTop: 16,
        fontStyle: 'italic',
    },
});

