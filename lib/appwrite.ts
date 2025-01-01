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
    const redirectUri = Linking.createURL("/");  //creating a redirect URL

    //create OAuth2 token
    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );
    if (!response) throw new Error("Create OAuth2 token failed");

    //open the browser to authenticate
    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );
    if (browserResult.type !== "success")
      throw new Error("Create OAuth2 token failed");
    
    //parse the URL
    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();
    if (!secret || !userId) throw new Error("Create OAuth2 token failed");

    //create a session
    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create session");

    return true;

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
      };
    }
    
    return null;
  } catch (error) {
    console.error('Failed to get user:', error);
    return null;
  }
}



  

