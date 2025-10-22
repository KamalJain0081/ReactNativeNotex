import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const guidelineBaseWidth = 375;

const scale = (size) => (SCREEN_WIDTH / guidelineBaseWidth) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const NoteCard = ({
  title,
  description,
  isPrivate,
  isNotifiable,
  noteColor,
  noteID,
  maxID,
}) => {
  const getShortDescription = (desc) => {
    if (typeof desc !== 'string') return '';
    const words = desc.trim().split(/\s+/);
    if (words.length <= 22) return desc;
    return words.slice(0, 22).join(' ') + '...';
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    const delay = (maxID - noteID) * 80;

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
    ]).start();
  }, [noteID, maxID]);

  return (
    <Animated.View
      style={[
        styles.card,
        { backgroundColor: noteColor },
        {
          opacity: fadeAnim,
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={styles.headerRow}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <View style={styles.icons}>
          {isNotifiable && (
            <Ionicons
              name="notifications-outline"
              size={moderateScale(18)} // slightly smaller
              color="#555"
              style={styles.icon}
            />
          )}
          {isPrivate && (
            <MaterialIcons
              name="lock"
              size={moderateScale(18)} // slightly smaller
              color="#555"
              style={styles.icon}
            />
          )}
        </View>
      </View>
      <Text style={styles.description}>
        {getShortDescription(description)}
      </Text>
    </Animated.View>
  );
};

NoteCard.defaultProps = {
  description: '',
  noteColor: '#fff',
  maxID: 100,
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: moderateScale(15),
    marginBottom: moderateScale(15),
    borderRadius: moderateScale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: moderateScale(3),
    elevation: 5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: moderateScale(8), // slightly less spacing
  },
  title: {
    fontFamily: 'Lora-Regular',
    fontSize: moderateScale(16), // reduced from 18 to 16
    fontWeight: 'bold',
    color: '#222',
    flex: 1,
    flexWrap: 'wrap',
  },
  description: {
    marginTop: moderateScale(8), // reduced spacing
    fontSize: moderateScale(12), // reduced from 14 to 12
    color: '#555',
  },
});

export default NoteCard;
