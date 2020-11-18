import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
  position: relative;
  margin-bottom: 130px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
`;

export const BackButton = styled.TouchableOpacity`
  /* position: absolute;
  left: 24px;
  top: 64px; */
  margin-top: 250px;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 2px;
`;
export const UserAvatar = styled.Image`
  width: 140px;
  height: 140px;
  border-radius: 70px;
  /* EU QUE MODIFIQUEI DO ORIGINAL */
  /* margin-top: 140px; */
  align-self: center;
`;
