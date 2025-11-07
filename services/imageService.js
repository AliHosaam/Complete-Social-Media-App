import * as FileSystem from "expo-file-system/legacy";
import { decode } from "base64-arraybuffer";
import { supabase } from "../lib/supabase";
import { supabaseUrl } from "../constants";

export const getUserImageSrc = (imagePath) => {
  if (imagePath) {
    return getSupabaseFileUrl(imagePath);
  } else {
    return require("../assets/images/defaultUser.png");
  }
};

export const getSupabaseFileUrl = (filePath) => {
  if (filePath) {
    return {
      uri: `${supabaseUrl}/storage/v1/object/public/uploads/${filePath}`,
    };
  }

  return null;
};

export const getLocaleFilePath = (filePath) => {
  let fileName = filePath.split("/").pop();
  return `${FileSystem.documentDirectory}${fileName}`;
};

export const downloadFile = async (filePath) => {
  try {
    const { uri } = await FileSystem.downloadAsync(
      filePath,
      getLocaleFilePath(filePath)
    );

    return uri;
  } catch {
    return null;
  }
};

export const uploadFile = async (folderName, fileUri, asImage = true) => {
  try {
    let fileName = getFilePath(folderName, asImage);
    const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    let imageData = decode(fileBase64);
    let { data, error } = await supabase.storage
      .from("uploads")
      .upload(fileName, imageData, {
        contentType: asImage ? "image/*" : "video/*",
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.log("Error uploading file:", error);
      return { success: false, msg: "Could not upload file." };
    }

    return { success: true, data: data.path };
  } catch (error) {
    console.log("Error uploading file:", error);
    return { success: false, msg: "Could not upload file." };
  }
};

export const getFilePath = (folderName, asImage) => {
  return `/${folderName}/${new Date().getTime()}${asImage ? ".png" : ".mp4"}`;
};
