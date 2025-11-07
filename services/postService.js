import { supabase } from "../lib/supabase";
import { uploadFile } from "./imageService";

export const createOrUpdatePost = async (post) => {
  try {
    if (post.file && typeof post.file === "object") {
      let isImage = post?.file?.type === "image";
      let folderName = isImage ? "postImages" : "postVideos";

      let fileResult = await uploadFile(folderName, post?.file?.uri, isImage);

      if (fileResult.success) {
        post.file = fileResult.data;
      } else {
        return fileResult;
      }
    }

    const { data, error } = await supabase
      .from("posts")
      .upsert(post)
      .select()
      .single();

    if (error) {
      console.log("Error creating or updating post:", error);
      return { success: false, msg: error.message };
    }

    return { success: true, data: data };
  } catch (error) {
    console.log("Error creating or updating post:", error);
    return { success: false, msg: error.message };
  }
};

export const fetchPosts = async (limit = 10, userId) => {
  try {
    if (userId) {
      const { data, error } = await supabase
        .from("posts")
        .select(
          "*, user: users (id, name, image), postLikes (*), comments (count)"
        )
        .eq("userId", userId)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) {
        console.log("Error fetching posts:", error);
        return { success: false, msg: error.message };
      }

      return { success: true, data: data };
    } else {
      const { data, error } = await supabase
        .from("posts")
        .select(
          "*, user: users (id, name, image), postLikes (*), comments (count)"
        )
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) {
        console.log("Error fetching posts:", error);
        return { success: false, msg: error.message };
      }

      return { success: true, data: data };
    }
  } catch (error) {
    console.log("Error fetching posts:", error);
    return { success: false, msg: error.message };
  }
};

export const fetchPostDetails = async (postId) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select(
        "*, user: users (id, name, image), postLikes (*), comments (*, user: users (id, name, image))"
      )
      .eq("id", postId)
      .order("created_at", { ascending: false, foreignTable: "comments" })
      .single();

    if (error) {
      console.log("Error fetching posts details:", error);
      return { success: false, msg: error.message };
    }

    return { success: true, data: data };
  } catch (error) {
    console.log("Error fetching posts details:", error);
    return { success: false, msg: error.message };
  }
};

export const createPostLike = async (postLike) => {
  try {
    const { data, error } = await supabase
      .from("postLikes")
      .insert(postLike)
      .select()
      .single();

    if (error) {
      console.log("postLike Error:", error);
      return { success: false, msg: error.message };
    }

    return { success: true, data: data };
  } catch (error) {
    console.log("postLike Error:", error);
    return { success: false, msg: error.message };
  }
};

export const removePostLike = async (postId, userId) => {
  try {
    const { error } = await supabase
      .from("postLikes")
      .delete()
      .eq("postId", postId)
      .eq("userId", userId);

    if (error) {
      console.log("postLike Error:", error);
      return { success: false, msg: error.message };
    }

    return { success: true };
  } catch (error) {
    console.log("postLike Error:", error);
    return { success: false, msg: error.message };
  }
};

export const createPostComment = async (commentData) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .insert(commentData)
      .select()
      .single();

    if (error) {
      console.log("creating comment Error:", error);
      return { success: false, msg: error.message };
    }

    return { success: true, data: data };
  } catch (error) {
    console.log("creating comment Error:", error);
    return { success: false, msg: error.message };
  }
};

export const removePostComment = async (commentId) => {
  try {
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId);

    if (error) {
      console.log("removing comment Error:", error);
      return { success: false, msg: error.message };
    }

    return { success: true, data: { commentId } };
  } catch (error) {
    console.log("removing comment Error:", error);
    return { success: false, msg: error.message };
  }
};

export const removePost = async (postId) => {
  try {
    const { error } = await supabase.from("posts").delete().eq("id", postId);

    if (error) {
      console.log("removing post Error:", error);
      return { success: false, msg: error.message };
    }

    return { success: true, data: { postId } };
  } catch (error) {
    console.log("removing post Error:", error);
    return { success: false, msg: error.message };
  }
};
