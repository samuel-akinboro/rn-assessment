import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, EmitterSubscription, Keyboard, KeyboardEvent } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { sizes } from '../theme';

const CommentForm = () => {
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const onKeyboardShow = (event: KeyboardEvent) => setTimeout(() => {setKeyboardOffset(event.endCoordinates.height)}, 400);
  const onKeyboardHide = () => setKeyboardOffset(0);
  const keyboardDidShowListener = useRef<EmitterSubscription>();
  const keyboardDidHideListener = useRef<EmitterSubscription>();

  useEffect(() => {
    keyboardDidShowListener.current = Keyboard.addListener('keyboardWillShow', onKeyboardShow);
    keyboardDidHideListener.current = Keyboard.addListener('keyboardWillHide', onKeyboardHide);

    return () => {
      keyboardDidShowListener.current!.remove();
      keyboardDidHideListener.current!.remove();
    };
  }, []);

  return (
    <View style={[styles.container, {position: keyboardOffset === 0 ? 'relative' : 'absolute', bottom: keyboardOffset === 0 ? 0 : keyboardOffset, width: sizes.width}]}>
      <TouchableOpacity>
        <Image source={require('../../assets/images/image-icon.png')} style={styles.pickImageIcon} />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder='댓글을 남겨주세요.'
      />
      <TouchableOpacity>
        <Text style={styles.sendBtnText}>등록</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CommentForm

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#fff'
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#AFB9CA',
    fontSize: 12,
    paddingHorizontal: 15
  },
  pickImageIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
  sendBtnText: {
    color: '#919EB6',
    fontSize: 12
  }
})