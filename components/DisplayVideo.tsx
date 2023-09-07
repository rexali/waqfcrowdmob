import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Video} from 'expo-av';

export default function DisplayVideo({
    url
}: { 
    url: any
}) {

    let [status, setStatus] = React.useState<any>({})
    const video = React.useRef<any>(null);

    const resizeMode: any = 'contain';
    // https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4

    return <>{url && (
        <View style={styles.container}>
            <Video
                ref={video}
                style={styles.video}
                source={{
                    uri: url,
                }}
                useNativeControls={true}
                resizeMode={resizeMode}
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            <View style={{ marginBottom: 5 }} >
                <Button
                    title={status.isPlaying ? 'Pause' : 'Play'}
                    onPress={() => status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                    }
                />
            </View>

        </View>)
    }</>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // margin: 10,
    },
    video: {
        position: 'relative',
        width: '100%',
        aspectRatio: 3 / 2,
    },
    buttons: {},
}); 