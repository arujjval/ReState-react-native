import { Client, Account, Databases, Storage, Avatars, OAuthProvider } from 'react-native-appwrite';
import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';

export const config = {
    platform: 'com.restate',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    project: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}

const client = new Client();

client
  .setEndpoint(config.endpoint!) 
  .setProject(config.project!)
  .setPlatform(config.platform!);

export const avatars = new Avatars(client);
export const account = new Account(client);

export async function login() {
  try {
    const redirectUri = Linking.createURL('/');

    const authUrl = await account.createOAuth2Session(
      OAuthProvider.Google, 
      redirectUri,
      redirectUri
    );

    if(!authUrl) throw new Error('Failed to create OAuth2 session');

    console.log('authUrl: ' + authUrl.toString() + '\n redirect: ' + redirectUri);

    const result = await openAuthSessionAsync(authUrl.toString(), redirectUri);

    if (result.type === 'success') {
      console.log('Login successful:', result);
      return true;
    } else {
      throw new Error('OAuth login canceled or failed');
    }
  } catch (error) {
    console.log('Login failed:', error);
    return false;
  }
}

export async function logout() {
  try {
    await account.deleteSession('current');
    console.log('Logout successful');
    return true;
  } catch (error) {
    console.error('Logout failed:', error);
    return false;
  }
};

export async function getCurrentUser() {
  try {
    const response = await account.get();

    if (response.$id) {
      const userAvatar = avatars.getInitials(response.name);
      
      return {
        ...response,
        avatar: userAvatar.toString(),
      }
    }

  } catch (error) {
    console.error('Failed to get user:', error);
    return null;
  }
}



  

