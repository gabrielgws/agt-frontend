import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { SafeAreaView } from 'react-native-safe-area-context';


const colorScheme = 'light';
const {azulPadrao, borderColorPadrao, text, background} = Colors[colorScheme];

export default function BlogPost() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`https://agtonline.com.br/wp-json/wp/v2/posts/${id}?_embed`);
        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error('Erro ao buscar post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  if (!post) {
    return <Text>Post não encontrado.</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.buttonBack}>
          <IconSymbol size={16} name="arrow.backward" style={{color: 'red'}} color="#ECEDEE" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.titleBlog}>
          {post.title.rendered}
        </Text>
          <RenderHtml contentWidth={width} source={{ html: post.content.rendered }}
            tagsStyles={{
              p: {color: '#ECEDEE', fontSize: 16, lineHeight: 20},
              h1: {fontSize: 24},
              h2: {color: '#ECEDEE', fontSize: 22, fontWeight: 'bold', marginTop: 30, marginBottom: 10},
              h3: {color: '#ECEDEE', fontSize: 20, fontWeight: 'bold', marginTop: 30, marginBottom: 10},
              h4: {color: '#ECEDEE', fontSize: 18, fontWeight: 'bold', marginTop: 30, marginBottom: 10},
              a: {color: '#ECEDEE'},
              img: {marginVertical: 30},
            }}
          />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: azulPadrao
  },
  container: {
    flex: 1, 
    padding: 20,
  },
  buttonBack:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  backText: {
    color: '#ECEDEE'
  },
  titleBlog: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#ECEDEE'
  },
});
