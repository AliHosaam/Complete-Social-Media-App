import { supabase } from "../lib/supabase";

export const createPostNotification = async (notification) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .insert(notification)
      .select()
      .single();

    if (error) {
      console.log("notification Error:", error);
      return { success: false, msg: error.message };
    }

    return { success: true, data: data };
  } catch (error) {
    console.log("notification Error:", error);
    return { success: false, msg: error.message };
  }
};

export const fetchNotifications = async (receiverId) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .select("*, sender: senderId( id, name, image )")
      .eq("receiverId", receiverId)
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Error fetching notifications:", error);
      return { success: false, msg: error.message };
    }

    return { success: true, data: data };
  } catch (error) {
    console.log("Error fetching notifications:", error);
    return { success: false, msg: error.message };
  }
};
