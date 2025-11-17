// import React, { useCallback, useEffect, useState } from "react";
// import { Ionicons } from "@expo/vector-icons";
// import {
//   ActivityIndicator,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { deleteFile, listFiles, UploadedFile } from "../utils/storage";
// import { SwipeableFileItem } from "./SwipeableFileItem";

// interface UploadedFileListProps {
//   onDelete?: () => void;
//   refreshTrigger?: number;
//   onRefreshComplete?: () => void;
// }

// export function UploadedFileList({
//   onDelete,
//   refreshTrigger,
//   onRefreshComplete,
// }: UploadedFileListProps) {
//   const [files, setFiles] = useState<UploadedFile[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const loadFiles = useCallback(async () => {
//     try {
//       setError(null);
//       const fileList = await listFiles();
//       setFiles(fileList);
//       onRefreshComplete?.();
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to load files");
//       onRefreshComplete?.();
//     } finally {
//       setIsLoading(false);
//     }
//   }, [onRefreshComplete]);

//   useEffect(() => {
//     loadFiles();
//   }, [loadFiles, refreshTrigger]);

//   const handleDelete = async (fileId: string, filePath: string) => {
//     try {
//       await deleteFile(filePath);

//       setFiles((prev) => prev.filter((file) => file.id !== fileId));

//       onDelete?.();
//     } catch (error) {
//       console.error("Failed to delete file:", error);
//       loadFiles();
//     }
//   };

//   if (isLoading) {
//     return (
//       <View className="flex-1 items-center justify-center py-8">
//         <ActivityIndicator size="large" color="#4f46e5" />
//         <Text className="text-slate-600 mt-3 font-medium">Loading files...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View className="flex-1 items-center justify-center py-8 px-4">
//         <View className="bg-red-50 rounded-full p-4 mb-4">
//           <Ionicons name="alert-circle" size={32} color="#ef4444" />
//         </View>

//         <Text className="text-red-600 text-center mb-6 font-medium">{error}</Text>

//         <TouchableOpacity
//           onPress={loadFiles}
//           className="bg-indigo-600 px-4 py-2 rounded-full shadow-md flex-row items-center"
//           activeOpacity={0.85}
//         >
//           <Ionicons name="refresh" size={18} color="white" />
//           <Text className="text-white font-semibold ml-2">Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   if (files.length === 0) {
//     return (
//       <View className="flex-1 items-center justify-center py-12 px-4">
//         <View className="bg-slate-100 rounded-full p-6 mb-4 shadow-sm">
//           <Ionicons name="folder-open-outline" size={44} color="#94a3b8" />
//         </View>
//         <Text className="text-slate-600 text-center text-base font-medium">
//           No files uploaded yet.
//         </Text>
//         <Text className="text-slate-400 text-center text-sm mt-2">
//           Upload your first file to get started!
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <View className="pb-4">
//       {files.map((file) => (
//         <SwipeableFileItem key={file.id} file={file} onDelete={handleDelete} />
//       ))}
//     </View>
//   );
// }
import React, { useCallback, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { deleteFile, listFiles, UploadedFile } from "../utils/storage";
import { SwipeableFileItem } from "./SwipeableFileItem";

interface UploadedFileListProps {
  onDelete?: () => void;
  refreshTrigger?: number;
  onRefreshComplete?: () => void;
}

export function UploadedFileList({
  onDelete,
  refreshTrigger,
  onRefreshComplete,
}: UploadedFileListProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFiles = useCallback(async () => {
    try {
      setError(null);
      const fileList = await listFiles();
      setFiles(fileList);
      onRefreshComplete?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load files");
      onRefreshComplete?.();
    } finally {
      setIsLoading(false);
    }
  }, [onRefreshComplete]);

  useEffect(() => {
    loadFiles();
  }, [loadFiles, refreshTrigger]);

  const handleDelete = async (fileId: string, filePath: string) => {
    try {
      await deleteFile(filePath);
      setFiles((prev) => prev.filter((file) => file.id !== fileId));
      onDelete?.();
    } catch (error) {
      console.error("Failed to delete file:", error);
      loadFiles();
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text style={styles.loadingText}>Loading files...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <View style={styles.errorIconWrapper}>
          <Ionicons name="alert-circle" size={32} color="#ef4444" />
        </View>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          onPress={loadFiles}
          style={styles.retryButton}
          activeOpacity={0.85}
        >
          <Ionicons name="refresh" size={18} color="white" />
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (files.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconWrapper}>
          <Ionicons name="folder-open-outline" size={44} color="#94a3b8" />
        </View>
        <Text style={styles.emptyTitle}>
          No files uploaded yet.
        </Text>
        <Text style={styles.emptySubtitle}>
          Upload your first file to get started!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      {files.map((file) => (
        <SwipeableFileItem key={file.id} file={file} onDelete={handleDelete} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
  },
  loadingText: {
    color: "#64748b",
    marginTop: 12,
    fontWeight: "500",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  errorIconWrapper: {
    backgroundColor: "#fef2f2",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  errorText: {
    color: "#dc2626",
    textAlign: "center",
    marginBottom: 24,
    fontWeight: "500",
  },
  retryButton: {
    backgroundColor: "#4f46e5",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  retryButtonText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
    paddingHorizontal: 16,
  },
  emptyIconWrapper: {
    backgroundColor: "#f1f5f9",
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  emptyTitle: {
    color: "#64748b",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  emptySubtitle: {
    color: "#94a3b8",
    textAlign: "center",
    fontSize: 14,
    marginTop: 8,
  },
  listContainer: {
    paddingBottom: 16,
  },
});