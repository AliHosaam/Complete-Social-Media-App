import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  createPostComment,
  fetchPostDetails,
  removePost,
  removePostComment,
} from "../../services/postService";
import { hp, wp } from "../../helpers/common";
import { theme } from "../../constants/theme";
import PostCard from "../../components/PostCard";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../../components/Loading";
import Input from "../../components/Input";
import Icon from "../../assets/icons";
import CommentItem from "../../components/CommentItem";
import { supabase } from "../../lib/supabase";
import { getUserData } from "../../services/userService";
import { createPostNotification } from "../../services/notificationService";

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [sendButtonIsLoading, setSendButtonIsLoading] = useState(false);

  const inputRef = useRef(null);

  const router = useRouter();
  const { user } = useAuth();

  const { postId, commentId } = useLocalSearchParams();

  const onNewComment = async () => {
    if (!comment) return;

    let data = {
      userId: user?.id,
      postId: post?.id,
      text: comment,
    };

    setSendButtonIsLoading(true);
    let res = await createPostComment(data);
    setSendButtonIsLoading(false);

    if (res.success) {
      if (user?.id !== post?.userId) {
        let notify = {
          senderId: user?.id,
          receiverId: post?.userId,
          title: "Commented on your post",
          data: JSON.stringify({ postId: post?.id, commentId: res?.data?.id }),
        };

        await createPostNotification(notify);
      }

      inputRef?.current?.clear();
      setComment("");
    } else {
      Alert.alert("Comment", res.msg);
    }
  };

  const getPostDetails = async () => {
    const res = await fetchPostDetails(postId);

    if (res.success) setPost(res.data);
    setIsLoading(false);
  };

  const onDelete = async (item) => {
    const res = await removePostComment(item?.id);

    if (res.success) {
      setPost((prev) => {
        let newPost = { ...prev };
        newPost.comments = newPost.comments.filter((c) => c.id !== item?.id);
        return newPost;
      });
    } else {
      Alert.alert("Comment", res.msg);
    }
  };

  const onDeletePost = async (item) => {
    const res = await removePost(item?.id);

    if (res.success) {
      router.back();
    } else {
      Alert.alert("Post", res.msg);
    }
  };

  const onEditPost = async (item) => {
    router.back();
    router.push({ pathname: "newPost", params: { ...item } });
  };

  const handleNewComment = async (payload) => {
    if (payload.new) {
      let newComment = { ...payload.new };
      let res = await getUserData(newComment.userId);

      newComment.user = res.success ? res.data : {};
      setPost((prev) => {
        const updatedComments = [...(prev.comments || []), newComment];

        // Sort by created_at DESC (latest first)
        updatedComments.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        return {
          ...prev,
          comments: updatedComments,
        };
      });
    }
  };

  useEffect(() => {
    let commentChannel = supabase
      .channel("comments")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "comments",
          filter: `postId=eq.${postId}`,
        },
        handleNewComment
      )
      .subscribe();

    getPostDetails();

    return () => {
      supabase.removeChannel(commentChannel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Loading />
      </View>
    );
  }

  if (!post) {
    return (
      <View
        style={[
          styles.center,
          { justifyContent: "flex-start", marginTop: 100 },
        ]}
      >
        <Text style={styles.notFound}>Post not found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        >
          <PostCard
            item={{ ...post, comments: [{ count: post?.comments?.length }] }}
            currentUser={user}
            router={router}
            hasShadow={false}
            showMoreIcon={false}
            showDelete={true}
            onDelete={onDeletePost}
            onEdit={onEditPost}
          />

          {/* comment input */}
          <View style={styles.inputContainer}>
            <Input
              placeholder="Add a comment..."
              placeholderTextColor={theme.colors.textLight}
              containerStyle={{
                flex: 1,
                height: hp(6.2),
                borderRadius: theme.radius.xl,
              }}
              onChangeText={(text) => setComment(text)}
              inputRef={inputRef}
            />

            {sendButtonIsLoading ? (
              <View style={styles.loading}>
                <Loading size="small" />
              </View>
            ) : (
              <TouchableOpacity onPress={onNewComment} style={styles.sendIcon}>
                <Icon name="send" color={theme.colors.primaryDark} />
              </TouchableOpacity>
            )}
          </View>

          {/* comments list */}
          <View style={{ marginVertical: 15, gap: 17 }}>
            {post?.comments?.map((comment) => (
              <CommentItem
                key={comment?.id.toString()}
                item={comment}
                canDelete={
                  user?.id === comment?.userId || user?.id === post?.userId
                }
                // eslint-disable-next-line eqeqeq
                highlight={comment.id == commentId}
                onDelete={onDelete}
              />
            ))}

            {post?.comments?.length === 0 && (
              <Text style={{ color: theme.colors.text, marginLeft: 5 }}>
                Be first to comment!
              </Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default PostDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: wp(7),
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  list: {
    paddingHorizontal: wp(4),
  },
  sendIcon: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.8,
    borderColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    height: hp(5.8),
    width: hp(5.8),
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  notFound: {
    fontSize: hp(2.5),
    color: theme.colors.text,
    fontWeight: theme.fonts.medium,
  },
  loading: {
    height: hp(5.8),
    width: hp(5.8),
    alignItems: "center",
    justifyContent: "center",
    transform: [{ scale: 1.3 }],
  },
});
