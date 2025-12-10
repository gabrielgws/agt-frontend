import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const colorScheme = 'light';
const {azulPadrao, borderColorPadrao, text, background} = Colors[colorScheme];

export default function BlogScreen() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchPosts = async () => {
    try {
      const res = await fetch('https://agtonline.com.br/wp-json/wp/v2/posts?_embed'); 
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0084bb" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          // <TouchableOpacity 
          //   style={styles.container}
          //   onPress={() => router.push(`/pages/blog/${item.id}`)}
          // >
          <TouchableOpacity style={styles.container} onPress={() => router.push(`/blog/${item.id}`)}>
            {item._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
              <Image
                source={{ uri: item._embedded['wp:featuredmedia'][0].source_url }}
                style={{ width: '100%', height: 180, borderRadius: 8, marginBottom: 8 }}
              />
            )}
            <Text style={styles.titleBlog}>{item.title.rendered}</Text>
            <Text numberOfLines={2} style={styles.textBlog}>
              {item.excerpt.rendered.replace(/<[^>]+>/g, '')}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: azulPadrao
  },
  container: {
    display: 'flex',
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: azulPadrao,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  titleBlog: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#ECEDEE'
  },
  textBlog: {
    fontSize: 16,
    color: '#ECEDEE'
  }
});