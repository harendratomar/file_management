// import React, { useState } from "react";
// import { Ionicons } from "@expo/vector-icons";
// import { Image } from "expo-image";
// import * as WebBrowser from "expo-web-browser";
// import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
// import { isImageFile, isPdfFile } from "../utils/fileValidation";

// interface FilePreviewProps {
//   url: string;
//   mimeType: string | null;
//   fileName?: string;
// }

// export function FilePreview({ url, mimeType, fileName }: FilePreviewProps) {
//   const [imageError, setImageError] = useState(false);
//   const [imageLoading, setImageLoading] = useState(true);

//   const handleOpenPdf = async () => {
//     try {
//       await WebBrowser.openBrowserAsync(url);
//     } catch (error) {
//       console.error("Failed to open PDF:", error);
//     }
//   };

//   if (isImageFile(mimeType)) {
//     if (imageError) {
//       return (
//         <View className="w-full rounded-xl p-6 bg-slate-100 border border-slate-200/50 items-center justify-center min-h-[240px]">
//           <Ionicons name="image-outline" size={48} color="#94a3b8" />
//           <Text className="text-slate-500 mt-3 text-center">Failed to load image</Text>
//           <Text className="text-slate-400 text-xs mt-1 text-center">{url.substring(0, 50)}...</Text>
//         </View>
//       );
//     }

//     return (
//       <View className="w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200/50 relative">
//         {imageLoading && (
//           <View className="absolute inset-0 items-center justify-center bg-slate-100 z-10">
//             <ActivityIndicator size="large" color="#4f46e5" />
//           </View>
//         )}
//         <Image
//           source={{ uri: url }}
//           style={{ width: "100%", minHeight: 240, maxHeight: 500, borderRadius: 12 }}
//           contentFit="contain"
//           transition={250}
//           placeholderContentFit="contain"
//           cachePolicy="memory-disk"
//           recyclingKey={url}
//           onError={(error) => {
//             console.error("Image load error:", error, "URL:", url);
//             setImageError(true);
//             setImageLoading(false);
//           }}
//           onLoad={() => {
//             console.log("Image loaded successfully:", url);
//             setImageLoading(false);
//           }}
//         />
//       </View>
//     );
//   }

//   if (isPdfFile(mimeType)) {
//     return (
//       <View className="w-full items-center justify-center py-6 bg-slate-50 rounded-xl border border-slate-200/50">
//         <View className="items-center mb-4">
//           <View className="bg-red-50 rounded-2xl p-4 mb-3">
//             <Ionicons name="document-text" size={40} color="#dc2626" />
//           </View>
//           <Text className="text-slate-800 font-semibold text-base text-center px-4">
//             {fileName || "PDF Document"}
//           </Text>
//           <Text className="text-slate-400 text-sm mt-1">Tap to view in browser</Text>
//         </View>
//         <TouchableOpacity
//           onPress={handleOpenPdf}
//           className="bg-indigo-600 px-6 py-3.5 rounded-full shadow-lg flex-row items-center"
//           style={{
//             shadowColor: "#4f46e5",
//             shadowOffset: { width: 0, height: 2 },
//             shadowOpacity: 0.25,
//             shadowRadius: 4,
//             elevation: 4,
//           }}
//           activeOpacity={0.85}
//         >
//           <Ionicons name="open-outline" size={18} color="white" />
//           <Text className="text-white font-semibold ml-2">Open PDF</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View className="w-full rounded-xl p-4 bg-white border border-slate-100 shadow-sm">
//       <Text className="text-slate-600">Preview not available</Text>
//     </View>
//   );
// }
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as WebBrowser from "expo-web-browser";
import { 
  ActivityIndicator, 
  Text, 
  TouchableOpacity, 
  View,
  StyleSheet 
} from "react-native";
import { isImageFile, isPdfFile } from "../utils/fileValidation";

interface FilePreviewProps {
  url: string;
  mimeType: string | null;
  fileName?: string;
}

export function FilePreview({ url, mimeType, fileName }: FilePreviewProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleOpenPdf = async () => {
    try {
      await WebBrowser.openBrowserAsync(url);
    } catch (error) {
      console.error("Failed to open PDF:", error);
    }
  };

  if (isImageFile(mimeType)) {
    if (imageError) {
      return (
        <View style={styles.imageErrorContainer}>
          <Ionicons name="image-outline" size={48} color="#94a3b8" />
          <Text style={styles.imageErrorText}>Failed to load image</Text>
          <Text style={styles.imageErrorUrl}>{url.substring(0, 50)}...</Text>
        </View>
      );
    }

    return (
      <View style={styles.imageContainer}>
        {imageLoading && (
          <View style={styles.imageLoadingOverlay}>
            <ActivityIndicator size="large" color="#4f46e5" />
          </View>
        )}
        <Image
          source={{ uri: url }}
          style={styles.image}
          contentFit="contain"
          transition={250}
          placeholderContentFit="contain"
          cachePolicy="memory-disk"
          recyclingKey={url}
          onError={(error) => {
            console.error("Image load error:", error, "URL:", url);
            setImageError(true);
            setImageLoading(false);
          }}
          onLoad={() => {
            console.log("Image loaded successfully:", url);
            setImageLoading(false);
          }}
        />
      </View>
    );
  }

  if (isPdfFile(mimeType)) {
    return (
      <View style={styles.pdfContainer}>
        <View style={styles.pdfContent}>
          <View style={styles.pdfIconWrapper}>
            <Ionicons name="document-text" size={40} color="#dc2626" />
          </View>
          <Text style={styles.pdfFileName}>
            {fileName || "PDF Document"}
          </Text>
          <Text style={styles.pdfSubtext}>Tap to view in browser</Text>
        </View>
        <TouchableOpacity
          onPress={handleOpenPdf}
          style={styles.pdfButton}
          activeOpacity={0.85}
        >
          <Ionicons name="open-outline" size={18} color="white" />
          <Text style={styles.pdfButtonText}>Open PDF</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.fallbackContainer}>
      <Text style={styles.fallbackText}>Preview not available</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  imageErrorContainer: {
    width: "100%",
    borderRadius: 12,
    padding: 24,
    backgroundColor: "#f1f5f9",
    borderWidth: 1,
    borderColor: "rgba(226, 232, 240, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 240,
  },
  imageErrorText: {
    color: "#64748b",
    marginTop: 12,
    textAlign: "center",
  },
  imageErrorUrl: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
  imageContainer: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f1f5f9",
    borderWidth: 1,
    borderColor: "rgba(226, 232, 240, 0.5)",
    position: "relative",
  },
  imageLoadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f5f9",
    zIndex: 10,
  },
  image: {
    width: "100%",
    minHeight: 240,
    maxHeight: 500,
    borderRadius: 12,
  },
  pdfContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(226, 232, 240, 0.5)",
  },
  pdfContent: {
    alignItems: "center",
    marginBottom: 16,
  },
  pdfIconWrapper: {
    backgroundColor: "#fef2f2",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  pdfFileName: {
    color: "#1e293b",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 16,
  },
  pdfSubtext: {
    color: "#94a3b8",
    fontSize: 14,
    marginTop: 4,
  },
  pdfButton: {
    backgroundColor: "#4f46e5",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 20,
    shadowColor: "#4f46e5",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  pdfButtonText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 8,
  },
  fallbackContainer: {
    width: "100%",
    borderRadius: 12,
    padding: 16,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#f1f5f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  fallbackText: {
    color: "#64748b",
  },
});