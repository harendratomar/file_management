// import React, { useCallback, useState } from "react";
// import { Ionicons } from "@expo/vector-icons";
// import { StatusBar } from "expo-status-bar";
// import {
//   ActivityIndicator,
//   Alert,
//   RefreshControl,
//   ScrollView,
//   Text,
//   View,
// } from "react-native";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { SafeAreaView } from "react-native-safe-area-context";
// import "./global.css";
// import { FilePickerButton } from "./src/components/FilePickerButton";
// import { uploadFile } from "./src/utils/storage";
// import { UploadedFileList } from "./src/components/UploadedFileList";
// import { Toast } from "./src/components/Toast";
// import { FilePreview } from "./src/components/FilePreview";

// export default function App() {
//   const [uploadedFile, setUploadedFile] = useState<{
//     url: string;
//     mimeType: string | null;
//     name: string;
//   } | null>(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [refreshTrigger, setRefreshTrigger] = useState(0);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [toast, setToast] = useState<{
//     message: string;
//     type: "success" | "error" | "info";
//     visible: boolean;
//   }>({
//     message: "",
//     type: "info",
//     visible: false,
//   });

//   const showToast = useCallback(
//     (message: string, type: "success" | "error" | "info" = "info") => {
//       setToast({ message, type, visible: true });
//     },
//     [],
//   );

//   const hideToast = useCallback(() => {
//     setToast((prev) => ({ ...prev, visible: false }));
//   }, []);

//   const handleFileSelected = async (file: {
//     uri: string;
//     name: string;
//     mimeType: string | null;
//     size: number;
//   }) => {
//     try {
//       setIsUploading(true);
//       setUploadedFile(null);

//       const uploaded = await uploadFile(file);
//       setUploadedFile({
//         url: uploaded.url,
//         mimeType: uploaded.mimeType,
//         name: uploaded.name,
//       });

//       setRefreshTrigger((prev) => prev + 1);
//       showToast("File uploaded successfully!", "success");
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error ? error.message : "Failed to upload file";
//       Alert.alert("Upload Error", errorMessage);
//       showToast(errorMessage, "error");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleFileDeleted = useCallback(() => {
//     showToast("File deleted successfully!", "success");
//     setUploadedFile(null);
//   }, [showToast]);

//   const handleRefresh = useCallback(() => {
//     setIsRefreshing(true);
//     setRefreshTrigger((prev) => prev + 1);
//   }, []);

//   const handleRefreshComplete = useCallback(() => {
//     setIsRefreshing(false);
//   }, []);

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <SafeAreaView className="flex-1 bg-slate-50">
//         <StatusBar style="dark" />
//         <ScrollView
//           className="flex-1"
//           contentContainerStyle={{
//             paddingTop: 24,
//             paddingBottom: 120,
//             paddingHorizontal: 20,
//           }}
//           showsVerticalScrollIndicator={false}
//           refreshControl={
//             <RefreshControl
//               refreshing={isRefreshing}
//               onRefresh={handleRefresh}
//               tintColor="#4f46e5"
//               colors={["#4f46e5"]}
//             />
//           }
//         >
//           <View>
//             <View className="bg-white rounded-3xl p-6 mb-6 shadow-lg border border-slate-200/50">
//               <View className="flex-row items-center mb-3">
//                 <View className="bg-indigo-100 rounded-2xl p-3 mr-3">
//                   <Ionicons name="cloud-upload" size={28} color="#4f46e5" />
//                 </View>
//                 <View className="flex-1">
//                   <Text className="text-3xl font-extrabold text-slate-900 mb-1">
//                     File Upload
//                   </Text>
//                   <Text className="text-lg font-semibold text-slate-600">
//                     & Management
//                   </Text>
//                 </View>
//               </View>
//               <Text className="text-slate-500 text-sm leading-5 mt-2">
//                 Upload PNG, JPG, or PDF files (max 5 MB). Fast, secure and easy
//                 to manage.
//               </Text>
//             </View>

//             <View className="mb-6">
//               <View className="bg-white rounded-3xl p-5 shadow-lg border border-slate-200/50 mb-4">
//                 <Text className="text-base font-semibold text-slate-700 mb-3">
//                   Select File
//                 </Text>
//                 <FilePickerButton
//                   onFileSelected={handleFileSelected}
//                   disabled={isUploading}
//                 />
//                 <View className="flex-row items-center mt-3">
//                   <Ionicons name="information-circle-outline" size={14} color="#94a3b8" />
//                   <Text className="text-xs text-slate-400 ml-2">
//                     Supported: PNG, JPG, PDF. Max 5 MB.
//                   </Text>
//                 </View>
//               </View>

//               <View className="bg-white rounded-2xl p-4 shadow-md border border-slate-200/50">
//                 <View className="flex-row items-center justify-between">
//                   <View className="flex-row items-center">
//                     <View className="bg-slate-100 rounded-xl p-2 mr-3">
//                       <Ionicons name="server-outline" size={20} color="#64748b" />
//                     </View>
//                     <View>
//                       <Text className="text-sm font-semibold text-slate-700">
//                         Storage
//                       </Text>
//                       <Text className="text-xs text-slate-400 mt-0.5">
//                         Files synced
//                       </Text>
//                     </View>
//                   </View>
//                   {isUploading && (
//                     <View className="flex-row items-center">
//                       <ActivityIndicator size="small" color="#4f46e5" />
//                       <Text className="text-xs text-indigo-600 ml-2 font-medium">
//                         Uploading...
//                       </Text>
//                     </View>
//                   )}
//                 </View>
//               </View>
//             </View>

//             {isUploading && (
//               <View className="bg-indigo-50 rounded-2xl p-5 mb-6 border border-indigo-100">
//                 <View className="flex-row items-center">
//                   <ActivityIndicator size="large" color="#4f46e5" />
//                   <View className="ml-4 flex-1">
//                     <Text className="text-indigo-900 font-semibold text-base">
//                       Uploading your file...
//                     </Text>
//                     <Text className="text-indigo-600 text-sm mt-1">
//                       Please wait while we process your file
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//             )}

//             <View>
//               {uploadedFile && !isUploading && (
//                 <View className="bg-white rounded-3xl p-5 mb-6 shadow-lg border border-slate-200/50">
//                   <View className="flex-row items-center mb-4">
//                     <Ionicons name="eye-outline" size={20} color="#4f46e5" />
//                     <Text className="text-lg font-semibold text-slate-800 ml-2">
//                       Uploaded File Preview
//                     </Text>
//                   </View>
//                   <FilePreview
//                     url={uploadedFile.url}
//                     mimeType={uploadedFile.mimeType}
//                     fileName={uploadedFile.name}
//                   />
//                 </View>
//               )}

//               <View className="bg-white rounded-3xl p-5 shadow-lg border border-slate-200/50">
//                 <View className="flex-row items-center mb-4">
//                   <Ionicons name="folder-outline" size={20} color="#4f46e5" />
//                   <Text className="text-lg font-semibold text-slate-800 ml-2">
//                     Previously Uploaded Files
//                   </Text>
//                 </View>
//                 <UploadedFileList
//                   onDelete={handleFileDeleted}
//                   refreshTrigger={refreshTrigger}
//                   onRefreshComplete={handleRefreshComplete}
//                 />
//               </View>
//             </View>
//           </View>
//         </ScrollView>

//         <Toast
//           message={toast.message}
//           type={toast.type}
//           visible={toast.visible}
//           onHide={hideToast}
//         />
//       </SafeAreaView>
//     </GestureHandlerRootView>
//   );
// }
import React, {
  useCallback,
  useState,
  Component,
  ErrorInfo,
  ReactNode,
} from "react";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { FilePickerButton } from "./src/components/FilePickerButton";
import { uploadFile } from "./src/utils/storage";
import { UploadedFileList } from "./src/components/UploadedFileList";
import { Toast } from "./src/components/Toast";
import { FilePreview } from "./src/components/FilePreview";

class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("App Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={48} color="#ef4444" />
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorText}>
            {this.state.error?.message || "An unexpected error occurred"}
          </Text>
          <TouchableOpacity
            style={styles.errorButton}
            onPress={() => this.setState({ hasError: false, error: null })}
          >
            <Text style={{ color: "#4f46e5", fontWeight: "600" }}>
              Try Again
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

function AppContent() {
  const [uploadedFile, setUploadedFile] = useState<{
    url: string;
    mimeType: string | null;
    name: string;
  } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
    visible: boolean;
  }>({
    message: "",
    type: "info",
    visible: false,
  });

  const showToast = useCallback(
    (message: string, type: "success" | "error" | "info" = "info") => {
      setToast({ message, type, visible: true });
    },
    []
  );

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  const handleFileSelected = async (file: {
    uri: string;
    name: string;
    mimeType: string | null;
    size: number;
  }) => {
    try {
      setIsUploading(true);
      setUploadedFile(null);

      const uploaded = await uploadFile(file);
      setUploadedFile({
        url: uploaded.url,
        mimeType: uploaded.mimeType,
        name: uploaded.name,
      });

      setRefreshTrigger((prev) => prev + 1);
      showToast("File uploaded successfully!", "success");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to upload file";
      Alert.alert("Upload Error", errorMessage);
      showToast(errorMessage, "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileDeleted = useCallback(() => {
    showToast("File deleted successfully!", "success");
    setUploadedFile(null);
  }, [showToast]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  const handleRefreshComplete = useCallback(() => {
    setIsRefreshing(false);
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor="#4f46e5"
              colors={["#4f46e5"]}
            />
          }
        >
          <View>
            <View style={styles.headerCard}>
              <View style={styles.headerRow}>
                <View style={styles.iconContainer}>
                  <Ionicons name="cloud-upload" size={28} color="#4f46e5" />
                </View>
                <View style={styles.headerTextContainer}>
                  <Text style={styles.headerTitle}>File Upload</Text>
                  <Text style={styles.headerSubtitle}>& Management</Text>
                </View>
              </View>
              <Text style={styles.headerDescription}>
                Upload PNG, JPG, or PDF files (max 5 MB). Fast, secure and easy
                to manage.
              </Text>
            </View>

            <View style={styles.section}>
              <View style={styles.pickerCard}>
                <Text style={styles.sectionTitle}>Select File</Text>
                <FilePickerButton
                  onFileSelected={handleFileSelected}
                  disabled={isUploading}
                />
                <View style={styles.infoRow}>
                  <Ionicons
                    name="information-circle-outline"
                    size={14}
                    color="#94a3b8"
                  />
                  <Text style={styles.infoText}>
                    Supported: PNG, JPG, PDF. Max 5 MB.
                  </Text>
                </View>
              </View>

              <View style={styles.storageCard}>
                <View style={styles.storageRow}>
                  <View style={styles.storageLeft}>
                    <View style={styles.storageIcon}>
                      <Ionicons
                        name="server-outline"
                        size={20}
                        color="#64748b"
                      />
                    </View>
                    <View>
                      <Text style={styles.storageTitle}>Storage</Text>
                      <Text style={styles.storageSubtitle}>Files synced</Text>
                    </View>
                  </View>
                  {isUploading && (
                    <View style={styles.uploadingRow}>
                      <ActivityIndicator size="small" color="#4f46e5" />
                      <Text style={styles.uploadingText}>Uploading...</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>

            {isUploading && (
              <View style={styles.uploadingCard}>
                <View style={styles.uploadingContent}>
                  <ActivityIndicator size="large" color="#4f46e5" />
                  <View style={styles.uploadingTextContainer}>
                    <Text style={styles.uploadingTitle}>
                      Uploading your file...
                    </Text>
                    <Text style={styles.uploadingSubtitle}>
                      Please wait while we process your file
                    </Text>
                  </View>
                </View>
              </View>
            )}

            <View>
              {uploadedFile && !isUploading && (
                <View style={styles.previewCard}>
                  <View style={styles.previewHeader}>
                    <Ionicons name="eye-outline" size={20} color="#4f46e5" />
                    <Text style={styles.previewTitle}>
                      Uploaded File Preview
                    </Text>
                  </View>
                  <FilePreview
                    url={uploadedFile.url}
                    mimeType={uploadedFile.mimeType}
                    fileName={uploadedFile.name}
                  />
                </View>
              )}

              <View style={styles.filesCard}>
                <View style={styles.filesHeader}>
                  <Ionicons name="folder-outline" size={20} color="#4f46e5" />
                  <Text style={styles.filesTitle}>
                    Previously Uploaded Files
                  </Text>
                </View>
                <UploadedFileList
                  onDelete={handleFileDeleted}
                  refreshTrigger={refreshTrigger}
                  onRefreshComplete={handleRefreshComplete}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <Toast
          message={toast.message}
          type={toast.type}
          visible={toast.visible}
          onHide={hideToast}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 24,
    paddingBottom: 120,
    paddingHorizontal: 20,
  },
  headerCard: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,

    borderWidth: 1,
    borderColor: "rgba(226, 232, 240, 0.5)",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    backgroundColor: "#e0e7ff",
    borderRadius: 16,
    padding: 12,
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#64748b",
  },
  headerDescription: {
    color: "#64748b",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  section: {
    marginBottom: 24,
  },
  pickerCard: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1,
    borderColor: "rgba(226, 232, 240, 0.5)",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  infoText: {
    fontSize: 12,
    color: "#94a3b8",
    marginLeft: 8,
  },
  storageCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,

    borderWidth: 1,
    borderColor: "rgba(226, 232, 240, 0.5)",
  },
  storageRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  storageLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  storageIcon: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    padding: 8,
    marginRight: 12,
  },
  storageTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },
  storageSubtitle: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 2,
  },
  uploadingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  uploadingText: {
    fontSize: 12,
    color: "#4f46e5",
    marginLeft: 8,
    fontWeight: "500",
  },
  uploadingCard: {
    backgroundColor: "#eef2ff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#c7d2fe",
  },
  uploadingContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  uploadingTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  uploadingTitle: {
    color: "#312e81",
    fontWeight: "600",
    fontSize: 16,
  },
  uploadingSubtitle: {
    color: "#4f46e5",
    fontSize: 14,
    marginTop: 4,
  },
  previewCard: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,

    borderWidth: 1,
    borderColor: "rgba(226, 232, 240, 0.5)",
  },
  previewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
    marginLeft: 8,
  },
  filesCard: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 20,

    borderWidth: 1,
    borderColor: "rgba(226, 232, 240, 0.5)",
  },
  filesHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  filesTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
    marginLeft: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f8fafc",
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1e293b",
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 24,
  },
  errorButton: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4f46e5",
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#eef2ff",
    borderRadius: 12,
    overflow: "hidden",
  },
});
