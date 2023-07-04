import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {sizes} from '../theme'

const Comment = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/avatar1.png')}
        style={styles.avatar}
      />
      <View style={styles.details}>
        <View style={styles.initials}>
          <Text style={styles.name}>안녕 나 응애</Text>
          <Image source={require('../../assets/images/check.png')} style={{height: 14, width: 14}} />
          <Text style={styles.tag}>1일전</Text>
        </View>
        <Text style={styles.description}>
          어머 제가 있던 테이블이 제일 반응이 좋았나보네요🤭 
          우짤래미님도 아시겠지만 저도 일반인 몸매 그 이상도 이하도
          아니잖아요?! 그런 제가 기꺼이 도전해봤는데 생각보다
          괜찮았어요! 오늘 중으로 라이브 리뷰 올라온다고 하니
          꼭 봐주세용~!
        </Text>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerBtn}>
            <Image source={require('../../assets/images/heart.png')} style={styles.footerIcon} />
            <Text style={styles.footerIconText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerBtn}>
            <Image source={require('../../assets/images/comment.png')} style={styles.footerIcon} />
            <Text style={styles.footerIconText}>5</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Comment

const styles = StyleSheet.create({
  container: {
    padding: sizes.padding,
    flexDirection: 'row',
    gap: 10
  },
  avatar: {
    width: sizes.width * 0.10,
    height: sizes.width * 0.10,
  },
  details: {
    gap: 10,
    paddingTop: 12,
    flex: 1,
  },
  initials: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  name: {
    fontWeight: '700'
  },
  tag: {
    fontSize: 10
  },
  description: {
    color: '#313B49',
    fontSize: 12
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  footerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3
  },
  footerIcon: {
    height: 14,
    width: 14,
    resizeMode: 'contain'
  },
  footerIconText: {
    color: '#919EB6',
    fontSize: 10
  }
})