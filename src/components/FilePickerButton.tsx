// import React, { useState } from "react";
// import { Ionicons } from "@expo/vector-icons";
// import * as DocumentPicker from "expo-document-picker";
// import { Alert, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
// import { validateFile } from "../utils/fileValidation";

// interface FilePickerButtonProps {
//   onFileSelected: (file: {
//     uri: string;
//     name: string;
//     mimeType: string | null;
//     size: number;
//   }) => void;
//   disabled?: boolean;
// }

// export function FilePickerButton({
//   onFileSelected,
//   disabled = false,
// }: FilePickerButtonProps) {
//   const [isLoading, setIsLoading] = useState(false);

//   const pickDocument = async () => {
//     try {
//       setIsLoading(true);
//       const result = await DocumentPicker.getDocumentAsync({
//         type: ["image/png", "image/jpeg", "image/jpg", "application/pdf"],
//         copyToCacheDirectory: true,
//       });

//       if (result.canceled) {
//         setIsLoading(false);
//         Alert.alert("No file selected.");
//         return;
//       }

//       const file: any = (result as any).assets?.[0] ?? result;

//       if (!file || !file.name) {
//         Alert.alert("No file selected.");
//         setIsLoading(false);
//         return;
//       }

//       const validation = validateFile({
//         name: file.name,
//         size: file.size ?? 0,
//         mimeType: file.mimeType ?? null,
//       });

//       if (!validation.isValid) {
//         Alert.alert(validation.error || "Only PNG/JPG/PDF under 5 MB allowed.");
//         setIsLoading(false);
//         return;
//       }

//       onFileSelected({
//         uri: file.uri,
//         name: file.name,
//         mimeType: file.mimeType ?? null,
//         size: file.size ?? 0,
//       });
//     } catch (error) {
//       Alert.alert(
//         "Error",
//         error instanceof Error ? error.message : "Failed to pick file",
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <TouchableOpacity
//       onPress={pickDocument}
//       disabled={disabled || isLoading}
//       activeOpacity={0.85}
//       className="bg-indigo-600 px-6 py-4 rounded-2xl shadow-xl flex-row items-center justify-center"
//       style={{
//         minWidth: 280,
//         shadowColor: "#4f46e5",
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.3,
//         shadowRadius: 8,
//         elevation: 8,
//       }}
//     >
//       {isLoading ? (
//         <View className="flex-row items-center">
//           <ActivityIndicator color="white" size="small" />
//           <Text className="text-white font-semibold text-base ml-3">Selecting...</Text>
//         </View>
//       ) : (
//         <View className="flex-row items-center">
//           <View className="bg-white/20 rounded-full p-2.5 mr-3">
//             <Ionicons name="cloud-upload-outline" size={24} color="white" />
//           </View>
//           <View>
//             <Text className="text-white font-bold text-base">Select File</Text>
//             <Text className="text-white/90 text-xs mt-0.5">PNG · JPG · PDF</Text>
//           </View>
//         </View>
//       )}
//     </TouchableOpacity>
//   );
// }
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { validateFile } from "../utils/fileValidation";

interface FilePickerButtonProps {
  onFileSelected: (file: {
    uri: string;
    name: string;
    mimeType: string | null;
    size: number;
  }) => void;
  disabled?: boolean;
}

export function FilePickerButton({
  onFileSelected,
  disabled = false,
}: FilePickerButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const pickDocument = async () => {
    try {
      setIsLoading(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/png", "image/jpeg", "image/jpg", "application/pdf"],
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        setIsLoading(false);
        Alert.alert("No file selected.");
        return;
      }

      const file: any = (result as any).assets?.[0] ?? result;

      if (!file || !file.name) {
        Alert.alert("No file selected.");
        setIsLoading(false);
        return;
      }

      const validation = validateFile({
        name: file.name,
        size: file.size ?? 0,
        mimeType: file.mimeType ?? null,
      });

      if (!validation.isValid) {
        Alert.alert(validation.error || "Only PNG/JPG/PDF under 5 MB allowed.");
        setIsLoading(false);
        return;
      }

      onFileSelected({
        uri: file.uri,
        name: file.name,
        mimeType: file.mimeType ?? null,
        size: file.size ?? 0,
      });
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Failed to pick file"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={pickDocument}
      disabled={disabled || isLoading}
      activeOpacity={0.85}
      style={styles.button}
    >
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="white" size="small" />
          <Text style={styles.loadingText}>Selecting...</Text>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <View style={styles.iconWrapper}>
            <Ionicons name="cloud-upload-outline" size={24} color="white" />
          </View>
          <View>
            <Text style={styles.buttonTitle}>Select File</Text>
            <Text style={styles.buttonSubtitle}>PNG · JPG · PDF</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4f46e5",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    minWidth: 280,
    shadowColor: "#4f46e5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  loadingText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 12,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    padding: 10,
    marginRight: 12,
  },
  buttonTitle: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonSubtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 12,
    marginTop: 2,
  },
});
