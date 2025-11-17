// import React from "react";
// import { Ionicons } from "@expo/vector-icons";
// import { Alert, Text, View } from "react-native";
// import { RectButton } from "react-native-gesture-handler";
// import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
// import Animated, { SharedValue } from "react-native-reanimated";
// import { UploadedFile } from "../utils/storage";
// import { FilePreview } from "./FilePreview";

// interface SwipeableFileItemProps {
//   file: UploadedFile;
//   onDelete: (fileId: string, filePath: string) => void;
// }

// export function SwipeableFileItem({
//   file,
//   onDelete,
// }: SwipeableFileItemProps) {
//   const renderRightActions = (
//     _prog: SharedValue<number>,
//     _drag: SharedValue<number>,
//     swipeable: any
//   ) => {
//     return (
//       <Animated.View
//         style={{
//           width: 96,
//           marginLeft: 8,
//         }}
//       >
//         <RectButton
//           style={{
//             backgroundColor: "#ef4444",
//             justifyContent: "center",
//             alignItems: "center",
//             flex: 1,
//             borderRadius: 12,
//           }}
//           onPress={() => {
//             handleDelete();
//             swipeable.close();
//           }}
//         >
//           <View className="items-center">
//             <Ionicons name="trash" size={26} color="white" />
//             <Text className="text-white text-xs mt-2 font-semibold">Delete</Text>
//           </View>
//         </RectButton>
//       </Animated.View>
//     );
//   };

//   const handleDelete = () => {
//     Alert.alert(
//       "Delete File",
//       `Are you sure you want to delete "${file.name}"?`,
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Delete",
//           style: "destructive",
//           onPress: () => {
//             onDelete(file.id, file.path);
//           },
//         },
//       ],
//     );
//   };

//   return (
//     <Swipeable
//       renderRightActions={renderRightActions}
//       friction={2}
//       overshootRight={false}
//       rightThreshold={40}
//     >
//       <View className="bg-white rounded-2xl p-4 mb-3 shadow-md border border-slate-200/50">
//         <View className="flex-row items-center mb-3">
//           <View className="bg-indigo-50 rounded-xl p-2.5">
//             <Ionicons
//               name={
//                 file.mimeType?.startsWith("image/")
//                   ? "image-outline"
//                   : "document-text-outline"
//               }
//               size={20}
//               color="#4f46e5"
//             />
//           </View>
//           <View className="flex-1 ml-3">
//             <Text className="text-slate-800 font-semibold text-base" numberOfLines={1}>
//               {file.name}
//             </Text>
//             {file.size && (
//               <Text className="text-slate-400 text-xs mt-1">
//                 {file.size < 1024
//                   ? `${file.size} B`
//                   : file.size < 1024 * 1024
//                     ? `${Math.round(file.size / 1024)} KB`
//                     : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}
//               </Text>
//             )}
//           </View>
//         </View>

//         <FilePreview
//           url={file.url}
//           mimeType={file.mimeType}
//           fileName={file.name}
//         />
//       </View>
//     </Swipeable>
//   );
// }
// src/components/SwipeableFileItem.tsx
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Alert, Text, View, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { UploadedFile } from "../utils/storage";
import { FilePreview } from "./FilePreview";

interface SwipeableFileItemProps {
  file: UploadedFile;
  onDelete: (fileId: string, filePath: string) => void;
}

export function SwipeableFileItem({
  file,
  onDelete,
}: SwipeableFileItemProps) {
  const renderRightActions = (
    _progress: any,
    _dragX: any,
    swipeable: any
  ) => {
    return (
      <View style={styles.swipeActionContainer}>
        <RectButton
          style={styles.deleteButton}
          onPress={() => {
            handleDelete();
            swipeable.close();
          }}
        >
          <View style={styles.deleteButtonContent}>
            <Ionicons name="trash" size={26} color="white" />
            <Text style={styles.deleteButtonText}>Delete</Text>
          </View>
        </RectButton>
      </View>
    );
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete File",
      `Are you sure you want to delete "${file.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            onDelete(file.id, file.path);
          },
        },
      ]
    );
  };

  const formatFileSize = (size?: number) => {
    if (!size) return "";
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      friction={2}
      overshootRight={false}
      rightThreshold={40}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons
              name={
                file.mimeType?.startsWith("image/")
                  ? "image-outline"
                  : "document-text-outline"
              }
              size={20}
              color="#4f46e5"
            />
          </View>
          <View style={styles.fileInfo}>
            <Text style={styles.fileName} numberOfLines={1}>
              {file.name}
            </Text>
            {file.size && (
              <Text style={styles.fileSize}>
                {formatFileSize(file.size)}
              </Text>
            )}
          </View>
        </View>

        <FilePreview
          url={file.url}
          mimeType={file.mimeType}
          fileName={file.name}
        />
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  swipeActionContainer: {
    width: 96,
    marginLeft: 8,
  },
  deleteButton: {
    backgroundColor: "#ef4444",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderRadius: 12,
  },
  deleteButtonContent: {
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 12,
    marginTop: 8,
    fontWeight: "600",
  },
  container: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(226, 232, 240, 0.5)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    backgroundColor: "#eef2ff",
    borderRadius: 12,
    padding: 10,
  },
  fileInfo: {
    flex: 1,
    marginLeft: 12,
  },
  fileName: {
    color: "#1e293b",
    fontWeight: "600",
    fontSize: 16,
  },
  fileSize: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 4,
  },
});